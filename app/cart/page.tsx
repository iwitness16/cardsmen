import Link from 'next/link'
import { Footer, PageHeader, SiteHeader } from '@/components/site-shell'

function CartIconLarge() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={{ width: '72px', height: '72px', stroke: '#ccc', fill: 'none', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round', margin: '0 auto 20px', display: 'block' }}
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

export default function CartPage() {
  return (
    <>
      <SiteHeader active="" />
      <main>
        <PageHeader title="SHOPPING CART" />

        <div className="cart-page shell">
          {/* Cart is empty state — can be wired to a cart context/state manager later */}
          <div className="cart-empty">
            <CartIconLarge />
            <h2>Your cart is empty</h2>
            <p>You have not added any items yet. Browse our full selection of fake IDs below.</p>
            <Link href="/products" className="btn-red" style={{ display: 'inline-block' }}>
              Browse Products →
            </Link>
          </div>

          {/*
            ── Cart items would be rendered here when state management is connected.
            ── Example structure (for reference, commented out):

            <div className="cart-items">
              <div className="cart-item">
                <img src="/images/california.jpg" alt="California Fake ID" />
                <div>
                  <h3>California Fake ID</h3>
                  <p>$100.00</p>
                  <button>Remove</button>
                </div>
              </div>
            </div>

            <div className="cart-summary">
              <p>Subtotal: $100.00</p>
              <Link href="/contact" className="btn-red">Proceed to Order</Link>
            </div>
          */}
        </div>
      </main>
      <Footer />
    </>
  )
}
