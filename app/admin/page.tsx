'use client'

import {
  collection, deleteDoc, doc, onSnapshot,
  orderBy, query, updateDoc,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'

/* ── Types ── */
interface Order {
  id: string
  orderId: string
  submittedAt: string
  status: 'new' | 'processing' | 'shipped' | 'completed' | 'cancelled'
  product: string
  productImg: string
  qty: number
  price: string
  total: string
  paymentMethod: string
  whatsapp: string
  firstName: string
  middleName?: string
  lastName: string
  sex: string
  birthday: string
  hairColor: string
  eyeColor: string
  heightFt: string
  heightIn: string
  weight: string
  address?: string
  customize?: string
  photoBase64?: string
  sigBase64?: string
}

const STATUS_COLORS: Record<string, string> = {
  new:        '#1e3a5f',
  processing: '#d97706',
  shipped:    '#7c3aed',
  completed:  '#16a34a',
  cancelled:  '#6b7280',
}
const STATUS_LABELS: Record<string, string> = {
  new: 'New', processing: 'Processing', shipped: 'Shipped',
  completed: 'Completed', cancelled: 'Cancelled',
}

export default function AdminPage() {
  const [authed,    setAuthed]    = useState(false)
  const [password,  setPassword]  = useState('')
  const [authError, setAuthError] = useState('')
  const [orders,    setOrders]    = useState<Order[]>([])
  const [expanded,  setExpanded]  = useState<string | null>(null)
  const [search,    setSearch]    = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [loading,   setLoading]   = useState(false)

  /* Auth */
  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === 'cartelfakes_admin_2026') {
      setAuthed(true)
      setAuthError('')
    } else {
      setAuthError('Incorrect password.')
    }
  }

  /* Firestore listener */
  useEffect(() => {
    if (!authed) return
    setLoading(true)
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'))
    const unsub = onSnapshot(q, snap => {
      setOrders(snap.docs.map(d => ({ id: d.id, ...d.data() } as Order)))
      setLoading(false)
    }, err => {
      console.error(err)
      setLoading(false)
    })
    return unsub
  }, [authed])

  async function updateStatus(id: string, status: string) {
    await updateDoc(doc(db, 'orders', id), { status })
  }

  async function deleteOrder(id: string) {
    if (!confirm('Delete this order permanently? This cannot be undone.')) return
    await deleteDoc(doc(db, 'orders', id))
  }

  /* Filtered */
  const filtered = orders.filter(o => {
    const q = search.toLowerCase()
    const matchSearch = !q || [o.orderId, o.firstName, o.lastName, o.whatsapp, o.product]
      .some(v => v?.toLowerCase().includes(q))
    const matchStatus = statusFilter === 'all' || o.status === statusFilter
    return matchSearch && matchStatus
  })

  /* ── Login screen ── */
  if (!authed) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      }}>
        <form onSubmit={handleLogin} style={{
          background: '#fff', borderRadius: '16px', padding: '48px 40px',
          width: '100%', maxWidth: '400px', boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/cartellogo.jpg" alt="CardsMen" style={{ height: '52px', margin: '0 auto 16px', objectFit: 'contain' }} />
            <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>Admin Dashboard</h1>
            <p style={{ color: '#64748b', fontSize: '13px', marginTop: '4px' }}>Enter your admin password to continue</p>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter admin password"
              style={{ width: '100%', border: authError ? '1px solid #ef4444' : '1px solid #e4e4e7', borderRadius: '8px', padding: '12px 16px', fontSize: '15px', outline: 'none' }}
              autoFocus
            />
            {authError && <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px' }}>{authError}</p>}
          </div>
          <button type="submit" style={{
            width: '100%', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '8px',
            padding: '13px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.04em',
          }}>
            Sign In
          </button>
        </form>
      </div>
    )
  }

  /* ── Dashboard ── */
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Header */}
      <header style={{ background: '#0f172a', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/cartellogo.jpg" alt="CardsMen" style={{ height: '36px', objectFit: 'contain', filter: 'brightness(1.1)' }} />
          <span style={{ color: '#fff', fontWeight: 700, fontSize: '16px', letterSpacing: '-0.01em' }}>Admin Dashboard</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ color: '#94a3b8', fontSize: '13px' }}>{orders.length} total orders</span>
          <button
            onClick={() => setAuthed(false)}
            style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#e2e8f0', borderRadius: '6px', padding: '7px 14px', cursor: 'pointer', fontSize: '13px' }}
          >
            Sign out
          </button>
        </div>
      </header>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px', marginBottom: '28px' }}>
          {Object.entries(STATUS_LABELS).map(([key, label]) => {
            const count = orders.filter(o => o.status === key).length
            return (
              <div key={key} style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                <p style={{ fontSize: '28px', fontWeight: 800, color: STATUS_COLORS[key], lineHeight: 1 }}>{count}</p>
                <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>{label}</p>
              </div>
            )
          })}
          <div style={{ background: '#0f172a', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <p style={{ fontSize: '28px', fontWeight: 800, color: '#fff', lineHeight: 1 }}>{orders.length}</p>
            <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>All Orders</p>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <input
            type="search"
            placeholder="Search by name, order ID, WhatsApp, product…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: '1', minWidth: '240px', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 16px', fontSize: '14px', outline: 'none', background: '#fff' }}
          />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 14px', fontSize: '14px', background: '#fff', cursor: 'pointer', outline: 'none' }}
          >
            <option value="all">All Statuses</option>
            {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>

        {/* Orders list */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px', color: '#64748b' }}>Loading orders…</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px', color: '#94a3b8' }}>
            <p style={{ fontSize: '32px', marginBottom: '8px' }}>📭</p>
            <p style={{ fontWeight: 600 }}>No orders found</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filtered.map(order => {
              const isOpen = expanded === order.id
              return (
                <div key={order.id} style={{
                  background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                  overflow: 'hidden', transition: 'box-shadow 0.2s',
                }}>
                  {/* Summary row — always visible */}
                  <div
                    onClick={() => setExpanded(isOpen ? null : order.id)}
                    style={{
                      display: 'grid', gridTemplateColumns: '1fr 200px 130px 120px 36px',
                      alignItems: 'center', padding: '16px 20px', gap: '16px',
                      cursor: 'pointer', userSelect: 'none',
                    }}
                  >
                    <div>
                      <p style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>{order.firstName} {order.lastName}</p>
                      <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{order.orderId} · {order.submittedAt}</p>
                    </div>
                    <p style={{ fontSize: '13px', color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{order.product}</p>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{order.total}</p>
                    <span style={{
                      display: 'inline-block', padding: '4px 10px', borderRadius: '999px',
                      fontSize: '11px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
                      background: `${STATUS_COLORS[order.status]}18`, color: STATUS_COLORS[order.status],
                    }}>
                      {STATUS_LABELS[order.status]}
                    </span>
                    <span style={{ color: '#94a3b8', fontSize: '18px', textAlign: 'center', transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}>
                      ▾
                    </span>
                  </div>

                  {/* Expanded detail panel */}
                  {isOpen && (
                    <div style={{ borderTop: '1px solid #f1f5f9', padding: '24px 20px', background: '#fafbfc' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '20px', alignItems: 'start' }}>

                        {/* Product image */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={order.productImg} alt={order.product}
                          style={{ width: '160px', height: '104px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e2e8f0', flexShrink: 0 }} />

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px 24px' }}>
                          {[
                            ['Order ID', order.orderId],
                            ['Submitted', order.submittedAt],
                            ['Product', order.product],
                            ['Qty', String(order.qty)],
                            ['Total', order.total],
                            ['Payment', order.paymentMethod],
                            ['WhatsApp', order.whatsapp],
                            ['Name', `${order.firstName} ${order.middleName ?? ''} ${order.lastName}`.trim()],
                            ['Sex', order.sex],
                            ['Birthday', order.birthday],
                            ['Hair', order.hairColor],
                            ['Eyes', order.eyeColor],
                            ['Height', `${order.heightFt}ft ${order.heightIn}in`],
                            ['Weight', `${order.weight} lbs`],
                            order.address   ? ['Address', order.address]   : null,
                            order.customize ? ['Customize', order.customize] : null,
                          ].filter(Boolean).map(([label, val]) => (
                            <div key={label as string}>
                              <p style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>{label}</p>
                              <p style={{ fontSize: '14px', color: '#1e293b', fontWeight: 500, wordBreak: 'break-all' }}>{val}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Photo + Signature previews */}
                      {(order.photoBase64 || order.sigBase64) && (
                        <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
                          {order.photoBase64 && (
                            <div>
                              <p style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Customer Photo</p>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={order.photoBase64} alt="Photo" style={{ width: '120px', height: '140px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #e2e8f0' }} />
                            </div>
                          )}
                          {order.sigBase64 && (
                            <div>
                              <p style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Signature</p>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={order.sigBase64} alt="Signature" style={{ width: '140px', height: '80px', objectFit: 'contain', borderRadius: '6px', border: '1px solid #e2e8f0', background: '#fff' }} />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Actions */}
                      <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Update status:</span>
                        {Object.entries(STATUS_LABELS).map(([key, label]) => (
                          <button key={key} onClick={() => updateStatus(order.id, key)} style={{
                            padding: '6px 14px', borderRadius: '6px', border: `1px solid ${STATUS_COLORS[key]}`,
                            background: order.status === key ? STATUS_COLORS[key] : 'transparent',
                            color: order.status === key ? '#fff' : STATUS_COLORS[key],
                            fontSize: '12px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s',
                          }}>{label}</button>
                        ))}
                        <button
                          onClick={() => window.open(`https://wa.me/${order.whatsapp}`, '_blank')}
                          style={{ marginLeft: 'auto', padding: '6px 14px', borderRadius: '6px', background: '#25d366', border: 'none', color: '#fff', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                        >
                          Chat on WhatsApp
                        </button>
                        <button onClick={() => deleteOrder(order.id)} style={{
                          padding: '6px 14px', borderRadius: '6px', border: '1px solid #fca5a5',
                          background: 'transparent', color: '#ef4444', fontSize: '12px', fontWeight: 700, cursor: 'pointer',
                        }}>
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
