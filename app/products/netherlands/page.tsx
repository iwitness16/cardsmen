import Link from 'next/link'
import { Footer, PageHeader, SiteHeader } from '@/components/site-shell'

const products = [
  { name: 'Netherlands Fake ID — Scannable Replica', img: '/images/netherlands.jpg' },
  { name: 'Netherlands Fake ID (Polycarbonate)', img: '/images/netherlands.jpg' },
]

function ProductCard({ name, img }: { name: string; img: string }) {
  const encodedName = encodeURIComponent(name)
  const encodedImg = encodeURIComponent(img)
  return (
    <article className="product-card">
      <div className="product-card-img-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt={name} loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
      <div className="product-card-body">
        <h3>{name}</h3>
        <p className="product-price">€100.00</p>
        <Link href={`/orders?product=${encodedName}&img=${encodedImg}&price=%E2%82%AC100.00`} className="btn-select">
          Place Order
        </Link>
      </div>
    </article>
  )
}

export default function NetherlandsProductsPage() {
  return (
    <>
      <SiteHeader active="Buy Fake ID" />
      <main>
        <PageHeader title="NETHERLANDS IDs" />
        <div className="products-page shell">
          <div style={{ marginBottom: '20px' }}>
            <Link href="/products" style={{ color: 'var(--red)', fontSize: '13px', fontWeight: 600 }}>← Back to all countries</Link>
          </div>
          <section aria-labelledby="nl-heading">
            <h2 id="nl-heading" className="country-section-title">🇳🇱 Netherlands — Dutch ID Cards</h2>
            <div className="products-grid">
              {products.map((p, i) => <ProductCard key={i} name={p.name} img={p.img} />)}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
