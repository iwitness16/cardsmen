import Image from 'next/image'
import Link from 'next/link'
import { Footer, PageHeader, SiteHeader } from '@/components/site-shell'

/* ──────────────────────────────────────
   Country data — each card links to its own dedicated page
─────────────────────────────────────── */
const countries = [
  {
    href: '/products/usa',
    image: '/images/maintemplate.jpg',
    flag: '🇺🇸',
    code: 'USA',
    name: 'United States',
    subtitle: '50 State IDs Available',
  },
  {
    href: '/products/canada',
    image: '/images/maintemplate.jpg',
    flag: '🇨🇦',
    code: 'CA',
    name: 'Canada',
    subtitle: '10 Provincial IDs Available',
  },
  {
    href: '/products/uk',
    image: '/images/maintemplate.jpg',
    flag: '🇬🇧',
    code: 'UK',
    name: 'United Kingdom',
    subtitle: 'DVLA Photocard IDs',
  },
  {
    href: '/products/germany',
    image: '/images/maintemplate.jpg',
    flag: '🇩🇪',
    code: 'DE',
    name: 'Germany',
    subtitle: 'German ID Cards',
  },
  {
    href: '/products/netherlands',
    image: '/images/maintemplate.jpg',
    flag: '🇳🇱',
    code: 'NL',
    name: 'Netherlands',
    subtitle: 'Dutch ID Cards',
  },
  {
    href: '/products/australia',
    image: '/images/maintemplate.jpg',
    flag: '🇦🇺',
    code: 'AU',
    name: 'Australia',
    subtitle: 'Australian Driver Licences',
  },
]

export default function ProductsPage() {
  return (
    <>
      <SiteHeader active="Buy Fake ID" />
      <main>
        <PageHeader title="PRODUCTS" />

        <div className="products-page shell">
          <section aria-labelledby="choose-country-heading">
            <h2
              id="choose-country-heading"
              style={{
                fontSize: 'clamp(15px, 2vw, 19px)',
                fontWeight: 700,
                marginBottom: '28px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                paddingBottom: '10px',
                borderBottom: '3px solid var(--red)',
              }}
            >
              Choose a Country
            </h2>

            <div className="country-overview-grid">
              {countries.map((c) => (
                <Link href={c.href} className="country-overview-card" key={c.href} style={{ padding: 0, overflow: 'hidden', gap: 0 }}>
                  {/* Country image */}
                  <div style={{ width: '100%', background: '#f0f4f8', padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                      src={c.image}
                      alt={`${c.name} Fake ID`}
                      width={400}
                      height={200}
                      style={{ width: '100%', height: '190px', objectFit: 'contain', display: 'block' }}
                    />
                  </div>
                  {/* Card content below image */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding: '20px 16px 22px' }}>
                    <span style={{ fontSize: 'clamp(32px, 4.5vw, 48px)', lineHeight: 1 }}>{c.flag}</span>
                    <span className="country-overview-name">{c.name}</span>
                    <span className="country-overview-count">{c.subtitle}</span>
                    <span className="country-overview-btn">Browse IDs</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
