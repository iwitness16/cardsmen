import { Footer, PageHeader, SiteHeader } from '@/components/site-shell'

export default function PricingPage() {
  return (
    <>
      <SiteHeader active="Pricing-Payment" />
      <main>
        <PageHeader title="HOW TO BUY A SCANNABLE ID" />

        <div className="pricing-page shell">

          <h2>ID Pricing and Payment Options</h2>

          <h3>ID Pricing</h3>
          <p><strong>$100 for 1 ID + free duplicate</strong></p>
          <p><strong>$80 each for 2 IDs + duplicate of each</strong></p>
          <p><strong>$70 each for 3–4 IDs + duplicate of each</strong></p>
          <p><strong>$50 each for 5 or more IDs + duplicate of each</strong></p>
          <p>
            When ordering <strong>more than one</strong> you can pick from <strong>any</strong> ID
            CardsMen makes at the pricing above — it does <strong>not</strong> have to be the same
            state.
          </p>

          <h3>Payment Options</h3>
          <p>
            <strong>Bitcoin</strong> (Our preferred payment) — If you have PayPal, Venmo, or
            Cash App you can easily pay in minutes with Bitcoin.
          </p>
          <p><strong>Walmart Store Gift Card</strong> – Buy online or at any Walmart store</p>
          <p><strong>Target Store Gift Card</strong> – Buy online or at any Target store</p>
          <p><strong>Best Buy Gift Card</strong> – Buy online or at any Best Buy store</p>
          <p><strong>Google Play Gift Card</strong> – Buy online or at most convenience/drug stores</p>
          <p><strong>Steam Gift Card</strong> – Buy online or at most convenience/gaming stores</p>

          <h3>How to Order</h3>
          <ol style={{ paddingLeft: '20px', lineHeight: '1.9', fontSize: '15px', color: '#333' }}>
            <li>Browse our <a href="/products">products page</a> and choose your state or country.</li>
            <li>Click &ldquo;Select options&rdquo; and fill in the order form on the <a href="/orders">orders page</a>.</li>
            <li>Send your photo and information via the secure contact form or WhatsApp.</li>
            <li>Choose your payment method and complete payment.</li>
            <li>Your ID(s) will be shipped discreetly within the estimated arrival time.</li>
          </ol>

          <h3>What Information We Need</h3>
          <ul>
            <li>Your photo (plain background preferred)</li>
            <li>Your signature on white paper, photographed</li>
            <li>Name to print on the ID</li>
            <li>Date of birth</li>
            <li>Address</li>
            <li>Height &amp; weight</li>
            <li>Eye color</li>
            <li>State / country selection</li>
          </ul>

          <h3>Shipping</h3>
          <p>
            We ship worldwide using discreet shipping methods including USPS, FedEx, DHL, and others.
            We do ship to PO Boxes. For security reasons we do not detail exact shipping methods on
            our website.
          </p>
          <p>
            <strong>Typical arrival time:</strong> 7–14 business days for USA orders. International
            orders may take 2–4 weeks depending on customs.
          </p>

          <h3>Questions?</h3>
          <p>
            Visit our <a href="/faqs">FAQ page</a> or{' '}
            <a href="/contact">contact us</a> directly via WhatsApp for the fastest
            response.
          </p>

        </div>
      </main>
      <Footer />
    </>
  )
}
