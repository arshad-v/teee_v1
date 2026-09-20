'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'

export function Wordmark() {
  return <a className="wordmark" href="#home" aria-label="Tea Time home"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-01%20at%2012.40.48%20AM-s9PqLesrYIUf9s9VNiz6s4DLdxFclG.jpeg" width={1280} height={290} alt="Tea Time — The Cafe Shop. وقت الشاي. Original green tea-cup logo and yellow Tea Time emblem." /></a>
}

export function CafeHeader() {
  return <header id="home" className="site-header signboard-header">
    <nav className="desktop-nav sign-nav-left" aria-label="Food and story navigation">
      <a href="#menu">Our menu</a><a href="#story">Our story</a><a href="#leadership">Leadership</a>
    </nav>
    <Wordmark />
    <nav className="desktop-nav sign-nav-right" aria-label="Location navigation">
      <a href="#visit">Our locations <ArrowUpRight size={15} aria-hidden="true" /></a>
      <a href="mailto:teatimegroupauh@gmail.com">Say hello</a>
    </nav>
  </header>
}

export function CafeMobileNavigation() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const dismissOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const dismissOutside = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', dismissOnEscape)
    document.addEventListener('pointerdown', dismissOutside)
    return () => {
      document.removeEventListener('keydown', dismissOnEscape)
      document.removeEventListener('pointerdown', dismissOutside)
    }
  }, [open])

  return <div className={`home-navigation${scrolled ? ' is-scrolled' : ''}`} ref={containerRef} onBlur={event => {
    if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
  }}>
    <button ref={toggleRef} className="mobile-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation">{open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}</button>
    {open && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{[['Our menu', '#menu'], ['Our story', '#story'], ['Leadership', '#leadership'], ['Our locations', '#visit'], ['Say hello', 'mailto:teatimegroupauh@gmail.com']].map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}<ArrowUpRight size={18} aria-hidden="true" /></a>)}</nav>}
  </div>
}
