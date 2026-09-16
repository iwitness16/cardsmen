'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Footer, SiteHeader } from '@/components/site-shell'
import type { Product } from '@/lib/products'

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  )
}

export function ProductDetailClient({ product: p }: { product: Product }) {
  const [activeImg, setActiveImg] = useState(0)

  const waMsg = [
    `🛒 *Order Request — CardsMen*`,
    ``,
    `*Product:* ${p.name}`,
    `*Model:* ${p.model}`,
    `*Price:* ${p.currency}${p.price}.00`,
    ``,
    `Please send me ordering instructions.`,
  ].join('\n')

  const waUrl = `https://wa.me/13344468194?text=${encodeURIComponent(waMsg)}`

  return (
    <>
      <SiteHeader active="Buy Fake ID" />
      <main>
        <div className="product-detail-page shell">

          {/* Breadcrumb */}
          <nav style={{
            fontSize: '13px',
            color: 'var(--muted)',
            marginBottom: '24px',
            display: 'flex',
            gap: '6px',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
            <Link href="/products" style={{ color: 'var(--red)', fontWeight: 600 }}>Products</Link>
            <span>/</span>
            <Link
              href={`/products/${p.country}`}
              style={{ color: 'var(--red)', fontWeight: 600, textTransform: 'capitalize' }}
            >
              {p.country === 'usa' ? '🇺🇸 USA' : p.country === 'canada' ? '🇨🇦 Canada' : p.country}
            </Link>
            <span>/</span>
            <span style={{ color: 'var(--foreground)' }}>{p.name}</span>
          </nav>

          <div className="product-detail-grid">

            {/* ── Left: image gallery ── */}
            <div>
              <div className="product-detail-main-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.images[activeImg]}
                  alt={p.name}
                  style={{
                    width: '100%',
                    maxWidth: '460px',
                    height: '300px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    boxShadow: '0 6px 24px rgba(0,0,0,0.4)',
                    display: 'block',
                  }}
                />
              </div>
              <div className="product-detail-thumbs">
                {p.images.map((img, i) => (
                  <button
                    key={i}
                    className={`product-detail-thumb${activeImg === i ? ' active' : ''}`}
                    onClick={() => setActiveImg(i)}
                    aria-label={`View image ${i + 1}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* ── Right: product info ── */}
            <div className="product-detail-info">

              <div className="product-detail-meta">
                <span>▶ Stock: <span className="in-stock">In Stock</span></span>
                <span>▶ Model: <strong>{p.model}</strong></span>
              </div>

              <div className="product-detail-price-row">
                <span className="product-detail-price">
                  {p.currency}{p.price}.00
                </span>
                {p.originalPrice && (
                  <span className="product-detail-original">
                    {p.currency}{p.originalPrice}.00
                  </span>
                )}
              </div>

              <ul className="product-detail-tiers">
                {p.bulkTiers.map((t, i) => (
                  <li key={i}>{t.label}</li>
                ))}
              </ul>

              {/* ORDER PHYSICAL only — no digital */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-order-physical"
              >
                <CartIcon />
                ORDER PHYSICAL
              </a>

              <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '10px' }}>
                Physical card ships in discreet packaging. Includes free duplicate.
              </p>

              {/* Security features */}
              <div style={{
                marginTop: '28px',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                padding: '18px 20px',
              }}>
                <p style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  marginBottom: '10px',
                }}>
                  Security Features
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {[
                    'Holograms — difficult-to-replicate elements',
                    'UV Printing — visible under UV / blacklight',
                    'Security Threads — embedded under light',
                    'Watermarks — visible when held to light',
                    'Scannable Barcode & Magnetic Strip',
                    'Polycarbonate Material — passes bend test',
                    'Free Duplicate Included',
                  ].map((f) => (
                    <li key={f} style={{
                      fontSize: '13px',
                      color: '#444',
                      display: 'flex',
                      gap: '8px',
                      alignItems: 'flex-start',
                    }}>
                      <span style={{ color: 'var(--red)', flexShrink: 0, marginTop: '1px' }}>•</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
