'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useRef, useState } from 'react'
import { Footer, SiteHeader } from '@/components/site-shell'
import { ALL_PRODUCTS } from '@/lib/products'
import { db } from '@/lib/firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

const ADMIN_WHATSAPP = '14022016685'

/* ── Flat list for the dropdown (name + price + cat) ── */
const allProducts = ALL_PRODUCTS.map(p => ({
  name:  p.name,
  img:   p.images[0],
  imgs:  p.images,
  price: `${p.currency}${p.price}.00`,
  cat:   p.country,
  model: p.model,
})).concat([
  // Non-CSV countries kept as simple entries
  { name: 'UK Fake ID — DVLA Photocard (Teslin)',   img: 'https://www.fakeids.com/media/product/fakeids_front.jpg', imgs: ['https://www.fakeids.com/media/product/fakeids_front.jpg'], price: '£80.00',      cat: 'uk',  model: 'UK DVLA Photocard' },
  { name: 'UK Provisional Licence (Polycarbonate)', img: 'https://www.fakeids.com/media/product/fakeids_front.jpg', imgs: ['https://www.fakeids.com/media/product/fakeids_front.jpg'], price: '£80.00',      cat: 'uk',  model: 'UK Provisional Licence' },
  { name: 'Germany Fake ID — Scannable Replica',    img: '/images/germany.jpg',                                     imgs: ['/images/germany.jpg'],                                     price: '€100.00',     cat: 'eu',  model: 'Germany ID' },
  { name: 'Germany Fake ID (Polycarbonate)',         img: '/images/germany.jpg',                                     imgs: ['/images/germany.jpg'],                                     price: '€100.00',     cat: 'eu',  model: 'Germany Polycarbonate ID' },
  { name: 'Netherlands Fake ID — Scannable Replica',img: '/images/netherlands.jpg',                                  imgs: ['/images/netherlands.jpg'],                                 price: '€100.00',     cat: 'eu',  model: 'Netherlands ID' },
  { name: 'Netherlands Fake ID (Polycarbonate)',     img: '/images/netherlands.jpg',                                  imgs: ['/images/netherlands.jpg'],                                 price: '€100.00',     cat: 'eu',  model: 'Netherlands Polycarbonate ID' },
  { name: 'New South Wales Driver Licence',          img: '/images/australia.jpg',                                   imgs: ['/images/australia.jpg'],                                   price: 'AUD$100.00',  cat: 'au',  model: 'NSW Driver Licence' },
  { name: 'Victoria Driver Licence',                 img: '/images/australia.jpg',                                   imgs: ['/images/australia.jpg'],                                   price: 'AUD$100.00',  cat: 'au',  model: 'Victoria Driver Licence' },
  { name: 'Queensland Driver Licence',               img: '/images/australia.jpg',                                   imgs: ['/images/australia.jpg'],                                   price: 'AUD$100.00',  cat: 'au',  model: 'Queensland Driver Licence' },
  { name: 'Western Australia Driver Licence',        img: '/images/australia.jpg',                                   imgs: ['/images/australia.jpg'],                                   price: 'AUD$100.00',  cat: 'au',  model: 'WA Driver Licence' },
  { name: 'South Australia Driver Licence',          img: '/images/australia.jpg',                                   imgs: ['/images/australia.jpg'],                                   price: 'AUD$100.00',  cat: 'au',  model: 'SA Driver Licence' },
  { name: 'Tasmania Driver Licence',                 img: '/images/australia.jpg',                                   imgs: ['/images/australia.jpg'],                                   price: 'AUD$100.00',  cat: 'au',  model: 'Tasmania Driver Licence' },
  { name: 'ACT Driver Licence',                      img: '/images/australia.jpg',                                   imgs: ['/images/australia.jpg'],                                   price: 'AUD$100.00',  cat: 'au',  model: 'ACT Driver Licence' },
  { name: 'Northern Territory Driver Licence',       img: '/images/australia.jpg',                                   imgs: ['/images/australia.jpg'],                                   price: 'AUD$100.00',  cat: 'au',  model: 'NT Driver Licence' },
])

