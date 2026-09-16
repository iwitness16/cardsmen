import { Footer, PageHeader, SiteHeader } from '@/components/site-shell'

export default function AboutPage() {
  return (
    <>
      <SiteHeader active="About CardsMen" />
      <main>
        <PageHeader title="ABOUT CARDSMEN" />

        <div className="about-page shell">

          <h2>Who Is CardsMen?</h2>
          <p>
            CardsMen is one of the most trusted names in the premium scannable ID industry. We have
            been producing high-quality, scannable IDs for customers across the United States, Canada,
            and internationally for over a decade. Our reputation is built on quality, reliability, and
            discretion.
          </p>
          <p>
            Unlike fly-by-night operations that appear and disappear overnight, CardsMen has
            maintained a consistent, verifiable presence. We are not impersonators or copy-cats — we
            are the real deal.
          </p>

          <h2>Our Products</h2>
          <p>
            Every ID we produce is printed on genuine polycarbonate card material — the same material
            used in real government-issued identification. Our cards include:
          </p>
          <ul style={{ paddingLeft: '22px', lineHeight: '2', color: '#333', fontSize: '15px' }}>
            <li>Working magnetic strips</li>
            <li>Scannable PDF417 barcodes with real-looking encoded data</li>
            <li>UV / blacklight security features</li>
            <li>Microprint and holographic overlays where applicable</li>
            <li>State/country-accurate design, fonts, and layout</li>
            <li>Free duplicate included with every single order</li>
          </ul>

          <h2>Our Quality Standard</h2>
          <p>
            We use professional laser card printing equipment and source card material that matches
            what real DMV-issued cards are made from. Before any order ships, it goes through a
            quality check to ensure every detail — from the UV pattern to the barcode scan — is
            correct.
          </p>
          <p>
            Our cards pass the bend test, the drop test, UV blacklight inspection, and barcode
            scanning at real venues. We stand behind our product.
          </p>

          <h2>Discretion &amp; Privacy</h2>
          <p>
            Your privacy is our priority. We do not store unnecessary personal information, we ship
            in completely plain and discreet packaging, and we communicate through secure channels.
            We recommend using WhatsApp for fastest and most secure communication.
          </p>

          <h2>Beware of Impersonators</h2>
          <p>
            As with any reputable brand, there are impersonators who copy our name and imagery to
            scam customers. Always verify you are on the correct CardsMen website. We will never ask
            you to pay through unofficial or sketchy payment channels without prior communication.
          </p>
          <p>
            If in doubt, reach out to us directly via WhatsApp
            (+1 334-446-8194) before placing an order.
          </p>

          <h2>Contact Us</h2>
          <p>
            Have a question? Visit our{' '}
            <a href="/faqs" style={{ color: 'var(--red)', textDecoration: 'underline' }}>FAQ page</a>{' '}
            for common answers, or head to the{' '}
            <a href="/contact" style={{ color: 'var(--red)', textDecoration: 'underline' }}>Contact page</a>{' '}
            to reach us directly.
          </p>

        </div>
      </main>
      <Footer />
    </>
  )
}
