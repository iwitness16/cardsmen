import Link from 'next/link'
import { Footer, PageHeader, SiteHeader } from '@/components/site-shell'
import { GERMANY_PRODUCTS } from '@/lib/products'
import { IDCard } from '@/components/id-card'

export default function GermanyProductsPage() {
  return (
    <>
      <SiteHeader active="Buy Fake ID" />
      <main>
        <PageHeader title="GERMANY — NATIONAL ID CARDS" />
        <div className="products-page shell">
          <div style={{ marginBottom: '20px' }}>
            <Link href="/products" style={{ color: '#1a6fa8', fontSize: '13px', fontWeight: 600 }}>
              ← Back to all countries
            </Link>
          </div>
          <section aria-labelledby="de-heading">
            <h2 id="de-heading" className="country-section-title">
              🇩🇪 Germany — National ID Cards
            </h2>
            <div className="products-grid">
              {GERMANY_PRODUCTS.map((p) => (
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
