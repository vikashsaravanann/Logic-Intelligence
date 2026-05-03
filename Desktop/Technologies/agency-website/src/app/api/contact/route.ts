import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

// Initialize Resend with a fallback to prevent build errors if env var is missing
const resend = new Resend(process.env.RESEND_API_KEY || "fallback_key");

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder_key";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, phone, companyName, projectType, budgetRange, timeline, description } = body;

    // Optional: Save lead to Supabase (Uncomment when credentials are set)
    /*
    const { error: dbError } = await supabase
      .from("leads")
      .insert([
        { 
          full_name: fullName, 
          email, 
          phone, 
          company_name: companyName, 
          project_type: projectType,
          budget_range: budgetRange,
          timeline,
          description,
          status: 'New'
        }
      ]);
    
    if (dbError) {
      console.error("Supabase Error:", dbError);
    }
    */

    // Send email notification via Resend
    // Note: We'll skip actual sending if the API key is a placeholder
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: "Logic Intelligence Technologies <onboarding@resend.dev>",
        to: ["hello@logicintel.com"], // Replace with actual agency owner email
        subject: `New Lead: ${projectType} from ${fullName}`,
        text: `
          New Lead Received:
          
          Name: ${fullName}
          Email: ${email}
          Phone: ${phone || 'N/A'}
          Company: ${companyName || 'N/A'}
          
          Project Type: ${projectType}
          Budget Range: ${budgetRange}
          Timeline: ${timeline}
          
          Description:
          ${description}
        `,
      });
    } else {
      console.log("Mock submission successful. Provide RESEND_API_KEY to enable real emails.");
    }

    return NextResponse.json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
