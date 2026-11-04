import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

export function CafeHero() {
  return (
    <section className="hero section-wrap" aria-labelledby="hero-title">
      <div className="hero-copy">
        <div className="section-eyebrow"><span className="status-dot" /> GOOD FOOD. YOUR KIND OF PLACE.</div>
        <h1 id="hero-title">BIG BITES.<br /><span>FRESH SIPS.</span><br />GOOD TIMES.</h1>
        <p>That first bite. That fresh sip. That happy feeling. <br />Juicy burgers, fresh juices, and the tea you love. <br />Go on. Give in to your cravings.</p>
        <div className="hero-actions">
          <a className="pill-link" href="#menu">Find your favourites <ArrowUpRight size={19} aria-hidden="true" /></a>
          <a className="text-link" href="#visit">Come on over <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
        <div className="hero-origin"><span aria-hidden="true" /> A little taste of home. Since 1988.</div>
      </div>
      <div className="hero-visual">
        <div className="hero-sun" aria-hidden="true" />
        <div className="hero-orbit" aria-hidden="true" />
        <div className="hero-green-dot" aria-hidden="true" />
        <div className="hero-photo-frame">
          <Image className="hero-photo" src="/images/hero-feast.png" alt="A vibrant feast of burgers, fries, fresh juice, and tea" width={1024} height={1024} priority sizes="(max-width: 760px) 100vw, 55vw" />
        </div>
        <div className="hero-little-arc" aria-hidden="true" />
      </div>
    </section>
  )
}
