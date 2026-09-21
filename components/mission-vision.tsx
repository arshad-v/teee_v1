import Image from 'next/image'
import { Asterisk, HeartHandshake, Sprout } from 'lucide-react'
import styles from './mission-vision.module.css'

export function MissionVision() {
  return (
    <section id="our-purpose" className={`${styles.section} section-wrap`} aria-labelledby="purpose-title">
      <header className={styles.header}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}><Asterisk size={18} aria-hidden="true" /> THE HEART OF TEA TIME</p>
          <div className={styles.headingWithLogo}>
            <h2 id="purpose-title">
              <span className={styles.headingLine}>ROOTED IN CARE.</span>
              <span className={styles.headingLineAccent}>DRIVEN BY PASSION.</span>
            </h2>
            <div className={styles.logoBadge} id="purpose-logo-badge">
              <Image
                src="/images/logo_2.PNG"
                alt="Tea Time logo"
                width={160}
                height={160}
                className={styles.purposeLogo}
                priority={false}
                id="purpose-logo-img"
              />
            </div>
          </div>
        </div>
        <p className={styles.note}>From our first small outlet to every table we serve today, our purpose stays the same.</p>
      </header>
      <div className={styles.values}>
        <article className={styles.value} aria-labelledby="mission-title">
          <div className={styles.topline}><span>01 / OUR MISSION</span><HeartHandshake size={30} strokeWidth={1.3} aria-hidden="true" /></div>
          <h3 id="mission-title">GOOD FOOD.<br />GENUINE <span>CARE.</span></h3>
          <p>We take great pride in preparing and serving the best-quality food at Tea Time Café &amp; Restaurant, with friendly service and affordable prices. We always maintain a spotlessly clean, healthy food environment.</p>
          <div className={styles.signature}><span /> QUALITY IN EVERY SERVING</div>
        </article>
        <article className={`${styles.value} ${styles.vision}`} aria-labelledby="vision-title">
          <div className={styles.topline}><span>02 / OUR VISION</span><Sprout size={30} strokeWidth={1.3} aria-hidden="true" /></div>
          <h3 id="vision-title">LED BY PASSION.<br />BUILT ON <span>RESPECT.</span></h3>
          <p>We run our restaurant with passion, respect and integrity, maintaining the highest possible standards of hygiene and cleanliness in everything we do.</p>
          <div className={styles.signature}><span /> INTEGRITY IN EVERYTHING WE DO</div>
        </article>
      </div>
    </section>
  )
}
