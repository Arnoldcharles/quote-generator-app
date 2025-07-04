'use client'
import { useState, useEffect } from 'react'

export default function Home() {
  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quoteKey, setQuoteKey] = useState(0)
  const [copied, setCopied] = useState(false)

  const getQuote = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/quote')
      const data = await res.json()
      setQuote(data)
      setQuoteKey(prev => prev + 1)
      setCopied(false) // reset copied state
    } catch (err) {
      setQuote({ content: 'Failed to load quote.', author: 'Unknown' })
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    if (quote) {
      const text = `"${quote.content}" — ${quote.author}`
      navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleShareWhatsApp = () => {
    if (quote) {
      const text = encodeURIComponent(`"${quote.content}" — ${quote.author}`)
      const url = `https://wa.me/?text=${text}`
      window.open(url, '_blank')
    }
  }

  useEffect(() => {
    getQuote()
  }, [])

  return (
    <main className="container">
      <h1>Quote Generator By Arnold Charles</h1>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div key={quoteKey} className="quote fade-in">
          <p style={{ fontSize: '1.5rem' }}>"{quote.content}"</p>
          <p>— {quote.author}</p>
        </div>
      )}
      <div className="buttons">
        <button onClick={getQuote}>New Quote</button>
        <button onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy Quote'}
        </button>
        <button onClick={handleShareWhatsApp}>Share on WhatsApp</button>
      </div>
    </main>
  )
}
