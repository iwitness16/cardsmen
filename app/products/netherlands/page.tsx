import Link from 'next/link'
import { Footer, PageHeader, SiteHeader } from '@/components/site-shell'
import { NETHERLANDS_PRODUCTS } from '@/lib/products'
import { IDCard } from '@/components/id-card'

export default function NetherlandsProductsPage() {
  return (
    <>
      <SiteHeader active="Buy Fake ID" />
      <main>
        <PageHeader title="NETHERLANDS — NATIONAL ID CARDS" />
        <div className="products-page shell">
          <div style={{ marginBottom: '20px' }}>
            <Link href="/products" style={{ color: '#1a6fa8', fontSize: '13px', fontWeight: 600 }}>
              ← Back to all countries
            </Link>
          </div>
          <section aria-labelledby="nl-heading">
            <h2 id="nl-heading" className="country-section-title">
              🇳🇱 Netherlands — Dutch ID Cards
            </h2>
            <div className="products-grid">
              {NETHERLANDS_PRODUCTS.map((p) => (
                <IDCard key={p.slug} product={p} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
