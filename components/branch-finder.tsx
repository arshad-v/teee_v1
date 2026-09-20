'use client'

import { useState } from 'react'
import { ArrowUpRight, MapPin, ChevronDown } from 'lucide-react'

const branches = [
  { name: 'Tea Time · Al Shamkha', location: 'Main branch · Al Shamkha, Abu Dhabi', query: 'Tea Time Cafeteria Al Shamkha Abu Dhabi' },
  { name: 'Tea Time · Al Rahba', location: 'Shahama / Shielela, Al Rahba, Abu Dhabi', query: 'Tea Time Cafeteria Shielela Al Rahba Abu Dhabi' },
  { name: 'Tea Time · Muroor Road', location: 'Muroor Road, Abu Dhabi', query: 'Tea Time Cafeteria Muroor Road Abu Dhabi' },
  { name: 'Tea Time · Hamdan', location: 'Hamdan, Abu Dhabi', query: 'Tea Time Cafeteria Hamdan Abu Dhabi' },
  { name: 'Tea Time · Al Falah', location: 'Al Falah, Abu Dhabi', query: 'Tea Time Cafeteria Al Falah Abu Dhabi' },
  { name: 'Emirates Tea · Abu Dhabi Mall', location: 'Near Abu Dhabi Mall, Abu Dhabi', query: 'Emirates Tea near Abu Dhabi Mall' },
  { name: 'Emirates Tea · Khalifa City', location: 'Khalifa City, Abu Dhabi', query: 'Emirates Tea Khalifa City Abu Dhabi' },
  { name: 'Tea Time Plus · Khalifa City', location: 'Khalifa City, Abu Dhabi', query: 'Tea Time Plus Cafeteria Khalifa City Abu Dhabi' },
  { name: 'Tea Time Express', location: 'Elrado, Abu Dhabi', query: 'Tea Time Express Cafeteria Abu Dhabi' },
  { name: 'Jabal Al Noor Al Shabi', location: 'Al Rahba, Abu Dhabi', query: 'Jabal Al Noor Al Shabi Restaurant Al Rahba Abu Dhabi' },
  { name: 'Al Shawamikh City Restaurant', location: 'Abu Dhabi', query: 'Al Shawamikh City Restaurant Cuisine Abu Dhabi' },
  { name: 'Golden Jabel Al Noor', location: 'Al Shamkha, Abu Dhabi', query: 'Golden Jabel Al Noor Cafeteria Grills Shamkha Abu Dhabi' },
  { name: 'Jabal Al Noor · Al Falah', location: 'Al Falah, Abu Dhabi', query: 'Jabal Al Noor Al Shabi Restaurant Al Falah Abu Dhabi' },
  { name: 'Star One Plus Restaurant', location: 'Al Falah Street, Abu Dhabi', query: 'Star One Plus Restaurant Al Falah Street Abu Dhabi' },
]

export function BranchFinder() {
  const [selected, setSelected] = useState(0)
  const branch = branches[selected]
  return <section id="visit" className="visit-section section-wrap">
    <div><div className="section-eyebrow"><MapPin size={16} /> YOUR NEXT HAPPY PLACE</div><h2>GOOD TIMES.<br />JUST <span className="outline-text">AROUND<br className="desktop-break" /> THE CORNER.</span></h2><p>A quick catch-up. A well-earned break. A craving that<br className="desktop-break" /> can&apos;t wait. There&apos;s a Tea Time for that.</p></div>
    <div className="location-card"><span className="location-kicker">COME ON OVER</span><h3>Let&apos;s make it<br />Tea Time.</h3><label htmlFor="branch">FIND YOUR NEIGHBOURHOOD</label><div className="select-wrap"><select id="branch" value={selected} onChange={event => setSelected(Number(event.target.value))}>{branches.map((item, index) => <option key={item.name} value={index}>{item.name}</option>)}</select><ChevronDown size={18} aria-hidden="true" /></div><div className="location-address" aria-live="polite"><MapPin size={19} aria-hidden="true" /><p>{branch.location}</p></div><a className="pill-link light-pill" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.query)}`} target="_blank" rel="noopener noreferrer">Let&apos;s go there <ArrowUpRight size={18} aria-hidden="true" /></a><p className="location-footnote">Check opening hours with your chosen branch.</p></div>
  </section>
}
