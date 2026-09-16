import Link from 'next/link'
import { Footer, PageHeader, SiteHeader } from '@/components/site-shell'

const products = [
  { name: 'Germany Fake ID — Scannable Replica', img: '/images/germany.jpg' },
  { name: 'Germany Fake ID (Polycarbonate)', img: '/images/germany.jpg' },
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

export default function GermanyProductsPage() {
  return (
    <>
      <SiteHeader active="Buy Fake ID" />
      <main>
        <PageHeader title="GERMANY IDs" />
        <div className="products-page shell">
          <div style={{ marginBottom: '20px' }}>
            <Link href="/products" style={{ color: 'var(--red)', fontSize: '13px', fontWeight: 600 }}>← Back to all countries</Link>
          </div>
          <section aria-labelledby="de-heading">
            <h2 id="de-heading" className="country-section-title">🇩🇪 Germany — National ID Cards</h2>
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
