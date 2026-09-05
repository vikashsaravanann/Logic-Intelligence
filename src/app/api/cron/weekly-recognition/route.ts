import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { sendEmail } from '@/lib/email/send-email';
import { WeeklyRecognitionEmail } from '@/emails/weekly-recognition-email';

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Placeholder logic: query profiles that haven't subscribed or converted
  const { data: users, error } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('has_subscribed', false)
    .eq('has_converted', false)
    .limit(50); // example batch limit

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const results = [];
  
  // Use a fallback for local testing if the query returns nothing
  const usersToEmail = users && users.length > 0 ? users : [];

  for (const user of usersToEmail) {
    if (user.email) {
      const emailResponse = await sendEmail({
        to: user.email,
        subject: "Let's Bring Your Ideas to Life!",
        react: WeeklyRecognitionEmail({ 
          fullName: user.full_name || 'there', 
          dashboardUrl: 'https://www.logicintelligencetechnologies.in/dashboard' 
        }),
        from: 'hello',
        replyTo: 'hello'
      });
      results.push({ email: user.email, success: emailResponse.success });
    }
  }

  return NextResponse.json({ success: true, results, processed: usersToEmail.length });
}
