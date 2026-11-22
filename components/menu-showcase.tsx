'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
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

const GAP_PX = 16
const TOTAL_POSTERS = SIGNATURE_POSTERS.length

export function MenuShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const isInteractingRef = useRef<boolean>(false)
  const isAnimatingRef = useRef<boolean>(false)
  const isSwipingHorizontalRef = useRef<boolean | null>(null)
  const startXRef = useRef<number>(0)
  const startYRef = useRef<number>(0)
  const currentDeltaXRef = useRef<number>(0)
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null)

  const getStep = useCallback(() => {
    if (!viewportRef.current) return 0
    return viewportRef.current.offsetWidth + GAP_PX
  }, [])

  const animateToSlide = useCallback((target: 'next' | 'prev' | 'current') => {
    const track = trackRef.current
    const step = getStep()
    if (!track || step <= 0) return

    isAnimatingRef.current = true
    track.style.transition = 'transform 300ms cubic-bezier(0.2, 0.8, 0.25, 1)'

    let targetX = -step
    if (target === 'next') targetX = -2 * step
    if (target === 'prev') targetX = 0

    track.style.transform = `translate3d(${targetX}px, 0, 0)`

    setTimeout(() => {
      if (target === 'next') {
        setCurrentIndex((i) => (i + 1) % TOTAL_POSTERS)
      } else if (target === 'prev') {
        setCurrentIndex((i) => (i - 1 + TOTAL_POSTERS) % TOTAL_POSTERS)
      }

      // Instant reset to center slide without transition
      if (trackRef.current) {
        trackRef.current.style.transition = 'none'
        trackRef.current.style.transform = `translate3d(-${getStep()}px, 0, 0)`
        // Force reflow
        void trackRef.current.offsetHeight
      }

      isAnimatingRef.current = false
      currentDeltaXRef.current = 0
    }, 305)
  }, [getStep])

  // Clear auto play timer
  const clearAutoPlay = useCallback(() => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current)
      autoPlayTimerRef.current = null
    }
  }, [])

  // Start auto play timer
  const scheduleAutoPlay = useCallback(() => {
    clearAutoPlay()
    autoPlayTimerRef.current = setInterval(() => {
      if (isInteractingRef.current || isAnimatingRef.current) return
      if (typeof window !== 'undefined' && window.innerWidth > 768) return
      animateToSlide('next')
    }, 3400)
  }, [animateToSlide, clearAutoPlay])

  // Initialize track position on mount & resize
  useEffect(() => {
    const updatePosition = () => {
      const step = getStep()
      if (trackRef.current && step > 0 && !isAnimatingRef.current && !isInteractingRef.current) {
        trackRef.current.style.transition = 'none'
        trackRef.current.style.transform = `translate3d(-${step}px, 0, 0)`
      }
    }

    updatePosition()
    scheduleAutoPlay()

    window.addEventListener('resize', updatePosition)
    return () => {
      clearAutoPlay()
      window.removeEventListener('resize', updatePosition)
    }
  }, [getStep, scheduleAutoPlay, clearAutoPlay])

  // Touch Gesture Handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isAnimatingRef.current) return
    isInteractingRef.current = true
    clearAutoPlay()

    const touch = e.touches[0]
    startXRef.current = touch.clientX
    startYRef.current = touch.clientY
    currentDeltaXRef.current = 0
    isSwipingHorizontalRef.current = null

    const track = trackRef.current
    if (track) {
      track.style.transition = 'none'
    }
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isInteractingRef.current || isAnimatingRef.current) return

    const touch = e.touches[0]
    const deltaX = touch.clientX - startXRef.current
    const deltaY = touch.clientY - startYRef.current

    if (isSwipingHorizontalRef.current === null) {
      if (Math.abs(deltaX) > 6 || Math.abs(deltaY) > 6) {
        isSwipingHorizontalRef.current = Math.abs(deltaX) > Math.abs(deltaY)
      }
    }

    if (!isSwipingHorizontalRef.current) return

    currentDeltaXRef.current = deltaX
    const step = getStep()
    const currentPos = -step + deltaX
    const track = trackRef.current
    if (track) {
      track.style.transform = `translate3d(${currentPos}px, 0, 0)`
    }
  }

  const handleTouchEnd = () => {
    if (!isInteractingRef.current) return
    isInteractingRef.current = false

    const deltaX = currentDeltaXRef.current
    const step = getStep()
    const track = trackRef.current

    if (!track || step <= 0) {
      scheduleAutoPlay()
      return
    }

    const threshold = Math.min(step * 0.16, 50)

    if (deltaX < -threshold) {
      animateToSlide('next')
    } else if (deltaX > threshold) {
      animateToSlide('prev')
    } else {
      animateToSlide('current')
    }

    // Schedule autoplay resume
    setTimeout(() => {
      scheduleAutoPlay()
    }, 1500)
  }

  const prevIndex = (currentIndex - 1 + TOTAL_POSTERS) % TOTAL_POSTERS
  const nextIndex = (currentIndex + 1) % TOTAL_POSTERS

  const prevPoster = SIGNATURE_POSTERS[prevIndex]
  const currentPoster = SIGNATURE_POSTERS[currentIndex]
  const nextPoster = SIGNATURE_POSTERS[nextIndex]

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

      {/* Mobile Viewport: 1 image in view, continuous 3-slide GPU infinite loop */}
      <div className={styles.mobileSliderWrapper}>
        <div className={styles.mobileSliderViewport} ref={viewportRef}>
          <div
            className={styles.mobileTrack}
            ref={trackRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
          >
            {/* Prev Slide */}
            <div className={styles.mobileSlide}>
              <Image
                src={prevPoster.src}
                alt={prevPoster.alt}
                width={prevPoster.width}
                height={prevPoster.height}
                priority
                className={styles.mobileSlideImg}
                sizes="(max-width: 768px) 90vw, 440px"
              />
            </div>

            {/* Current Slide */}
            <div className={styles.mobileSlide}>
              <Image
                src={currentPoster.src}
                alt={currentPoster.alt}
                width={currentPoster.width}
                height={currentPoster.height}
                priority
                className={styles.mobileSlideImg}
                sizes="(max-width: 768px) 90vw, 440px"
              />
            </div>

            {/* Next Slide */}
            <div className={styles.mobileSlide}>
              <Image
                src={nextPoster.src}
                alt={nextPoster.alt}
                width={nextPoster.width}
                height={nextPoster.height}
                priority
                className={styles.mobileSlideImg}
                sizes="(max-width: 768px) 90vw, 440px"
              />
            </div>
          </div>
        </div>

        {/* Silent Preloader for all 7 posters to eliminate image decode delay */}
        <div style={{ display: 'none' }} aria-hidden="true">
          {SIGNATURE_POSTERS.map((poster) => (
            <Image
              key={poster.id}
              src={poster.src}
              alt=""
              width={poster.width}
              height={poster.height}
              priority
            />
          ))}
        </div>
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
