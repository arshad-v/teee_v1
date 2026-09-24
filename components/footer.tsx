import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/teatimeuae_demo',
    label: 'Follow Tea Time on Instagram (Demo)',
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="21"
        height="21"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    name: 'X',
    href: 'https://x.com/teatimeuae_demo',
    label: 'Follow Tea Time on X (formerly Twitter) (Demo)',
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="19"
        height="19"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/teatimeuae_demo',
    label: 'Follow Tea Time on Facebook (Demo)',
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@teatimeuae_demo',
    label: 'Subscribe to Tea Time on YouTube (Demo)',
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
]

export function SiteFooter() {
  return (
    <footer className="site-footer section-wrap" id="site-footer">
      <div className="footer-top" id="footer-top">
        <div className="footer-brand-col" id="footer-brand-col">
          <div className="footer-brand" id="footer-brand">
            <a className="footer-logo" href="#home" aria-label="Tea Time home" id="footer-logo-link">
              <Image
                src="/images/logo_2.PNG"
                alt="Tea Time logo"
                width={84}
                height={84}
                className="footer-logo-img"
                priority={false}
                id="footer-logo-img"
              />
            </a>
            <p className="footer-tagline" id="footer-tagline">
              Your everyday happy place.<br />From Kerala, with love.
            </p>
          </div>

          <div className="footer-social-section" id="footer-social-section">
            <span className="footer-social-title" id="footer-social-title">FOLLOW OUR JOURNEY</span>
            <div className="footer-social-links" id="footer-social-links" role="list">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn"
                  id={`footer-social-${item.name.toLowerCase()}`}
                  aria-label={item.label}
                  title={`${item.name} (Demo)`}
                  role="listitem"
                >
                  <span className="footer-social-icon">{item.icon}</span>
                </a>
              ))}
            </div>
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

      <div className="footer-big" aria-hidden="true" id="footer-tagline-banner">
        IT&apos;S ALWAYS TEA TIME.
      </div>

      <div className="footer-bottom" id="footer-bottom">
        <a href="#home" id="footer-back-to-top">Back to top ↑</a>
        <span id="footer-copyright">© {new Date().getFullYear()} Tea Time. All rights reserved.</span>
        <span className="footer-motto" id="footer-motto">GOOD FOOD. GOOD PEOPLE. GOOD TIMES.</span>
      </div>
    </footer>
  )
}
