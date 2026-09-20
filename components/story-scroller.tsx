'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { ArrowDown, Asterisk } from 'lucide-react'
import styles from './story-scroller.module.css'

const chapters = [
  {
    year: '1988', place: 'KERALA, INDIA', label: 'WHERE IT ALL BEGAN',
    title: 'SEVEN STAFF.', accent: 'ONE SMALL SHOP.',
    description: 'Tea Time Coffee Shop & Refreshment began in Kerala, India, in 1988. With just seven staff and a single small outlet, our story started with humble beginnings and a love for making tea and coffee.',
    photo: '/images/story-bg.jpg', alt: 'A warm cup of karak tea in a softly lit café',
    detail: '/images/karak.png', detailAlt: 'Freshly brewed karak tea', caption: 'A small beginning. A whole lot of heart.', tag: 'BREWED WITH LOVE',
  },
  {
    year: '2013', place: 'UNITED ARAB EMIRATES', label: 'A NEW CHAPTER',
    title: 'ACROSS OCEANS.', accent: 'SAME WARMTH.',
    description: 'From our roots in Kerala, Tea Time grew across India, Saudi Arabia, Qatar and the United Arab Emirates. We began our UAE journey in 2013, bringing our tradition of tea, coffee and refreshment to a new home.',
    photo: '/images/hero-feast.png', alt: 'Tea Time tea and food shared around a table',
    detail: '/images/poratta.jpg', detailAlt: 'Fresh poratta served at Tea Time', caption: 'New shores. The flavours we call home.', tag: 'FROM KERALA, WITH LOVE',
  },
  {
    year: 'TODAY', place: '24 UAE BRANCHES · ALMOST 400 STAFF', label: 'THE STORY CONTINUES',
    title: 'A RICH HISTORY.', accent: 'A FRESHER DAY.',
    description: 'Today, our 24 UAE branches are home to almost 400 experienced professionals. As longstanding tea and coffee makers, our distinctive blends carry that heritage into every cup, refreshing your mind and bringing freshness to your day.',
    photo: '/images/club-sandwich.jpg', alt: 'A freshly prepared club sandwich to share over tea',
    detail: '/images/falooda.jpg', detailAlt: 'A colourful falooda at Tea Time', caption: 'Good food. Good people. More memories.', tag: 'YOUR EVERYDAY HAPPY PLACE',
  },
]

export function StoryScroller() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return
    const staticLayout = window.matchMedia('(prefers-reduced-motion: reduce), (max-height: 580px)')
    const panels = Array.from(track.querySelectorAll<HTMLElement>('[data-chapter]'))
    let frame = 0

    const update = () => {
      frame = 0
      if (staticLayout.matches) {
        track.style.removeProperty('transform')
        panels.forEach(panel => panel.style.setProperty('--drift', '0'))
        return
      }
      const rect = section.getBoundingClientRect()
      const stickyHeight = section.firstElementChild?.clientHeight ?? window.innerHeight
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, section.offsetHeight - stickyHeight)))
      // Brief rests at each end keep the first and last chapters easy to read.
      const travel = Math.min(1, Math.max(0, (progress - 0.06) / 0.88))
      // Measure panels, not scrollWidth: parallax decorations extend beyond the track.
      const distance = panels[panels.length - 1].offsetLeft - panels[0].offsetLeft
      track.style.transform = `translate3d(${-travel * distance}px, 0, 0)`
      panels.forEach((panel, index) => {
        panel.style.setProperty('--drift', String(Math.max(-1, Math.min(1, travel * 2 - index))))
      })
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    staticLayout.addEventListener('change', schedule)
    const observer = new ResizeObserver(schedule)
    observer.observe(section)
    update()
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      staticLayout.removeEventListener('change', schedule)
      observer.disconnect()
    }
  }, [])

  return (
    <section id="story" ref={sectionRef} className={styles.story} aria-labelledby="story-title">
      <div className={styles.sticky}>
        <header className={styles.header}>
          <h2 id="story-title" className={styles.eyebrow}><Asterisk size={19} aria-hidden="true" /> OUR STORY, STILL BREWING.</h2>
          <span className={styles.scrollHint}>A LITTLE SCROLL. A LONG JOURNEY. <ArrowDown size={14} aria-hidden="true" /></span>
        </header>
        <div className={styles.track} ref={trackRef}>
          {chapters.map((chapter, index) => (
            <article className={styles.chapter} data-chapter key={chapter.year} aria-labelledby={`chapter-${index}`}>
              <span className={styles.year} aria-hidden="true">{chapter.year}</span>
              <div className={styles.copy}>
                <p className={styles.chapterLabel}><span>0{index + 1}</span> {chapter.year} / {chapter.label}</p>
                <h3 id={`chapter-${index}`} className={styles.title}>{chapter.title}<br /><span>{chapter.accent}</span></h3>
                <p className={styles.description}>{chapter.description}</p>
                <span className={styles.place}><span />{chapter.place}</span>
              </div>
              <div className={styles.collage}>
                <figure className={styles.mainPhoto}>
                  <div className={styles.photoFrame}><Image src={chapter.photo} alt={chapter.alt} fill sizes="(max-width: 760px) 65vw, 35vw" /></div>
                  <figcaption>{chapter.caption}</figcaption>
                </figure>
                <figure className={styles.detailPhoto}>
                  <Image src={chapter.detail} alt={chapter.detailAlt} fill sizes="(max-width: 760px) 35vw, 17vw" />
                </figure>
                <span className={styles.photoTag}><Asterisk size={17} aria-hidden="true" />{chapter.tag}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
