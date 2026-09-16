import { notFound } from 'next/navigation'
import { ALL_PRODUCTS } from '@/lib/products'
import { ProductDetailClient } from './client'

// Tell Next.js which paths to pre-render at build time
export function generateStaticParams() {
  return ALL_PRODUCTS.map((product) => ({
    country: product.country,
    slug: product.slug,
  }))
}

// Server component — handles params, notFound, passes data down to client
export default function ProductDetailPage({
  params,
}: {
  params: { country: string; slug: string }
}) {
  const product = ALL_PRODUCTS.find(
    (p) => p.country === params.country && p.slug === params.slug
  )

  if (!product) notFound()

  return <ProductDetailClient product={product} />
}
