import Link from 'next/link'
import { Footer, PageHeader, SiteHeader } from '@/components/site-shell'
import { USA_PRODUCTS } from '@/lib/products'
import { IDCard } from '@/components/id-card'

export default function USAProductsPage() {
  return (
    <>
      <SiteHeader active="Buy Fake ID" />
      <main>
        <PageHeader title="USA — STATE IDs" />
        <div className="products-page shell">
          <div style={{ marginBottom: '20px' }}>
            <Link href="/products" style={{ color: '#1a6fa8', fontSize: '13px', fontWeight: 600 }}>
              ← Back to all countries
            </Link>
          </div>
          <section aria-labelledby="usa-heading">
            <h2 id="usa-heading" className="country-section-title">
              🇺🇸 United States — State IDs
            </h2>
            <div className="products-grid">
              {USA_PRODUCTS.map((p) => (
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
