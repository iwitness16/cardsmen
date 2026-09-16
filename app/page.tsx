import Image from 'next/image'
import Link from 'next/link'
import { Footer, SiteHeader } from '@/components/site-shell'

/* ── uses data ── */
const uses = [
  {
    img: 'use-entertainment.jpg',
    title: 'Enter entertainment venues',
    desc: 'Pass security checks with confidence and access nightclubs, bars, and entertainment venues.',
  },
  {
    img: 'use-event.jpg',
    title: 'Attend an event or competition',
    desc: 'Attend parties, social events, and legally participate in sporting competitions.',
  },
  {
    img: 'use-travel.jpg',
    title: 'Travel, car rental and hotel stay',
    desc: 'Rent a car for cross-state travel in the US and check into your hotel quickly.',
  },
  {
    img: 'use-purchase.jpg',
    title: 'Purchase restricted items',
    desc: 'Alcohol, tobacco and other restricted products accessible at any time.',
  },
  {
    img: 'use-employment.jpg',
    title: 'Get employment opportunities',
    desc: 'Meet career requirements (sales, driver) and secure employment faster.',
  },
  {
    img: 'use-more.jpg',
    title: 'Waiting for you to unlock more uses',
    desc: '',
  },
]

/* ── how-to steps ── */
const steps = [
  'Fill in your ID and shipping address info',
  'Submit order, contact us, complete payment',
  'Get electronic ID preview (fastest 3 days)',
  'Get package tracking number (2 days later)',
  'Receive your ID package (fastest 5–7 days)',
]

