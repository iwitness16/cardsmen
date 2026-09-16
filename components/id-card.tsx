import Link from 'next/link'
import type { Product } from '@/lib/products'

/* Cart icon SVG for ORDER NOW button */
function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  )
}

export function IDCard({ product: p }: { product: Product }) {
  return (
    <article className="id-card">
      {p.isNew && <span className="id-card-new-badge">new</span>}

      {/* ID photo on wood-tone background */}
      <div className="id-card-img-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.images[0]}
          alt={p.name}
          loading="lazy"
          width={320}
          height={200}
        />
      </div>

      {/* Info body */}
      <div className="id-card-body">
        <h3 className="id-card-name">{p.name}</h3>

        <div className="id-card-price-row">
          <span className="id-card-price">{p.currency}{p.price}.00</span>
          {p.originalPrice && (
            <span className="id-card-price-original">{p.currency}{p.originalPrice}.00</span>
          )}
        </div>

        <ul className="id-card-tiers">
          {p.bulkTiers.map((t, i) => (
            <li key={i}>{t.label}</li>
          ))}
        </ul>

        {p.freeShipping && (
          <p className="id-card-shipping">
            Upon 2 cards/order, <span>free shipping</span>
          </p>
        )}

        <Link
          href={`/orders?slug=${p.slug}&country=${p.country}`}
          className="btn-order-now-card"
          aria-label={`Order ${p.name}`}
        >
          <CartIcon />
          ORDER NOW
        </Link>
      </div>
    </article>
  )
}
