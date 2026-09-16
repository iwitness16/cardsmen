import Link from 'next/link'
import { Footer, PageHeader, SiteHeader } from '@/components/site-shell'

const products = [
  { name: 'New South Wales Driver Licence', img: '/images/australia.jpg' },
  { name: 'Victoria Driver Licence', img: '/images/australia.jpg' },
  { name: 'Queensland Driver Licence', img: '/images/australia.jpg' },
  { name: 'Western Australia Driver Licence', img: '/images/australia.jpg' },
  { name: 'South Australia Driver Licence', img: '/images/australia.jpg' },
  { name: 'Tasmania Driver Licence', img: '/images/australia.jpg' },
  { name: 'ACT Driver Licence', img: '/images/australia.jpg' },
  { name: 'Northern Territory Driver Licence', img: '/images/australia.jpg' },
  { name: 'New South Wales Driver Licence (Polycarbonate)', img: '/images/australia.jpg' },
  { name: 'Victoria Driver Licence (Polycarbonate)', img: '/images/australia.jpg' },
  { name: 'Queensland Driver Licence (Polycarbonate)', img: '/images/australia.jpg' },
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
        <p className="product-price">AUD$100.00</p>
        <Link href={`/orders?product=${encodedName}&img=${encodedImg}&price=AUD%24100.00`} className="btn-select">
          Place Order
        </Link>
      </div>
    </article>
  )
}

export default function AustraliaProductsPage() {
  return (
    <>
      <SiteHeader active="Buy Fake ID" />
      <main>
        <PageHeader title="AUSTRALIA IDs" />
        <div className="products-page shell">
          <div style={{ marginBottom: '20px' }}>
            <Link href="/products" style={{ color: 'var(--red)', fontSize: '13px', fontWeight: 600 }}>← Back to all countries</Link>
          </div>
          <section aria-labelledby="au-heading">
            <h2 id="au-heading" className="country-section-title">🇦🇺 Australia — Driver Licences</h2>
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
