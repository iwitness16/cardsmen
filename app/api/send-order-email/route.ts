import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_FROM,
        pass: process.env.MAIL_APP_PASSWORD,
      },
    })

    const {
      product, qty, total, whatsapp,
      firstName, middleName, lastName,
      sex, birthday, hairColor, eyeColor,
      heightFt, heightIn, weight,
      address, customize, paymentMethod,
      orderId, submittedAt,
    } = body

    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #18181b;">
        <div style="background: #1a6fa8; padding: 24px 32px; border-radius: 8px 8px 0 0;">
          <h1 style="color:#fff; margin:0; font-size:22px; letter-spacing:1px;">
            🆕 New Order — CardsMen
          </h1>
          <p style="color:rgba(255,255,255,0.8); margin:6px 0 0; font-size:13px;">
            Order ID: <strong style="color:#fff;">${orderId}</strong> &nbsp;|&nbsp; ${submittedAt}
          </p>
        </div>

        <div style="background:#f4f4f5; padding:24px 32px; border:1px solid #e4e4e7; border-top:none; border-radius:0 0 8px 8px;">

          <h2 style="font-size:16px; margin:0 0 16px; color:#1a6fa8;">Order Details</h2>
          <table style="width:100%; border-collapse:collapse; font-size:14px;">
            <tr><td style="padding:7px 0; color:#71717a; width:40%;">Product</td><td style="padding:7px 0; font-weight:600;">${product}</td></tr>
            <tr><td style="padding:7px 0; color:#71717a;">Quantity</td><td style="padding:7px 0;">${qty}</td></tr>
            <tr><td style="padding:7px 0; color:#71717a;">Total</td><td style="padding:7px 0; font-weight:700; color:#1a6fa8;">${total}</td></tr>
            <tr><td style="padding:7px 0; color:#71717a;">Payment</td><td style="padding:7px 0;">${paymentMethod}</td></tr>
          </table>

          <hr style="border:none; border-top:1px solid #e4e4e7; margin:20px 0;" />
          <h2 style="font-size:16px; margin:0 0 16px; color:#1a6fa8;">Customer Information</h2>
          <table style="width:100%; border-collapse:collapse; font-size:14px;">
            <tr><td style="padding:7px 0; color:#71717a; width:40%;">WhatsApp</td><td style="padding:7px 0; font-weight:600;">${whatsapp}</td></tr>
            <tr><td style="padding:7px 0; color:#71717a;">Full Name</td><td style="padding:7px 0;">${firstName} ${middleName ?? ''} ${lastName}</td></tr>
            <tr><td style="padding:7px 0; color:#71717a;">Sex</td><td style="padding:7px 0;">${sex}</td></tr>
            <tr><td style="padding:7px 0; color:#71717a;">Birthday</td><td style="padding:7px 0;">${birthday}</td></tr>
            <tr><td style="padding:7px 0; color:#71717a;">Hair Color</td><td style="padding:7px 0;">${hairColor}</td></tr>
            <tr><td style="padding:7px 0; color:#71717a;">Eye Color</td><td style="padding:7px 0;">${eyeColor}</td></tr>
            <tr><td style="padding:7px 0; color:#71717a;">Height</td><td style="padding:7px 0;">${heightFt}ft ${heightIn}in</td></tr>
            <tr><td style="padding:7px 0; color:#71717a;">Weight</td><td style="padding:7px 0;">${weight} lbs</td></tr>
            ${address ? `<tr><td style="padding:7px 0; color:#71717a;">Address</td><td style="padding:7px 0;">${address}</td></tr>` : ''}
            ${customize ? `<tr><td style="padding:7px 0; color:#71717a;">Customize</td><td style="padding:7px 0;">${customize}</td></tr>` : ''}
          </table>

          <div style="margin-top:24px; padding:14px 18px; background:#fff; border:1px solid #e4e4e7; border-radius:6px; font-size:13px; color:#71717a;">
            ⚠️ Customer photo and signature were uploaded separately. Check admin dashboard for full details.
          </div>
        </div>
      </div>
    `

    await transporter.sendMail({
      from: `"CardsMen Orders" <${process.env.MAIL_FROM}>`,
      to: process.env.MAIL_TO,
      subject: `🆕 New Order: ${product} — ${orderId}`,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Email error:', err)
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 })
  }
}
