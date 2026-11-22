'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { Asterisk, ArrowUpRight, ShoppingBag } from 'lucide-react'
import styles from './menu-showcase.module.css'

const SIGNATURE_POSTERS = [
  {
    id: 'signature-wraps',
    src: '/images/menu-ads/signature-wraps.jpg',
    alt: 'Tea Time Signature Wraps & Rolls — Minhali Wrap, Metro Abu Dhabi, Avocado Wrap',
    width: 1228,
    height: 1600,
  },
  {
    id: 'avocado-toasts',
    src: '/images/menu-ads/avocado-toasts.jpg',
    alt: 'Tea Time Avocado Sourdough Toasts — Shakshooka Avocado, Avocado Rumman, Half Fry Avocado',
    width: 1228,
    height: 1600,
  },
  {
    id: 'artisan-toasts',
    src: '/images/menu-ads/artisan-toasts.jpg',
    alt: 'Tea Time Artisan Toasts & Sandwiches — Semi Boiled Egg Toast, Jiben Hallomi, Abu Yusuf',
    width: 1228,
    height: 1600,
  },
  {
    id: 'burgers-platters',
    src: '/images/menu-ads/burgers-platters.jpg',
    alt: 'Tea Time Burgers & Platters — Fazza Arabi, Smokie Chi / Beef Burger, Shofan Hut',
    width: 1228,
    height: 1600,
  },
  {
    id: 'breakfast-specials',
    src: '/images/menu-ads/breakfast-specials.jpg',
    alt: 'Tea Time Breakfast Specials — English Breakfast, Zakis Kuku, Bread Toast',
    width: 1228,
    height: 1600,
  },
  {
    id: 'signature-shakes',
    src: '/images/menu-ads/signature-shakes.jpg',
    alt: 'Tea Time Signature Shakes & Frappes — Manchester, Pinky, Qubaisi, Mansoori',
    width: 1228,
    height: 1600,
  },
  {
    id: 'passion-fruit-specials',
    src: '/images/menu-ads/passion-fruit-specials.jpg',
    alt: 'Tea Time Passion Fruit Specials — Strawberry Passion, F3, Orange Passion, Mango Passion',
    width: 1228,
    height: 1600,
  },
]

export function MenuShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInteractingRef = useRef<boolean>(false)
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Auto-scroll loop for mobile view
    let intervalId: NodeJS.Timeout | null = null

    const startAutoScroll = () => {
      if (intervalId) clearInterval(intervalId)
      intervalId = setInterval(() => {
        // Only auto-scroll on mobile/tablet view when container has horizontal overflow
        if (!container) return
        if (window.innerWidth > 768) return
        if (isInteractingRef.current) return

        const maxScrollLeft = container.scrollWidth - container.clientWidth
        const cardWidth = container.firstElementChild
          ? (container.firstElementChild as HTMLElement).offsetWidth + 16
          : 300

        if (container.scrollLeft >= maxScrollLeft - 10) {
          // Smoothly wrap back to the first card
          container.scrollTo({ left: 0, behavior: 'smooth' })
        } else {
          // Scroll forward by one card
          container.scrollBy({ left: cardWidth, behavior: 'smooth' })
        }
      }, 3400)
    }

    const pauseInteraction = () => {
      isInteractingRef.current = true
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    }

    const resumeInteraction = () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
      resumeTimeoutRef.current = setTimeout(() => {
        isInteractingRef.current = false
      }, 3000)
    }

    startAutoScroll()

    container.addEventListener('touchstart', pauseInteraction, { passive: true })
    container.addEventListener('touchend', resumeInteraction, { passive: true })
    container.addEventListener('touchcancel', resumeInteraction, { passive: true })

    return () => {
      if (intervalId) clearInterval(intervalId)
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
      container.removeEventListener('touchstart', pauseInteraction)
      container.removeEventListener('touchend', resumeInteraction)
      container.removeEventListener('touchcancel', resumeInteraction)
    }
  }, [])

  return (
    <section id="menu" className={`${styles.menuSection} section-wrap`}>
      {/* Header */}
      <div className={styles.eyebrowRow}>
        <Asterisk className="tiny-star" size={18} aria-hidden="true" />
        <span>AUTHENTIC SIGNATURE SELECTION</span>
      </div>

      <div className={styles.headingRow}>
        <div>
          <h2 className={styles.headingTitle}>
            OUR SIGNATURE <span className={styles.outlineText}>MENU.</span>
          </h2>
          <p className={styles.headingSubtitle}>
            Freshly prepared every day across the UAE.
          </p>
        </div>
      </div>

      {/* Posters: 3 in a row on PC, 1 in view auto-scrolling on mobile */}
      <div className={styles.posterContainer} ref={containerRef}>
        {SIGNATURE_POSTERS.map((poster, index) => (
          <div className={styles.posterCard} key={poster.id}>
            <Image
              src={poster.src}
              alt={poster.alt}
              width={poster.width}
              height={poster.height}
              className={styles.posterImage}
              sizes="(max-width: 768px) 90vw, 33vw"
              priority={index < 3}
            />
          </div>
        ))}
      </div>

      {/* Online Delivery Partner Banner */}
      <div className={styles.deliveryBanner}>
        <div className={styles.deliveryCopy}>
          <span className={styles.deliveryBadge}>
            <ShoppingBag size={14} /> ORDER DIRECT TO YOUR DOORSTEP
          </span>
          <h3 className={styles.deliveryTitle}>
            CRAVING TEA TIME? <br />
            <span>WE DELIVER ON YOUR FAVOURITE APPS.</span>
          </h3>
          <p className={styles.deliveryText}>
            Enjoy our piping hot wraps, juicy burgers, loaded toasts, and signature karak delivered straight to your home or office anywhere in the UAE.
          </p>
          <div className={styles.appButtonsRow}>
            <a
              href="https://www.talabat.com/uae"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.appPill} ${styles.talabatPill}`}
            >
              Order on Talabat <ArrowUpRight size={14} />
            </a>
            <a
              href="https://www.noon.com/uae-en/food/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.appPill} ${styles.noonPill}`}
            >
              Order on Noon Food <ArrowUpRight size={14} />
            </a>
            <a
              href="#visit"
              className={`${styles.appPill} ${styles.keetaPill}`}
            >
              Order on Keeta <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <div className={styles.deliveryPosterWrap}>
          <Image
            src="/images/menu-ads/delivery-partners.jpg"
            alt="Tea Time Official Delivery Partners - Talabat, Noon, Keeta with QR code"
            width={600}
            height={600}
            className={styles.deliveryPosterImg}
          />
        </div>
      </div>
    </section>
  )
}
