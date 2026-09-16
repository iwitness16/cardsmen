import { redirect } from 'next/navigation'

// The evaluate page has been removed — redirect visitors to the products page
export default function EvaluateRedirect() {
  redirect('/products')
}
