import { redirect } from 'next/navigation'

// /admin/login → redirect to /admin (login is handled on that page)
export default function AdminLoginRedirect() {
  redirect('/admin')
}
