import Link from 'next/link'
import { Footer, PageHeader, SiteHeader } from '@/components/site-shell'
import { AUSTRALIA_PRODUCTS } from '@/lib/products'
import { IDCard } from '@/components/id-card'

export default function AustraliaProductsPage() {
  return (
    <>
      <SiteHeader active="Buy Fake ID" />
      <main>
        <PageHeader title="AUSTRALIA — DRIVER LICENCES" />
        <div className="products-page shell">
          <div style={{ marginBottom: '20px' }}>
            <Link href="/products" style={{ color: '#1a6fa8', fontSize: '13px', fontWeight: 600 }}>
              ← Back to all countries
            </Link>
          </div>
          <section aria-labelledby="au-heading">
            <h2 id="au-heading" className="country-section-title">
              🇦🇺 Australia — Driver Licences
            </h2>
            <div className="products-grid">
              {AUSTRALIA_PRODUCTS.map((p) => (
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
