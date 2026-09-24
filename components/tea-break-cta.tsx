import { ArrowUpRight } from 'lucide-react'

const SOCIAL_CHANNELS = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/teatimeuae_demo',
    label: 'Visit Tea Time on Instagram (Demo)',
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="19"
        height="19"
        aria-hidden="true"
        className="joy-social-svg"
      >
        <defs>
          <linearGradient id="joy-ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FED373" />
            <stop offset="25%" stopColor="#F15245" />
            <stop offset="50%" stopColor="#D92E7F" />
            <stop offset="75%" stopColor="#9B36B7" />
            <stop offset="100%" stopColor="#515ECF" />
          </linearGradient>
        </defs>
        <rect width="24" height="24" rx="5.5" fill="url(#joy-ig-grad)" />
        <rect
          x="5.25"
          y="5.25"
          width="13.5"
          height="13.5"
          rx="3.5"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.6"
        />
        <circle
          cx="12"
          cy="12"
          r="3.2"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.6"
        />
        <circle cx="15.8" cy="8.2" r="0.8" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    name: 'X',
    href: 'https://x.com/teatimeuae_demo',
    label: 'Visit Tea Time on X (Demo)',
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="19"
        height="19"
        aria-hidden="true"
        className="joy-social-svg"
      >
        <rect width="24" height="24" rx="5.5" fill="#000000" />
        <path
          d="M16.5 5.5h2.2l-4.8 5.5 5.6 7.5h-4.4l-3.5-4.5-4 4.5H5.4l5.1-5.9L5 5.5h4.5l3.1 4.1zm-.8 11.7h1.2L8.4 6.8H7.1z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/teatimeuae_demo',
    label: 'Visit Tea Time on Facebook (Demo)',
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="19"
        height="19"
        aria-hidden="true"
        className="joy-social-svg"
      >
        <circle cx="12" cy="12" r="12" fill="#1877F2" />
        <path
          d="M15.1 12.8l.5-3.3h-3.2v-2.1c0-.9.4-1.7 1.8-1.7h1.4V2.9c-.3 0-1.3-.1-2.5-.1-2.6 0-4.3 1.6-4.3 4.4v2.3H5.9v3.3h2.9V21c.6.1 1.2.1 1.8.1s1.2 0 1.8-.1v-8.2h2.7z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@teatimeuae_demo',
    label: 'Visit Tea Time on YouTube (Demo)',
    icon: (
      <svg
        viewBox="0 0 28 20"
        width="22"
        height="16"
        aria-hidden="true"
        className="joy-social-svg"
      >
        <path
          d="M27.4 3.1a3.5 3.5 0 0 0-2.5-2.5C22.7 0 14 0 14 0S5.3 0 3.1.6A3.5 3.5 0 0 0 .6 3.1 36.6 36.6 0 0 0 0 10a36.6 36.6 0 0 0 .6 6.9 3.5 3.5 0 0 0 2.5 2.5C5.3 20 14 20 14 20s8.7 0 10.9-.6a3.5 3.5 0 0 0 2.5-2.5A36.6 36.6 0 0 0 28 10a36.6 36.6 0 0 0-.6-6.9z"
          fill="#FF0000"
        />
        <path d="M11.2 14.3l7.3-4.3-7.3-4.3z" fill="#FFFFFF" />
      </svg>
    ),
  },
]

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

        <div className="joy-socials" id="joy-socials">
          <span className="joy-socials-eyebrow">FOLLOW OUR JOURNEY</span>
          <div className="joy-socials-list" role="list">
            {SOCIAL_CHANNELS.map((channel) => (
              <a
                key={channel.name}
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="joy-social-item"
                id={`joy-social-${channel.name.toLowerCase()}`}
                aria-label={channel.label}
                title={`${channel.name} (Demo)`}
                role="listitem"
              >
                <span className="joy-social-icon">{channel.icon}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

