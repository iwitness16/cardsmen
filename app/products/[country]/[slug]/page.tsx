import { notFound } from 'next/navigation'
import { ALL_PRODUCTS } from '@/lib/products'
import { ProductDetailClient } from './client'

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
