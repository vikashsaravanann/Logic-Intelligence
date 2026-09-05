import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email/send-email';
import * as React from 'react';

import InvoiceEmail from '@/emails/invoice-email';
import PaymentReceivedEmail from '@/emails/payment-received-email';
import ProjectKickoffEmail from '@/emails/project-kickoff-email';
import ProjectDeliveredEmail from '@/emails/project-delivered-email';
import ProposalSentEmail from '@/emails/proposal-sent-email';
import DemoReadyEmail from '@/emails/demo-ready-email';
import TestimonialRequestEmail from '@/emails/testimonial-request-email';
import MaintenanceRenewalEmail from '@/emails/maintenance-renewal-email';

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Quick hardcoded secret or proper auth check for admin API. 
// Since this is just a tool for the admin, we check an Authorization header or rely on session.
export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized. Use CRON_SECRET as Bearer token.' }, { status: 401 });
    }

    const body = await req.json();
    const { type, email, fullName, data } = body;

    if (!email || !type) {
      return NextResponse.json({ error: 'Missing email or type' }, { status: 400 });
    }

    let reactComponent;
    let subject = "";
    let fromAddress = "hello";
    let replyToAddress: string | undefined = undefined;
    
    // Choose template based on type
    switch (type) {
      
      case 'invoice':
        fromAddress = 'admin';
        subject = `New Invoice: ${data.invoiceNumber || 'INV-000'}`;
        reactComponent = React.createElement(InvoiceEmail, {
          fullName: fullName || 'Client',
          amount: data.amount || '$0.00',
          dueDate: data.dueDate || 'Upon Receipt',
          invoiceNumber: data.invoiceNumber || 'INV-000',
          paymentLink: data.invoiceUrl || 'https://www.logicintelligencetechnologies.in/dashboard',
        });
        break;
      case 'payment':
        fromAddress = 'admin';
        subject = `Payment Received - Thank You`;
        reactComponent = React.createElement(PaymentReceivedEmail, {
          fullName: fullName || 'Client',
          amount: data.amount || '$0.00',
          invoiceNumber: data.invoiceNumber || 'INV-000',
        });
        break;
      case 'kickoff':
        fromAddress = 'vikash';
        subject = `Project Kickoff: ${data.projectName || 'Your Project'}`;
        reactComponent = React.createElement(ProjectKickoffEmail, {
          fullName: fullName || 'Client',
          projectName: data.projectName || 'Your Project',
        });
        break;
      case 'delivered':
        fromAddress = 'support';
        subject = `Project Delivered: ${data.projectName || 'Your Project'} is Live!`;
        reactComponent = React.createElement(ProjectDeliveredEmail, {
          fullName: fullName || 'Client',
          projectName: data.projectName || 'Your Project',
          liveUrl: data.liveUrl || 'https://www.logicintelligencetechnologies.in',
        });
        break;
      case 'proposal':
        fromAddress = 'vikash';
        subject = `Project Proposal from Logic Intelligence`;
        reactComponent = React.createElement(ProposalSentEmail, {
          fullName: fullName || 'Client',
          proposalUrl: data.proposalUrl || 'https://www.logicintelligencetechnologies.in',
        });
        break;
      case 'demo-ready':
        fromAddress = 'vikash';
        subject = `Your Custom Demo is Ready!`;
        reactComponent = React.createElement(DemoReadyEmail, {
          fullName: fullName || 'Client',
          demoUrl: data.demoUrl || 'https://www.logicintelligencetechnologies.in',
        });
        break;
      case 'testimonial-request':
        fromAddress = 'hello';
        subject = `How did we do? We'd love your feedback!`;
        reactComponent = React.createElement(TestimonialRequestEmail, {
          fullName: fullName || 'Client',
          reviewLink: data.reviewUrl || 'https://g.page/r/review',
        });
        break;
      case 'maintenance-renewal':
        fromAddress = 'admin';
        replyToAddress = 'support@logicintelligencetechnologies.in';
        subject = `Maintenance & Support Plan Renewal`;
        reactComponent = React.createElement(MaintenanceRenewalEmail, {
          fullName: fullName || 'Client',
          expiryDate: data.renewalDate || new Date(Date.now() + 86400000 * 30).toLocaleDateString(),
          renewLink: data.renewalUrl || 'https://www.logicintelligencetechnologies.in/dashboard',
        });
        break;

      default:
        return NextResponse.json({ error: 'Invalid email type' }, { status: 400 });
    }

    const emailResult = await sendEmail({
      to: email,
      from: fromAddress,
      subject,
      react: reactComponent,
      replyTo: replyToAddress,
    });

    if (!emailResult.success) {
      console.error("[Email Error] Admin Trigger Failed:", emailResult.message);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: `Sent ${type} email to ${email}` });

  } catch (error) {
    console.error("Admin Email Trigger Error:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
