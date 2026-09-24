import Image from 'next/image'
import { ArrowUpRight, Asterisk } from 'lucide-react'
import { TeaBreakCta } from '@/components/tea-break-cta'
import { CafeHero } from '@/components/cafe-hero'
import { CafeHeader, Wordmark } from '@/components/cafe-header'
import { MenuShowcase } from '@/components/menu-showcase'
import { StoryScroller } from '@/components/story-scroller'
import { MissionVision } from '@/components/mission-vision'
import { BranchFinder } from '@/components/branch-finder'
import { SiteFooter } from '@/components/footer'

export default function Page() {
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <CafeHeader />
    <main id="main-content">
      <CafeHero />
      <div className="flavour-strip" aria-label="Freshly made, full of flavour, made for you"><div>{[0,1,2,3].map(i => <span className="strip-group" key={i} aria-hidden={i > 0 ? true : undefined}><span>FRESHLY MADE</span><Asterisk className="strip-star" size={31} aria-hidden="true" /><span>FULL OF FLAVOUR</span><Asterisk className="strip-star" size={31} aria-hidden="true" /><span>MADE FOR YOU</span><Asterisk className="strip-star" size={31} aria-hidden="true" /><span>THAT&apos;S TEA TIME</span><Asterisk className="strip-star" size={31} aria-hidden="true" /></span>)}</div></div>
      <MenuShowcase />
      <TeaBreakCta />
      <StoryScroller />
      <MissionVision />
      <section id="leadership" className="leadership-section section-wrap">
        <div className="leadership-header">
          <div className="section-eyebrow"><span className="status-dot" /> LEADERSHIP &amp; PATRONAGE</div>
          <h2>THE VISIONARIES<br />BEHIND <span>TEA TIME.</span></h2>
          <p>
            Guided by shared dedication, authentic hospitality, and strong UAE roots.
            Meet the leadership and esteemed sponsor powering our ongoing journey.
          </p>
        </div>

        <div className="leadership-frame">
          <div className="leadership-image-wrap">
            <Image
              src="/images/leadership.jpg"
              alt="Tea Time leadership: Ismail Chathoth (Owner), Khalifa Mohamed Lahdan Fadel Alqubaisi (Sponsor), and Noushad Keloth (Managing Director)"
              width={1792}
              height={1024}
              sizes="(max-width: 760px) 100vw, (max-width: 1200px) 90vw, 1200px"
              className="leadership-photo"
              priority={false}
            />
            <div className="leadership-names-overlay">
              <div className="leader-name-item">
                <span className="leader-tag">OWNER</span>
                <h3 className="leader-name">ISMAIL CHATHOTH</h3>
                <p className="leader-subtitle">Founder · Kerala, 1988</p>
              </div>
              <div className="leader-name-item sponsor-item">
                <span className="leader-tag sponsor-tag">ESTEEMED SPONSOR</span>
                <h3 className="leader-name">KHALIFA MOHAMED LAHDAN FADEL ALQUBAISI</h3>
                <p className="leader-subtitle">UAE Visionary &amp; Patron</p>
              </div>
              <div className="leader-name-item">
                <span className="leader-tag">MANAGING DIRECTOR</span>
                <h3 className="leader-name">NOUSHAD KELOTH</h3>
                <p className="leader-subtitle">Growth &amp; Operations</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BranchFinder />
    </main>
    <SiteFooter />
  </>
}
