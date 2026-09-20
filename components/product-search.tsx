'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ALL_PRODUCTS } from '@/lib/products'

export function ProductSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<typeof ALL_PRODUCTS>([])
  const [isOpen, setIsOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([])
      setIsOpen(false)
      return
    }

    const searchTerm = query.toLowerCase()
    const filtered = ALL_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.model.toLowerCase().includes(searchTerm) ||
      p.country.toLowerCase().includes(searchTerm)
    ).slice(0, 8) // Limit to 8 results

    setResults(filtered)
    setIsOpen(filtered.length > 0)
  }, [query])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={searchRef} className="product-search-container">
      <div className="search-input-wrapper">
        <svg 
          className="search-icon" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="text"
          placeholder="Search by state, city, or country..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim().length >= 2 && results.length > 0 && setIsOpen(true)}
          className="search-input"
        />
        {query && (
          <button 
            className="search-clear-btn"
            onClick={() => { setQuery(''); setIsOpen(false) }}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="search-results-dropdown">
          <div className="search-results-header">
            Found {results.length} ID{results.length !== 1 ? 's' : ''}
          </div>
          <div className="search-results-list">
            {results.map((product) => (
              <Link
                key={product.slug}
                href={`/orders?slug=${product.slug}&country=${product.country}`}
                className="search-result-item"
                onClick={() => { setIsOpen(false); setQuery('') }}
              >
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="search-result-img"
                />
                <div className="search-result-info">
                  <div className="search-result-name">{product.name}</div>
                  <div className="search-result-meta">
                    <span className="search-result-country">{product.country.toUpperCase()}</span>
                    <span className="search-result-price">{product.currency}{product.price}</span>
                  </div>
                </div>
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  className="search-result-arrow"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
