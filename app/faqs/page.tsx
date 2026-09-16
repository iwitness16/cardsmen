'use client'

import {
  Zap, Truck, Package, Video, Clock, Camera, DollarSign,
  ShieldAlert, PenLine, FlipHorizontal, ScanLine,
  Copy, CreditCard
} from 'lucide-react'
import { useState } from 'react'
import { Footer, PageHeader, SiteHeader } from '@/components/site-shell'

const faqs = [
  {
    Icon: Zap,
    question: 'Express orders?',
    answer: 'Yes, we offer express processing for an additional fee. Contact us via WhatsApp to discuss express order availability and pricing.',
  },
  {
    Icon: Truck,
    question: 'How do you ship?',
    answer: 'We use a variety of shippers — USPS, FedEx, DHL, and others. Yes, we do ship to PO Boxes. Our goal is to get your order to you as fast as possible, but detailing methods on our site is not wise for security reasons. Please respect this.',
  },
  {
    Icon: Package,
    question: 'Shipping & tracking details',
    answer: 'Once your order is shipped you will receive a tracking number via your chosen contact method. Packages are shipped in plain, discreet packaging with no indication of contents.',
  },
  {
    Icon: Video,
    question: 'Customer review video promotion?',
    answer: 'We love customer reviews! If you send us a video review of your CardsMen ID we will give you a discount on your next order. Contact us with your video for details.',
  },
  {
    Icon: Clock,
    question: 'Arrival time?',
    answer: 'USA orders typically arrive in 7–14 business days. Canadian orders take 10–18 business days. International orders (UK, Europe, etc.) generally take 2–4 weeks depending on customs.',
  },
  {
    Icon: Camera,
    question: 'Image for your ID?',
    answer: 'Send a clear, well-lit photo of your face against a plain light background. No hats, glasses, or strong shadows. The better the photo, the better your ID will look. We also need your signature on white paper.',
  },
  {
    Icon: DollarSign,
    question: 'Become a reseller?',
    answer: 'Yes! We have a generous reseller program with bulk discounts. Contact us via WhatsApp to learn about our reseller pricing and how to get started.',
  },
  {
    Icon: ShieldAlert,
    question: 'Issue with my order?',
    answer: 'CardsMen does not scam customers. If you believe there is an issue with your order, contact us directly and we will resolve it. Beware of imposter sites using our name — always verify you are on the correct website.',
  },
  {
    Icon: PenLine,
    question: 'Your signature?',
    answer: 'Write your desired signature on a plain white piece of paper, photograph it clearly against a white background, and send it with your order details. Keep it natural — just sign as you normally would.',
  },
  {
    Icon: FlipHorizontal,
    question: 'Bend test?',
    answer: 'All CardsMen IDs are printed on genuine polycarbonate card material — the same material used in real government-issued IDs. They will pass the bend test and make the characteristic sound when flexed.',
  },
  {
    Icon: ScanLine,
    question: 'Scannable IDs?',
    answer: 'Yes! Every ID we produce includes a working magnetic strip and a scannable barcode (PDF417). The barcode encodes real-looking data that will pass standard ID scanner checks used at bars, clubs, and liquor stores.',
  },
  {
    Icon: Copy,
    question: 'Free duplicate included?',
    answer: 'Yes — every single order comes with a free duplicate ID at no extra cost. We do this because IDs can get lost or confiscated. You pay for one, you get two.',
  },
  {
    Icon: CreditCard,
    question: 'What payment methods do you accept?',
    answer: 'We accept Bitcoin (preferred), Walmart Gift Cards, Target Gift Cards, Best Buy Gift Cards, Google Play Gift Cards, and Steam Gift Cards. Visit our Pricing-Payment page for full details.',
  },
]

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <>
      <SiteHeader active="Questions" />
      <main>
        <PageHeader title="FAQs" />

        <div className="faq-page shell">
          <p className="faq-intro">
            Answers to the most frequently asked questions when ordering from CardsMen.
          </p>

          <div className="faq-list" role="list">
            {faqs.map(({ Icon, question, answer }, i) => (
              <div
                className={`faq-item${openIndex === i ? ' open' : ''}`}
                key={i}
                role="listitem"
              >
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={openIndex === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className="faq-icon" aria-hidden="true">
                    <Icon size={18} strokeWidth={1.8} />
                  </span>
                  <span>{question}</span>
                  <span className="faq-toggle" aria-hidden="true">
                    {openIndex === i
                      ? <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                      : <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    }
                  </span>
                </button>
                <div
                  className="faq-answer"
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-label={question}
                >
                  {answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
