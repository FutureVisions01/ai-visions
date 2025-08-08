import { NextResponse } from 'next/server'
import { EmailSchema } from '@/lib/validation'

/**
 * Handle email subscriptions.  The payload must include a valid
 * email address.  This endpoint currently logs the email on the
 * server and returns a success response.  Integrate your mailing
 * provider here (e.g. Supabase, Resend) to persist subscribers.
 */
export async function POST(request: Request) {
  try {
    const data = await request.json()
    const result = EmailSchema.safeParse(data)
    if (!result.success) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }
    // In production you'd save to your database or trigger an email
    // campaign.  For now we simply log to the server console.
    console.log('New subscriber:', result.data.email)
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
}