function generateOrderId() {
  return 'CM-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase()
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function OrdersInner() {
  const params      = useSearchParams()
  const paramSlug   = params.get('slug')    ?? ''
  const paramCountry = params.get('country') ?? ''

  // Auto-select from slug/country params (set by the ID card ORDER NOW button)
  const fromSlug = paramSlug
    ? ALL_PRODUCTS.find(p => p.slug === paramSlug && (paramCountry ? p.country === paramCountry : true))
    : null

  const fromSlugFlat = fromSlug
    ? allProducts.find(p => p.name === fromSlug.name)
    : null

  const defaultProduct = fromSlugFlat ?? allProducts[0]

  const [selected,    setSelected]   = useState(defaultProduct)
  const [activeImg,   setActiveImg]  = useState(0)
  const [qty,         setQty]        = useState(1)
  const [sex,         setSex]        = useState('Male')
  const [hairColor,   setHairColor]  = useState('Black')
  const [eyeColor,    setEyeColor]   = useState('Brown')
  const [heightFt,    setHeightFt]   = useState('')
  const [heightIn,    setHeightIn]   = useState('')
  const [payMethod,   setPayMethod]  = useState('')
  const [whatsapp,    setWhatsapp]   = useState('')
  const [firstName,   setFirstName]  = useState('')
  const [middleName,  setMiddleName] = useState('')
  const [lastName,    setLastName]   = useState('')
  const [birthday,    setBirthday]   = useState('')
  const [weight,      setWeight]     = useState('')
  const [address,     setAddress]    = useState('')
  const [customize,   setCustomize]  = useState('')
  const [photoPreview,setPhotoPreview] = useState('/images/headshot.jpg')
  const [sigPreview,  setSigPreview]   = useState('/images/signature.jpg')
  const [photoBase64, setPhotoBase64]  = useState('')
  const [sigBase64,   setSigBase64]    = useState('')
  const [submitting,  setSubmitting]   = useState(false)
  const [error,       setError]        = useState('')

  const photoInputRef = useRef<HTMLInputElement>(null)
  const sigInputRef   = useRef<HTMLInputElement>(null)

  function handleProductChange(name: string) {
    const found = allProducts.find(p => p.name === name)
    if (found) { setSelected(found); setActiveImg(0) }
  }

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return
    const b64 = await fileToBase64(file); setPhotoPreview(b64); setPhotoBase64(b64)
  }
  async function handleSigChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return
    const b64 = await fileToBase64(file); setSigPreview(b64); setSigBase64(b64)
  }

  const priceNum = parseFloat(selected.price.replace(/[^0-9.]/g, '')) || 120
  const currency = selected.price.replace(/[0-9.,]/g, '').replace(/\s/g,'').trim()
  const total    = `${currency}${(priceNum * qty).toFixed(2)}`

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setError('')
    if (!whatsapp || !firstName || !lastName || !birthday || !heightFt || !weight || !payMethod) {
      setError('Please fill in all required fields marked with *'); return
    }
    setSubmitting(true)
    const orderId     = generateOrderId()
    const submittedAt = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })

    const msg = [
      `🆕 *New Order — CardsMen*`,
      `Order ID: ${orderId}`,
      ``,
      `*Product:* ${selected.name}`,
      `*Quantity:* ${qty}`,
      `*Total:* ${total}`,
      `*Payment:* ${payMethod}`,
      ``,
      `*Customer Details*`,
      `WhatsApp: ${whatsapp}`,
      `Name: ${[firstName, middleName, lastName].filter(Boolean).join(' ')}`,
      `Sex: ${sex}`,
      `Birthday: ${birthday}`,
      `Hair: ${hairColor}  |  Eyes: ${eyeColor}`,
      `Height: ${heightFt}ft ${heightIn}in  |  Weight: ${weight}lbs`,
      address   ? `Address: ${address}`       : '',
      customize ? `Customize: ${customize}` : '',
      ``,
      `📸 Photo & Signature sent via upload.`,
      `_Sent from CardsMen order form_`,
    ].filter(Boolean).join('\n')

    const waUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(msg)}`
    window.open(waUrl, '_blank', 'noopener,noreferrer')

    const orderData = {
      orderId, submittedAt, status: 'new',
      product: selected.name, productImg: selected.img,
      qty, price: selected.price, total, paymentMethod: payMethod,
      whatsapp, firstName, middleName, lastName, sex, birthday,
      hairColor, eyeColor, heightFt, heightIn, weight,
      address, customize,
      hasPhoto: !!photoBase64,
      hasSig:   !!sigBase64,
      // base64 images are NOT stored in Firestore (1MB doc limit)
      // customer sends photo/sig directly via WhatsApp after this form submits
      createdAt: serverTimestamp(),
    }

    try {
      await addDoc(collection(db, 'orders'), orderData)
      fetch('/api/send-order-email', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...orderData, createdAt: submittedAt }),
      }).catch(console.error)

      // Reset
      setWhatsapp(''); setFirstName(''); setMiddleName(''); setLastName('')
      setSex('Male'); setBirthday(''); setHairColor('Black'); setEyeColor('Brown')
      setHeightFt(''); setHeightIn(''); setWeight(''); setAddress(''); setCustomize('')
      setPayMethod(''); setQty(1)
      setPhotoPreview('/images/headshot.jpg'); setSigPreview('/images/signature.jpg')
      setPhotoBase64(''); setSigBase64('')
      setSelected(allProducts[0]); setActiveImg(0)
      if (photoInputRef.current) photoInputRef.current.value = ''
      if (sigInputRef.current)   sigInputRef.current.value   = ''
    } catch (err) {
      console.error(err)
      setError('Something went wrong. Please try again or contact us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <SiteHeader active="Orders" />
      <main>

        {/* ── Page header ── */}
        <div style={{ background: 'var(--light-gray)', borderBottom: '1px solid var(--border)', padding: '28px 0 20px' }}>
          <div className="shell" style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Place Your Order
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '6px' }}>
              Review your selected ID below, then fill in your details.
            </p>
          </div>
        </div>

        <div className="orders-page shell">

          {/* ── PRODUCT IMAGE GALLERY ── */}
          <div style={{ marginBottom: '28px' }}>
            {/* Main image — wood-tone background like the product cards */}
            <div style={{
              background: 'linear-gradient(135deg, #4a2f12 0%, #7b5230 40%, #4a2f12 100%)',
              borderRadius: '12px',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '260px',
              marginBottom: '12px',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selected.imgs[activeImg]}
                alt={selected.name}
                style={{
                  width: '100%',
                  maxWidth: '520px',
                  height: '280px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  boxShadow: '0 6px 24px rgba(0,0,0,0.45)',
                  display: 'block',
                  margin: '0 auto',
                }}
              />
            </div>

            {/* Thumbnails */}
            {selected.imgs.length > 1 && (
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {selected.imgs.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    aria-label={`View image ${i + 1}`}
                    style={{
                      width: '68px',
                      height: '68px',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      border: activeImg === i ? '2px solid var(--red)' : '2px solid var(--border)',
                      cursor: 'pointer',
                      background: '#5c3a1e',
                      padding: 0,
                      flexShrink: 0,
                      transition: 'border-color 0.15s',
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Product name + price under gallery */}
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <h2 style={{ fontSize: 'clamp(16px, 2vw, 20px)', fontWeight: 700, marginBottom: '4px' }}>
                {selected.name}
              </h2>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'baseline' }}>
                <span style={{ fontSize: '22px', fontWeight: 800, color: 'var(--red)' }}>{selected.price}</span>
                {(selected.cat === 'usa' || selected.cat === 'canada') && (
                  <span style={{ fontSize: '15px', color: 'var(--muted)', textDecoration: 'line-through' }}>$150.00</span>
                )}
              </div>
              <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '6px' }}>
                Get 2–3 IDs: $100/pc &nbsp;|&nbsp; Get 4–9 IDs: $90/pc &nbsp;|&nbsp; Get 10+: $80/pc
              </p>
            </div>
          </div>

          {/* ── ORDER.JPG — 90% width banner ── */}
          <div style={{
            width: '90%',
            margin: '0 auto 36px',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-md)',
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/order.jpg"
              alt="How to order"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>

          {/* ── PRODUCT SELECT DROPDOWN ── */}
          <div className="form-row" style={{ marginBottom: '28px', maxWidth: '560px', margin: '0 auto 32px' }}>
            <label style={{ fontWeight: 700, marginBottom: '6px', display: 'block', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)' }}>
              Change Product Selection
            </label>
            <div className="product-select-wrap">
              <select value={selected.name} onChange={e => handleProductChange(e.target.value)}>
                <optgroup label="🇺🇸 USA States">
                  {allProducts.filter(p => p.cat === 'usa').map(p => (
                    <option key={p.name} value={p.name}>{p.name}</option>
                  ))}
                </optgroup>
                <optgroup label="🇨🇦 Canada">
                  {allProducts.filter(p => p.cat === 'canada').map(p => (
                    <option key={p.name} value={p.name}>{p.name}</option>
                  ))}
                </optgroup>
                <optgroup label="🇬🇧 UK">
                  {allProducts.filter(p => p.cat === 'uk').map(p => (
                    <option key={p.name} value={p.name}>{p.name}</option>
                  ))}
                </optgroup>
                <optgroup label="🇩🇪 Germany / 🇳🇱 Netherlands">
                  {allProducts.filter(p => p.cat === 'eu').map(p => (
                    <option key={p.name} value={p.name}>{p.name}</option>
                  ))}
                </optgroup>
                <optgroup label="🇦🇺 Australia">
                  {allProducts.filter(p => p.cat === 'au').map(p => (
                    <option key={p.name} value={p.name}>{p.name}</option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>

          {/* ── ORDER FORM + SUMMARY ── */}
          <div className="orders-grid">

            {/* LEFT: Summary */}
            <div className="orders-summary">
              <h3>Order Summary</h3>
              <div className="orders-summary-row">
                <span>Product:</span>
                <span style={{ fontWeight: 600, textAlign: 'right', maxWidth: '180px', fontSize: '13px' }}>{selected.name}</span>
              </div>
              <div className="orders-summary-row" style={{ marginTop: '14px' }}>
                <strong>Quantity:</strong>
                <div className="qty-control">
                  <button className="qty-btn" type="button" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                  <input className="qty-input" type="number" min={1} value={qty} onChange={e => setQty(Math.max(1, Number(e.target.value)))} />
                  <button className="qty-btn" type="button" onClick={() => setQty(q => q + 1)}>+</button>
                </div>
              </div>
              <div className="orders-summary-row" style={{ marginTop: '10px' }}>
                <span>Unit price:</span><span>{selected.price}</span>
              </div>
              <div className="orders-total-row">
                <span>Total:</span><span>{total}</span>
              </div>
            </div>

            {/* RIGHT: Form */}
            <form className="orders-form" onSubmit={handleSubmit}>

              {error && (
                <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#b91c1c', padding: '12px 16px', borderRadius: '6px', fontSize: '14px' }}>
                  {error}
                </div>
              )}

              <p className="orders-form-section-title">Contact Information</p>
              <div className="form-row">
                <label>WhatsApp Contact <span>*</span></label>
                <input type="tel" placeholder="+1 334 446 8194" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} required />
              </div>

              <p className="orders-form-section-title">Card Information</p>
              <div className="form-cols-2">
                <div className="form-row">
                  <label>First Name <span>*</span></label>
                  <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                </div>
                <div className="form-row">
                  <label>Middle Name</label>
                  <input type="text" placeholder="Middle Name" value={middleName} onChange={e => setMiddleName(e.target.value)} />
                </div>
              </div>
              <div className="form-row">
                <label>Last Name <span>*</span></label>
                <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} required />
              </div>
              <div className="form-row">
                <label>Sex <span>*</span></label>
                <select value={sex} onChange={e => setSex(e.target.value)}>
                  <option>Male</option><option>Female</option>
                </select>
              </div>
              <div className="form-row">
                <label>Birthday <span>*</span></label>
                <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} required style={{ colorScheme: 'light' }} />
              </div>
              <div className="form-cols-2">
                <div className="form-row">
                  <label>Hair Color <span>*</span></label>
                  <select value={hairColor} onChange={e => setHairColor(e.target.value)}>
                    {['Black','Bald','Blonde','Brown','Gray','Red','Sandy','White','Other'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-row">
                  <label>Eyes Color <span>*</span></label>
                  <select value={eyeColor} onChange={e => setEyeColor(e.target.value)}>
                    {['Brown','Black','Blue','Gray','Green','Hazel','Maroon','Pink','Multicolor','Other'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <label>Height <span>*</span></label>
                <div className="form-cols-3">
                  <select value={heightFt} onChange={e => setHeightFt(e.target.value)} required>
                    <option value="">Feet</option>
                    {[4,5,6,7].map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                  <select value={heightIn} onChange={e => setHeightIn(e.target.value)}>
                    <option value="">Inches</option>
                    {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                  <span style={{ fontSize: '13px', color: 'var(--muted)', alignSelf: 'center' }}>in</span>
                </div>
              </div>
              <div className="form-row">
                <label>Weight (lbs) <span>*</span></label>
                <input type="number" placeholder="160" min={80} max={400} value={weight} onChange={e => setWeight(e.target.value)} required />
              </div>
              <div className="form-row">
                <label>Address</label>
                <textarea rows={3} placeholder="123 Main St, Los Angeles, CA 90012" value={address} onChange={e => setAddress(e.target.value)} />
                <p className="form-hint">If not filled in, it will be randomly generated</p>
              </div>
              <div className="form-row">
                <label>Customize</label>
                <textarea rows={3} placeholder="EXP, ISS, DLN, DD, CLASS…" value={customize} onChange={e => setCustomize(e.target.value)} />
                <p className="form-hint">If not filled in, these will be randomly generated</p>
              </div>

              <p className="orders-form-section-title">Photo &amp; Signature</p>

              <div className="form-row">
                <label>Photo <span>*</span></label>
                <div className="photo-row">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photoPreview} alt="Headshot preview"
                    onClick={() => photoInputRef.current?.click()}
                    style={{ cursor: 'pointer', width: '140px', height: '160px', objectFit: 'cover',
                      borderRadius: '6px', border: '1px solid var(--border)', display: 'block', flexShrink: 0 }} />
                  <div>
                    <label htmlFor="photo-upload" className="upload-area" style={{ display: 'block', cursor: 'pointer' }}>
                      <div className="upload-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                      </div>
                      Click to upload photo
                      <input id="photo-upload" ref={photoInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoChange} />
                    </label>
                    <div className="form-hint" style={{ marginTop: '10px' }}>
                      <ul>
                        <li>Selfie or clear face photo</li>
                        <li>No hats, glasses, or obstructions</li>
                        <li>Plain white/light background preferred</li>
                        <li>Head must be fully visible</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <label>Signature</label>
                <div className="photo-row">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={sigPreview} alt="Signature preview"
                    onClick={() => sigInputRef.current?.click()}
                    style={{ cursor: 'pointer', width: '140px', height: '160px', objectFit: 'contain',
                      borderRadius: '6px', border: '1px solid var(--border)', background: '#fff',
                      display: 'block', flexShrink: 0 }} />
                  <div>
                    <label htmlFor="sig-upload" className="upload-area" style={{ display: 'block', cursor: 'pointer' }}>
                      <div className="upload-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                      </div>
                      Click to upload signature
                      <input id="sig-upload" ref={sigInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleSigChange} />
                    </label>
                    <div className="form-hint" style={{ marginTop: '10px' }}>
                      <ul>
                        <li>Sign on white paper, photograph it</li>
                        <li>If not uploaded, auto-generated</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <p className="orders-form-section-title">Payment</p>
              <div className="form-row">
                <label>Payment Method <span>*</span></label>
                <select value={payMethod} onChange={e => setPayMethod(e.target.value)} required>
                  <option value="">Select Payment Method</option>
                  {['Cryptocurrency','Apple Pay','Gift Card','Chime','CashApp','Zelle','Bank Transfer'].map(m => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn-order-now" disabled={submitting}>
                {submitting ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="spin">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                    </svg>
                    Sending…
                  </span>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.123 1.528 5.857L.057 23.882a.5.5 0 0 0 .611.612l6.166-1.453A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.853 0-3.592-.5-5.088-1.375l-.36-.214-3.733.88.897-3.643-.235-.375A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                    </svg>
                    Send Order via WhatsApp
                  </span>
                )}
              </button>

              <p style={{ fontSize: '12px', color: 'var(--muted)', textAlign: 'center', marginTop: '8px' }}>
                WhatsApp will open with your order prefilled. Just hit Send.
                <br />Your order is also saved and emailed to our team automatically.
              </p>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function OrdersPage() {
  return (
    <Suspense fallback={<div style={{ padding: '80px', textAlign: 'center' }}>Loading…</div>}>
      <OrdersInner />
    </Suspense>
  )
}
