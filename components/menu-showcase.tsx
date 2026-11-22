'use client'

import { useEffect, useRef, useCallback } from 'react'
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

// 9 slides: clone of last + 7 real + clone of first
// Real posters are at indices 1 through 7
const SLIDES = [
  { ...SIGNATURE_POSTERS[SIGNATURE_POSTERS.length - 1], slideKey: 'clone-last' },
  ...SIGNATURE_POSTERS.map((p) => ({ ...p, slideKey: p.id })),
  { ...SIGNATURE_POSTERS[0], slideKey: 'clone-first' },
]

const GAP_PX = 16
const FIRST_REAL_INDEX = 1
const LAST_REAL_INDEX = SIGNATURE_POSTERS.length // index 7

export function MenuShowcase() {
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const indexRef = useRef<number>(FIRST_REAL_INDEX)
  const isInteractingRef = useRef<boolean>(false)
  const isAnimatingRef = useRef<boolean>(false)
  const isSwipingHorizontalRef = useRef<boolean | null>(null)
  const startXRef = useRef<number>(0)
  const startYRef = useRef<number>(0)
  const currentDeltaXRef = useRef<number>(0)

  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null)
  const transitionSafetyTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Robust step calculation that never returns 0
  const getStep = useCallback(() => {
    if (viewportRef.current) {
      const width = viewportRef.current.offsetWidth || viewportRef.current.getBoundingClientRect().width
      if (width > 0) return width + GAP_PX
    }
    if (typeof window !== 'undefined') {
      return Math.min(window.innerWidth - 32, 440) + GAP_PX
    }
    return 360 + GAP_PX
  }, [])

  const clearAutoPlay = useCallback(() => {
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current)
      autoPlayTimerRef.current = null
    }
  }, [])

  // Finalize slide position after transition (or safety timeout)
  const finalizeSlide = useCallback(
    (targetIndex: number) => {
      const track = trackRef.current
      const step = getStep()
      if (!track) return

      if (transitionSafetyTimeoutRef.current) {
        clearTimeout(transitionSafetyTimeoutRef.current)
        transitionSafetyTimeoutRef.current = null
      }

      // Seamless clone wrap:
      if (targetIndex >= LAST_REAL_INDEX + 1) {
        indexRef.current = FIRST_REAL_INDEX
        track.style.transition = 'none'
        track.style.transform = `translate3d(-${FIRST_REAL_INDEX * step}px, 0, 0)`
        void track.offsetHeight
      } else if (targetIndex <= 0) {
        indexRef.current = LAST_REAL_INDEX
        track.style.transition = 'none'
        track.style.transform = `translate3d(-${LAST_REAL_INDEX * step}px, 0, 0)`
        void track.offsetHeight
      } else {
        indexRef.current = targetIndex
      }

      isAnimatingRef.current = false
      currentDeltaXRef.current = 0

      // Immediately schedule next auto scroll
      clearAutoPlay()
      autoPlayTimerRef.current = setTimeout(() => {
        if (isInteractingRef.current) return
        if (typeof window !== 'undefined' && window.innerWidth > 768) return
        goToIndex(indexRef.current + 1, 450)
      }, 3200)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getStep, clearAutoPlay]
  )

  const goToIndex = useCallback(
    (targetIndex: number, duration = 320) => {
      const track = trackRef.current
      const step = getStep()
      if (!track) return

      // If already at target index and no horizontal drag occurred, avoid starting empty transition
      if (targetIndex === indexRef.current && currentDeltaXRef.current === 0) {
        isAnimatingRef.current = false
        finalizeSlide(targetIndex)
        return
      }

      isAnimatingRef.current = true
      indexRef.current = targetIndex

      track.style.transition = `transform ${duration}ms cubic-bezier(0.2, 0.8, 0.25, 1)`
      track.style.transform = `translate3d(-${targetIndex * step}px, 0, 0)`

      // Safety timeout: guarantees state is never stuck if browser omits transitionend
      if (transitionSafetyTimeoutRef.current) {
        clearTimeout(transitionSafetyTimeoutRef.current)
      }
      transitionSafetyTimeoutRef.current = setTimeout(() => {
        finalizeSlide(targetIndex)
      }, duration + 50)
    },
    [getStep, finalizeSlide]
  )

  const scheduleAutoPlay = useCallback(() => {
    clearAutoPlay()
    autoPlayTimerRef.current = setTimeout(() => {
      if (isInteractingRef.current || isAnimatingRef.current) return
      if (typeof window !== 'undefined' && window.innerWidth > 768) return
      goToIndex(indexRef.current + 1, 450)
    }, 3200)
  }, [clearAutoPlay, goToIndex])

  // Native CSS transition completion listener
  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== trackRef.current) return
    finalizeSlide(indexRef.current)
  }

  // Position setup, resize listener, focus listener, and intersection observer
  useEffect(() => {
    const updatePosition = () => {
      const step = getStep()
      if (trackRef.current && !isAnimatingRef.current && !isInteractingRef.current) {
        trackRef.current.style.transition = 'none'
        trackRef.current.style.transform = `translate3d(-${indexRef.current * step}px, 0, 0)`
      }
    }

    updatePosition()
    scheduleAutoPlay()

    // Resume whenever page/tab becomes active or regains focus
    const handleVisibility = () => {
      if (!document.hidden) {
        scheduleAutoPlay()
      } else {
        clearAutoPlay()
      }
    }

    // Auto-resume whenever menu scrolls into view
    let observer: IntersectionObserver | null = null
    const viewportElem = viewportRef.current
    if (typeof IntersectionObserver !== 'undefined' && viewportElem) {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0]
          if (entry.isIntersecting) {
            scheduleAutoPlay()
          }
        },
        { threshold: 0.1 }
      )
      observer.observe(viewportElem)
    }

    window.addEventListener('resize', updatePosition)
    window.addEventListener('focus', scheduleAutoPlay)
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      clearAutoPlay()
      if (transitionSafetyTimeoutRef.current) {
        clearTimeout(transitionSafetyTimeoutRef.current)
      }
      if (observer && viewportElem) {
        observer.unobserve(viewportElem)
      }
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('focus', scheduleAutoPlay)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [getStep, scheduleAutoPlay, clearAutoPlay])

  // Touch Gesture Handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    clearAutoPlay()
    if (transitionSafetyTimeoutRef.current) {
      clearTimeout(transitionSafetyTimeoutRef.current)
    }

    const step = getStep()
    const track = trackRef.current
    if (track) {
      if (indexRef.current >= LAST_REAL_INDEX + 1) {
        indexRef.current = FIRST_REAL_INDEX
        track.style.transition = 'none'
        track.style.transform = `translate3d(-${FIRST_REAL_INDEX * step}px, 0, 0)`
      } else if (indexRef.current <= 0) {
        indexRef.current = LAST_REAL_INDEX
        track.style.transition = 'none'
        track.style.transform = `translate3d(-${LAST_REAL_INDEX * step}px, 0, 0)`
      }
      track.style.transition = 'none'
    }

    isInteractingRef.current = true
    isAnimatingRef.current = false
    const touch = e.touches[0]
    startXRef.current = touch.clientX
    startYRef.current = touch.clientY
    currentDeltaXRef.current = 0
    isSwipingHorizontalRef.current = null
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isInteractingRef.current) return

    const touch = e.touches[0]
    const deltaX = touch.clientX - startXRef.current
    const deltaY = touch.clientY - startYRef.current

    if (isSwipingHorizontalRef.current === null) {
      if (Math.abs(deltaX) > 6 || Math.abs(deltaY) > 6) {
        isSwipingHorizontalRef.current = Math.abs(deltaX) > Math.abs(deltaY)
      }
    }

    // If scrolling vertically down the website, leave track untouched
    if (!isSwipingHorizontalRef.current) return

    currentDeltaXRef.current = deltaX
    const step = getStep()
    const currentPos = -indexRef.current * step + deltaX
    const track = trackRef.current
    if (track) {
      track.style.transform = `translate3d(${currentPos}px, 0, 0)`
    }
  }

  const handleTouchEnd = () => {
    if (!isInteractingRef.current) return
    isInteractingRef.current = false

    // If user was simply scrolling the website vertically, keep auto play alive without moving slides
    if (isSwipingHorizontalRef.current === false) {
      currentDeltaXRef.current = 0
      scheduleAutoPlay()
      return
    }

    const deltaX = currentDeltaXRef.current
    const step = getStep()
    const track = trackRef.current

    if (!track) {
      scheduleAutoPlay()
      return
    }

    const threshold = Math.min(step * 0.15, 50)
    let targetIndex = indexRef.current

    if (deltaX < -threshold) {
      targetIndex = indexRef.current + 1
    } else if (deltaX > threshold) {
      targetIndex = indexRef.current - 1
    }

    goToIndex(targetIndex, 300)
  }

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

      {/* Mobile Viewport: 1 image in view, seamless zero-blink infinite loop */}
      <div className={styles.mobileSliderWrapper}>
        <div className={styles.mobileSliderViewport} ref={viewportRef}>
          <div
            className={styles.mobileTrack}
            ref={trackRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
            onTransitionEnd={handleTransitionEnd}
          >
            {SLIDES.map((slide, idx) => (
              <div className={styles.mobileSlide} key={`${slide.slideKey}-${idx}`}>
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  width={slide.width}
                  height={slide.height}
                  priority
                  className={styles.mobileSlideImg}
                  sizes="(max-width: 768px) 90vw, 440px"
                />
              </div>
            ))}
          </div>
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
