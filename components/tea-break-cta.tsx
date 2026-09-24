import { ArrowUpRight } from 'lucide-react'

export function TeaBreakCta() {
  return (
    <section className="joy-section section-wrap" aria-labelledby="tea-break-heading">
      <div className="joy-content">
        <div className="section-eyebrow"><span className="status-dot" /> NO OCCASION NEEDED. JUST YOU.</div>
        <h2 id="tea-break-heading" className="joy-heading">TAKE A BREAK.<br />MAKE IT <span>TEA TIME.</span></h2>
        <p className="joy-description">Some of the best moments happen over something delicious.<br />{' '}Your everyday happy place is just around the corner.</p>
        <div className="joy-actions">
          <a className="pill-link joy-primary" href="#visit">See you at Tea Time <ArrowUpRight size={20} aria-hidden="true" /></a>
          <a className="joy-secondary" href="#menu">Explore the menu <ArrowUpRight size={18} aria-hidden="true" /></a>
        </div>
        <p className="joy-signoff">GOOD FOOD. <span /> GOOD PEOPLE. <span /> GOOD TIMES.</p>
      </div>
    </section>
  )
}
