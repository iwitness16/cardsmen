import Link from 'next/link'
import { Footer, PageHeader, SiteHeader } from '@/components/site-shell'
import { CANADA_PRODUCTS } from '@/lib/products'
import { IDCard } from '@/components/id-card'

export default function CanadaProductsPage() {
  return (
    <>
      <SiteHeader active="Buy Fake ID" />
      <main>
        <PageHeader title="CANADA — PROVINCIAL IDs" />
        <div className="products-page shell">
          <div style={{ marginBottom: '20px' }}>
            <Link href="/products" style={{ color: 'var(--red)', fontSize: '13px', fontWeight: 600 }}>
              ← Back to all countries
            </Link>
          </div>
          <section aria-labelledby="ca-heading">
            <h2 id="ca-heading" className="country-section-title">
              🇨🇦 Canada — Provincial IDs
            </h2>
            <div className="products-grid">
              {CANADA_PRODUCTS.map((p) => (
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
