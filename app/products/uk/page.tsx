import Link from 'next/link'
import { Footer, PageHeader, SiteHeader } from '@/components/site-shell'

const ukProducts = [
  { name: 'UK Fake ID — Scannable DVLA Photocard (Teslin)', img: 'https://www.fakeids.com/media/product/fakeids_front.jpg' },
  { name: 'UK Provisional Licence (Polycarbonate) — DVLA-Grade', img: 'https://www.fakeids.com/media/product/fakeids_front.jpg' },
  { name: 'UK Polycarbonate Licence — Genuine DVLA Photocard Stock', img: 'https://www.fakeids.com/media/product/fakeids_front.jpg' },
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
        <p className="product-price">£80.00</p>
        <Link href={`/orders?product=${encodedName}&img=${encodedImg}&price=%C2%A380.00`} className="btn-select">
          Place Order
        </Link>
      </div>
    </article>
  )
}

export default function UKProductsPage() {
  return (
    <>
      <SiteHeader active="Buy Fake ID" />
      <main>
        <PageHeader title="UNITED KINGDOM IDs" />
        <div className="products-page shell">
          <div style={{ marginBottom: '20px' }}>
            <Link href="/products" style={{ color: 'var(--red)', fontSize: '13px', fontWeight: 600 }}>← Back to all countries</Link>
          </div>
          <section aria-labelledby="uk-heading">
            <h2 id="uk-heading" className="country-section-title">🇬🇧 United Kingdom — DVLA Photocards</h2>
            <div className="products-grid">
              {ukProducts.map((p, i) => <ProductCard key={i} name={p.name} img={p.img} />)}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