export default function HomePage() {
  return (
    <>
      <SiteHeader active="Home" />
      <main>

        {/* ── HERO BANNER — entire image is a link to /products ── */}
        <Link href="/products" aria-label="Shop scannable IDs">
          <section
            className="hero-banner"
            style={{ cursor: 'pointer' }}
            aria-label="CardsMen hero banner — click to shop"
          >
            <Image
              src="/images/cartelhero.jpg"
              alt="CardsMen — Best Scannable IDs. Click to shop."
              width={1400}
              height={400}
              priority
              style={{ display: 'block', width: '100%', height: 'auto' }}
            />
          </section>
        </Link>

        {/* ── VIDEO REVIEW — directly below hero ── */}
        <section className="hero-video-section">
          <div className="shell">
            <h2>See What Our Customers Say</h2>
            <p className="video-subtitle">
              Real feedback from real customers. Watch the review below and place your order with confidence.
            </p>
            <div style={{ maxWidth: '680px', margin: '0 auto', borderRadius: '10px', overflow: 'hidden', background: '#000', boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
              <video
                src="/videos/review.mp4"
                controls
                playsInline
                style={{ width: '100%', display: 'block' }}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </section>

        {/* ── MIDPAGE IMAGE SECTION ── */}
        <section style={{ padding: '48px 0', background: '#f8fafc' }} aria-label="Browse our ID collection">
          <div className="shell">
            <div style={{
              background: '#fff',
              borderRadius: '0',
              overflow: 'hidden',
              boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
              border: '1px solid var(--border)',
            }}>
              {/* Top label bar — no emoji */}
              <div style={{
                background: 'linear-gradient(90deg, #0f2d52 0%, #1a6fa8 100%)',
                padding: '14px 28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '10px',
              }}>
                <span style={{ color: '#fff', fontWeight: 800, fontSize: 'clamp(13px, 2vw, 16px)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Latest 2026 Versions Now Available
                </span>
                <Link href="/products" style={{
                  background: '#fff',
                  color: '#1a6fa8',
                  padding: '7px 20px',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}>
                  Explore All IDs →
                </Link>
              </div>

              {/* The image itself — fully visible, no crop */}
              <Link href="/products" aria-label="Browse all IDs" style={{ display: 'block', lineHeight: 0 }}>
                <Image
                  src="/images/midpage.jpg"
                  alt="CardsMen premium scannable IDs — 2026 collection"
                  width={1400}
                  height={700}
                  style={{ display: 'block', width: '100%', height: 'auto' }}
                />
              </Link>

              {/* Bottom CTA strip */}
              <div style={{
                padding: '20px 28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                borderTop: '1px solid var(--border)',
              }}>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '15px', marginBottom: '2px' }}>All IDs include a free duplicate</p>
                  <p style={{ fontSize: '13px', color: 'var(--muted)' }}>Starting from $120 · Ships discreetly worldwide</p>
                </div>
                <Link href="/orders" className="btn-yellow" style={{ borderRadius: '8px', padding: '11px 28px', whiteSpace: 'nowrap' }}>
                  Order Now
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── INTRO ── */}
        <section className="home-intro">
          <div className="shell">
            <h2>CardsMen Scannable IDs</h2>
            <p>
              The best scannable IDs made by CardsMen — featuring{' '}
              <a href="/products">magnetic strips, barcodes, and UV security features</a>. Trusted
              on campuses across the US for over a decade. Our IDs pass expert review at any bar,
              nightclub, or casino.
            </p>
            <h2 style={{ marginTop: '32px' }}>The Official CardsMen</h2>
            <p>
              CardsMen has been the original and only real ID maker since day one. Do not be fooled
              by knock-off sites using our name — verify our domain and order direct.
            </p>
            <div style={{ marginTop: '28px', display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/products" className="btn-yellow" style={{ borderRadius: '8px', padding: '12px 32px' }}>Browse IDs</Link>
              <Link href="/pricing" className="btn-outline-dark" style={{ borderRadius: '8px', padding: '12px 32px', border: '2px solid #1a6fa8', color: '#1a6fa8' }}>Pricing &amp; Payment</Link>
            </div>
          </div>
        </section>

        <hr className="home-divider" />

        {/* ── 3-FEATURE PROOF ── */}
        <section className="features-section">
          <div className="shell">
            <div className="features-grid">

              <div className="feature-card">
                <div style={{ width: '100%', background: '#f0f4f8', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <Image
                    src="/images/maintemplate.jpg"
                    alt="Shop Scannable IDs"
                    width={400}
                    height={240}
                    style={{ width: '100%', height: '220px', objectFit: 'contain', display: 'block' }}
                  />
                </div>
                <h3>Shop Scannable IDs</h3>
                <p>
                  Best selection of quality{' '}
                  <a href="/products">scannable IDs</a> customized with your image and
                  information. Every card comes with a free duplicate.
                </p>
                <Link href="/products" className="view-more-link">View more →</Link>
              </div>

              <div className="feature-card">
                <div style={{ width: '100%', background: '#f0f4f8', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <Image
                    src="/images/maintemplate.jpg"
                    alt="Premium ID Maker"
                    width={400}
                    height={240}
                    style={{ width: '100%', height: '220px', objectFit: 'contain', display: 'block' }}
                  />
                </div>
                <h3>Premium ID Maker</h3>
                <p>
                  CardsMen uses high-quality laser card printers on polycarbonate material —
                  identical to real government-issued IDs.
                </p>
                <Link href="/products" className="view-more-link">View more →</Link>
              </div>

              <div className="feature-card">
                <div style={{ width: '100%', background: '#f0f4f8', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <Image
                    src="/images/maintemplate.jpg"
                    alt="CardsMen Est. 2010"
                    width={400}
                    height={240}
                    style={{ width: '100%', height: '220px', objectFit: 'contain', display: 'block' }}
                  />
                </div>
                <h3>CardsMen Est. 2010</h3>
                <p>
                  <a href="/about">CardsMen</a> is the official and trusted ID maker for over 15
                  years. Do not be misled by impostors.
                </p>
                <Link href="/products" className="view-more-link">View more →</Link>
              </div>

            </div>
          </div>
        </section>

        {/* ── SECURITY FEATURES — just before the "uses" section ── */}
        <section className="security-section" aria-labelledby="security-heading">
          <div className="shell">
            <h2 id="security-heading">What Makes Our IDs Pass Every Scan</h2>
            <p className="security-subtitle">
              Every card ships with the full stack of security layers found on real government-issued
              IDs — so you walk in with complete confidence.
            </p>
            <div className="security-card">
              <Image
                src="/images/secfeat.jpg"
                alt="CardsMen ID security features breakdown"
                width={860}
                height={480}
                style={{ display: 'block', width: '100%', height: 'auto' }}
              />
              <div className="security-card-body">
                <h3>Real Security. Real Confidence.</h3>
                <p>
                  Polycarbonate cards, UV ink, laser microprint, working barcodes and magnetic strips —
                  the same features inspectors look for on a genuine ID.
                </p>
                <ul className="security-features-list">
                  <li>Scannable PDF417 Barcode</li>
                  <li>Working Magnetic Strip</li>
                  <li>UV / Blacklight Layer</li>
                  <li>Holographic Overlay</li>
                  <li>Laser Microprint</li>
                  <li>Polycarbonate Material</li>
                  <li>Ghost Portrait</li>
                  <li>Free Duplicate Included</li>
                </ul>
                <div style={{ marginTop: '28px' }}>
                  <Link href="/products" className="btn-yellow" style={{ borderRadius: '8px', padding: '12px 32px', display: 'inline-block' }}>
                    Order Your ID →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT A SCANNABLE ID CAN DO FOR YOU ── */}
        <section className="uses-section" aria-labelledby="uses-heading">
          <div className="shell">
            <h2 id="uses-heading">What a scannable ID card can do for you?</h2>
            <div className="uses-grid">
              {uses.map((use) => (
                <div className="use-card" key={use.title}>
                  <Image
                    src={`/images/${use.img}`}
                    alt={use.title}
                    width={400}
                    height={258}
                    className="use-card-img"
                    style={{ width: '100%', aspectRatio: '1.55', objectFit: 'cover' }}
                  />
                  <h3>{use.title}</h3>
                  {use.desc && <p>{use.desc}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW TO GET YOUR ID ── */}
        <section className="howto-section" aria-labelledby="howto-heading">
          <div className="shell">
            <h2 id="howto-heading">How to Get the Best Scannable ID</h2>
            <div className="howto-grid">
              <div>
                <Image
                  src="/images/howto-delivery.jpg"
                  alt="ID delivery"
                  width={480}
                  height={560}
                  className="howto-img"
                  style={{ width: '100%', borderRadius: '12px', objectFit: 'cover', aspectRatio: '0.85', display: 'block', background: '#222' }}
                />
              </div>
              <div className="howto-steps">
                {steps.map((step, i) => (
                  <div key={i}>
                    <div className="howto-step">
                      <span className="step-num">{i + 1}.</span>
                      <span className="step-text">{step}</span>
                    </div>
                    {i < steps.length - 1 && <span className="step-arrow">↓</span>}
                  </div>
                ))}
                <div className="howto-actions">
                  <Link href="/pricing" className="btn-yellow">Order Now</Link>
                  <Link href="/contact" className="btn-outline-dark">Contact Us</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── POLYCARBONATE NOTE ── */}
        <section className="reviews-section" aria-label="Polycarbonate material info">
          <div className="shell">
            <h2 style={{ marginBottom: '16px', textAlign: 'center' }}>Do not risk using a low-quality ID</h2>
            <div className="poly-section">
              <p>
                It is vital that your ID be printed on the correct material — polycarbonate. When real,
                it makes a distinct metallic sound like a DVD. Many states now require this material,
                including California, New York, Florida, and more. Rest assured that CardsMen uses
                genuine polycarbonate to make every ID.
              </p>
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section className="cta-banner" aria-label="Order now call to action">
          <Image
            src="/images/cartelhero.jpg"
            alt=""
            fill
            style={{ objectFit: 'cover', zIndex: 0 }}
            aria-hidden="true"
          />
          <div className="cta-banner-bg" />
          <div className="shell cta-banner-content">
            <h2>Ready to get your scannable ID?</h2>
            <Link href="/products" className="btn-outline-white">BROWSE IDs</Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
