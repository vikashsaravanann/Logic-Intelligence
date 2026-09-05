import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import Stripe from "stripe";
import { sendEmail } from "@/lib/email/send-email";
import InvoiceEmail from "@/emails/invoice-email";
import * as React from "react";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-08-26.dahlia" as any,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { clientName, clientEmail, amount, description, dueDate } = body;

    if (!clientName || !clientEmail || !amount || !description || !dueDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      // @ts-ignore - Some Stripe types are out of sync with latest features
      automatic_payment_methods: { enabled: true },
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Invoice",
              description: description,
            },
            unit_amount: Math.round(amount * 100), // Convert to smallest currency unit (paise)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard?payment=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard?payment=cancelled`,
      customer_email: clientEmail,
    });

    // 2. Insert invoice into Supabase
    const { data: invoice, error: dbError } = await supabaseAdmin
      .from("invoices")
      .insert({
        client_name: clientName,
        client_email: clientEmail,
        amount: amount,
        description: description,
        due_date: dueDate,
        status: "pending",
        stripe_session_id: session.id,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error inserting invoice:", dbError);
      return NextResponse.json({ error: "Failed to save invoice to database" }, { status: 500 });
    }

    // 3. Send email with the payment link
    const invoiceNumber = `INV-${invoice.id.slice(0, 8).toUpperCase()}`;

    await sendEmail({
      to: clientEmail,
      subject: `Invoice from Logic Intelligence Technologies`,
      from: "vikash",
      react: React.createElement(InvoiceEmail, {
        fullName: clientName,
        invoiceNumber: invoiceNumber,
        amount: `₹${amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
        dueDate: dueDate,
        paymentLink: session.url!,
      }),
    });

    return NextResponse.json({ success: true, invoice });
  } catch (error: any) {
    console.error("Error creating invoice:", error);
    return NextResponse.json({ error: error.message || "Failed to create invoice" }, { status: 500 });
  }
}

