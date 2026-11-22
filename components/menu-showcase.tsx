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

// 3 consecutive sets for seamless infinite loop on mobile (left and right)
const INFINITE_POSTERS = [
  ...SIGNATURE_POSTERS.map((p, i) => ({ ...p, loopKey: `set1-${i}` })),
  ...SIGNATURE_POSTERS.map((p, i) => ({ ...p, loopKey: `set2-${i}` })),
  ...SIGNATURE_POSTERS.map((p, i) => ({ ...p, loopKey: `set3-${i}` })),
]

export function MenuShowcase() {
  const mobileContainerRef = useRef<HTMLDivElement>(null)
  const isInteractingRef = useRef<boolean>(false)
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const container = mobileContainerRef.current
    if (!container) return

    const getMetrics = () => {
      const firstCard = container.firstElementChild as HTMLElement | null
      const cardWidth = firstCard ? firstCard.offsetWidth : 320
      const gap = 16
      const step = cardWidth + gap
      const setWidth = SIGNATURE_POSTERS.length * step
      return { step, setWidth }
    }

    // Initialize to the start of set 2
    const { setWidth } = getMetrics()
    if (setWidth > 0) {
      container.scrollLeft = setWidth
    }

    let isResetting = false

    const handleScroll = () => {
      if (isResetting) return
      const { setWidth } = getMetrics()
      if (setWidth <= 0) return

      const scroll = container.scrollLeft

      // Seamlessly wrap forward into set 2
      if (scroll >= setWidth * 2 - 10) {
        isResetting = true
        container.scrollLeft = scroll - setWidth
        requestAnimationFrame(() => {
          isResetting = false
        })
      }
      // Seamlessly wrap backward into set 2
      else if (scroll <= 10) {
        isResetting = true
        container.scrollLeft = scroll + setWidth
        requestAnimationFrame(() => {
          isResetting = false
        })
      }
    }

    // Auto-advance loop on mobile
    const interval = setInterval(() => {
      if (isInteractingRef.current) return
      if (window.innerWidth > 768) return

      const { step } = getMetrics()
      container.scrollBy({ left: step, behavior: 'smooth' })
    }, 3200)

    const onTouchStart = () => {
      isInteractingRef.current = true
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    }

    const onTouchEnd = () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
      resumeTimeoutRef.current = setTimeout(() => {
        isInteractingRef.current = false
      }, 2500)
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    container.addEventListener('touchstart', onTouchStart, { passive: true })
    container.addEventListener('touchend', onTouchEnd, { passive: true })
    container.addEventListener('touchcancel', onTouchEnd, { passive: true })

    return () => {
      clearInterval(interval)
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
      container.removeEventListener('scroll', handleScroll)
      container.removeEventListener('touchstart', onTouchStart)
      container.removeEventListener('touchend', onTouchEnd)
      container.removeEventListener('touchcancel', onTouchEnd)
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

      {/* Desktop Grid: exactly 3 items in a row */}
      <div className={styles.desktopGrid}>
        {SIGNATURE_POSTERS.map((poster, index) => (
          <div className={styles.posterCard} key={poster.id}>
            <Image
              src={poster.src}
              alt={poster.alt}
              width={poster.width}
              height={poster.height}
              className={styles.posterImage}
              sizes="(max-width: 1080px) 50vw, 33vw"
              priority={index < 3}
            />
          </div>
        ))}
      </div>

      {/* Mobile Carousel: 1 in view, endless infinite continuous scroll */}
      <div className={styles.mobileCarousel} ref={mobileContainerRef}>
        {INFINITE_POSTERS.map((poster) => (
          <div className={styles.posterCardMobile} key={poster.loopKey}>
            <Image
              src={poster.src}
              alt={poster.alt}
              width={poster.width}
              height={poster.height}
              sizes="90vw"
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
