import Link from 'next/link'
import { Footer, PageHeader, SiteHeader } from '@/components/site-shell'
import { UK_PRODUCTS } from '@/lib/products'
import { IDCard } from '@/components/id-card'

export default function UKProductsPage() {
  return (
    <>
      <SiteHeader active="Buy Fake ID" />
      <main>
        <PageHeader title="UNITED KINGDOM — DVLA PHOTOCARDS" />
        <div className="products-page shell">
          <div style={{ marginBottom: '20px' }}>
            <Link href="/products" style={{ color: '#1a6fa8', fontSize: '13px', fontWeight: 600 }}>
              ← Back to all countries
            </Link>
          </div>
          <section aria-labelledby="uk-heading">
            <h2 id="uk-heading" className="country-section-title">
              🇬🇧 United Kingdom — DVLA Photocards
            </h2>
            <div className="products-grid">
              {UK_PRODUCTS.map((p) => (
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
