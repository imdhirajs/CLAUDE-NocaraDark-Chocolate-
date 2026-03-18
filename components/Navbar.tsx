'use client'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`navbar${scrolled ? ' scrolled' : ''}`}
      style={{
        background: scrolled ? 'rgba(13,6,0,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
      }}
    >
      {/* Logo */}
      <a href="#" className="navbar-logo">
        Nocara Dark
      </a>

      {/* Right side */}
      <div className="navbar-links">
        <a href="#origin" className="navbar-link">Origin</a>
        <a href="#process" className="navbar-link">Process</a>
        <a href="#collection" className="navbar-link">Collection</a>
        <a href="#collection" className="navbar-pill" data-cursor="cta">
          Order Now
        </a>
      </div>
    </nav>
  )
}
