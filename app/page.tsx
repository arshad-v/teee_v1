import Image from 'next/image'
import { ArrowUpRight, Asterisk } from 'lucide-react'
import { TeaBreakCta } from '@/components/tea-break-cta'
import { CafeHero } from '@/components/cafe-hero'
import { CafeHeader, Wordmark } from '@/components/cafe-header'
import { MenuShowcase } from '@/components/menu-showcase'
import { StoryScroller } from '@/components/story-scroller'
import { MissionVision } from '@/components/mission-vision'
import { BranchFinder } from '@/components/branch-finder'

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
    <footer className="site-footer section-wrap" id="site-footer">
      <div className="footer-top" id="footer-top">
        <div className="footer-brand-col" id="footer-brand-col">
          <div className="footer-brand" id="footer-brand">
            <a className="footer-logo" href="#home" aria-label="Tea Time home" id="footer-logo-link">
              <Image src="/images/logo_2.PNG" alt="Tea Time logo" width={84} height={84} className="footer-logo-img" priority={false} id="footer-logo-img" />
            </a>
            <p className="footer-tagline" id="footer-tagline">
              Your everyday happy place.<br />From Kerala, with love.
            </p>
          </div>
        </div>
        <div className="footer-links-col" id="footer-links-col">
          <span className="footer-col-title" id="footer-links-title">COME HANG OUT</span>
          <div className="footer-links" id="footer-links-group">
            <a href="#menu" id="footer-link-menu">Our menu</a>
            <a href="#story" id="footer-link-story">Our story</a>
            <a href="#leadership" id="footer-link-leadership">Leadership</a>
            <a href="#visit" id="footer-link-visit">Find a branch</a>
          </div>
        </div>
        <div className="footer-contact-col" id="footer-contact-col">
          <span className="footer-col-title" id="footer-contact-title">SAY HELLO</span>
          <div className="footer-contact" id="footer-contact-group">
            <a className="footer-email-link" href="mailto:teatimegroupauh@gmail.com" id="footer-email-link">
              teatimegroupauh@gmail.com <ArrowUpRight size={15} />
            </a>
            <p className="footer-address" id="footer-address">
              Head office · Al Falah Street<br />Abu Dhabi, United Arab Emirates.
            </p>
          </div>
        </div>
      </div>
      <div className="footer-big" aria-hidden="true" id="footer-tagline-banner">IT&apos;S ALWAYS TEA TIME.</div>
      <div className="footer-bottom" id="footer-bottom">
        <a href="#home" id="footer-back-to-top">Back to top ↑</a>
        <span id="footer-copyright">© {new Date().getFullYear()} Tea Time. All rights reserved.</span>
        <span className="footer-motto" id="footer-motto">GOOD FOOD. GOOD PEOPLE. GOOD TIMES.</span>
      </div>
    </footer>
  </>
}
