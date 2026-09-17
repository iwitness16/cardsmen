'use client'

import { useState } from 'react'
import { Footer, PageHeader, SiteHeader } from '@/components/site-shell'

const usaStates = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming']
const canadaProvinces = ['Alberta','British Columbia','Manitoba','New Brunswick','Newfoundland','Nova Scotia','Ontario','Prince Edward Island','Quebec','Saskatchewan']
const international = ['United Kingdom','Germany','Netherlands','Australia','France','Belgium','Ireland']

export default function ContactPage() {
  const [name,     setName]     = useState('')
  const [email,    setEmail]    = useState('')
  const [product,  setProduct]  = useState('')
  const [quantity, setQuantity] = useState('1')
  const [message,  setMessage]  = useState('')
  const [sent,     setSent]     = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !message) return

    const text = [
      `📩 *Contact / Order Enquiry — CardsMen*`,
      ``,
      `*Name:* ${name}`,
      email   ? `*Email:* ${email}` : '',
      product ? `*Product:* ${product} Fake ID` : '',
      `*Quantity:* ${quantity}`,
      ``,
      `*Message:*`,
      message,
    ].filter(Boolean).join('\n')

    window.open(
      `https://wa.me/14022016685?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    )
    setSent(true)
  }

  return (
    <>
      <SiteHeader active="Contact" />
      <main>
        <PageHeader title="CONTACT US" />

        <div className="contact-page shell">
          <div className="contact-grid">

            {/* ── Info side ── */}
            <div className="contact-info">
              <h2>Get In Touch</h2>
              <p>
                The fastest way to reach us is via <strong>WhatsApp</strong>. We typically respond within a few hours.
              </p>
              <p><strong>WhatsApp:</strong> +1 (402) 201-6685</p>
              <p><strong>Email:</strong> idcardsmen.orders@gmail.com</p>
              <p style={{ marginTop: '20px', fontSize: '13px', color: '#888' }}>
                Monday – Friday / 9am – 9pm EST
                <br />
                Saturday / 10am – 6pm EST
              </p>
              <div className="contact-social">
                <a href="https://wa.me/14022016685" className="social-btn social-wa" aria-label="Chat on WhatsApp" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.123 1.528 5.857L.057 23.882a.5.5 0 0 0 .611.612l6.166-1.453A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.853 0-3.592-.5-5.088-1.375l-.36-.214-3.733.88.897-3.643-.235-.375A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                </a>
                <a href="mailto:idcardsmen.orders@gmail.com" className="social-btn social-em" aria-label="Send an email">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </a>
              </div>
            </div>

            {/* ── Form side ── */}
            {sent ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '48px 24px', background: 'var(--surface)', borderRadius: '10px', border: '1px solid var(--border)', textAlign: 'center' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="52" height="52"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Message Sent!</h3>
                <p style={{ color: 'var(--muted)', fontSize: '14px', maxWidth: '320px' }}>
                  WhatsApp opened with your enquiry prefilled. Just hit Send — we will get back to you shortly.
                </p>
                <button
                  onClick={() => setSent(false)}
                  style={{ marginTop: '8px', background: 'var(--red)', color: '#fff', border: 'none', borderRadius: '8px', padding: '11px 28px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <label>
                  Your Name <span style={{ color: 'var(--red)' }}>*</span>
                  <input
                    type="text"
                    placeholder="Full name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </label>
                <label>
                  Email Address
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </label>
                <label>
                  State / Country (product interested in)
                  <select value={product} onChange={e => setProduct(e.target.value)}>
                    <option value="">— Select a product —</option>
                    <optgroup label="USA States">
                      {usaStates.map(s => <option key={s} value={s}>{s} Fake ID</option>)}
                    </optgroup>
                    <optgroup label="Canada Provinces">
                      {canadaProvinces.map(p => <option key={p} value={p}>{p} Fake ID</option>)}
                    </optgroup>
                    <optgroup label="International">
                      {international.map(c => <option key={c} value={c}>{c} Fake ID</option>)}
                    </optgroup>
                  </select>
                </label>
                <label>
                  Quantity
                  <select value={quantity} onChange={e => setQuantity(e.target.value)}>
                    <option value="1">1 ID — $100</option>
                    <option value="2">2 IDs — $80 each</option>
                    <option value="3">3–4 IDs — $70 each</option>
                    <option value="5">5+ IDs — $50 each</option>
                  </select>
                </label>
                <label>
                  Message / Order Details <span style={{ color: 'var(--red)' }}>*</span>
                  <textarea
                    rows={6}
                    placeholder="Tell us what you need — include your name, DOB, address, height, weight, eye color, and any other details."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    required
                  />
                </label>
                <button type="submit" className="btn-red">
                  Send via WhatsApp →
                </button>
                <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '-8px' }}>
                  Clicking Send opens WhatsApp with your message prefilled.
                </p>
              </form>
            )}

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
