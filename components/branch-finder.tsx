'use client'

import { useState } from 'react'
import { ArrowUpRight, MapPin, ChevronDown } from 'lucide-react'

export interface Branch {
  name: string
  location: string
  query: string
}

export const branches: Branch[] = [
  {
    name: 'Tea Time Cafeteria · Al Shamkha',
    location: 'Al Shamkha 12, near Makani Mall, Abu Dhabi',
    query: 'Tea Time Cafeteria, Al Shamkha 12, near Makani Mall, Abu Dhabi',
  },
  {
    name: 'Tea Time Cafeteria · Shilela / Al Rahba',
    location: 'Shilela, Al Rahba, Abu Dhabi',
    query: 'Shilela, Al Rahba, Abu Dhabi',
  },
  {
    name: 'Tea Time Cafeteria · Muroor Road',
    location: 'Muroor Road, opposite Khalifa University, Abu Dhabi City',
    query: 'Muroor Road, opposite Khalifa University, Abu Dhabi',
  },
  {
    name: 'Tea Time Cafeteria · Madinat Zayed / Hamdan St',
    location: 'Madinat Zayed, Hamdan Street, Abu Dhabi City',
    query: 'Hamdan Street, Madinat Zayed, Abu Dhabi City',
  },
  {
    name: 'Tea Time Cafeteria · Al Falah Old',
    location: 'Al Falah Old, Abu Dhabi',
    query: 'Al Falah Old, Abu Dhabi',
  },
  {
    name: 'Tea Time Cafeteria · Al Shamkha 13',
    location: 'Al Shamkha 13, near Makani Mall, Abu Dhabi',
    query: 'Al Shamkha 13, near Makani Mall, Abu Dhabi',
  },
  {
    name: 'Tea Time Cafeteria · Sky Mall Al Falah',
    location: 'Sky Mall, Al Falah, Abu Dhabi',
    query: 'Sky Mall, Al Falah, Abu Dhabi',
  },
  {
    name: 'Tea Time Cafeteria · Safeer Mall Khalifa City',
    location: 'Safeer Mall, Khalifa City, Abu Dhabi',
    query: 'Safeer Mall, Khalifa City, Abu Dhabi',
  },
  {
    name: 'Tea Time Cafeteria · Rabdan',
    location: 'Binal Jazrain, Rabdan, Abu Dhabi',
    query: 'Rabdan, Bain Al Jesrain, Abu Dhabi',
  },
  {
    name: 'Tea Time Plus Cafeteria · Khalifa City',
    location: 'Khalifa City, Abu Dhabi',
    query: 'Tea Time Plus Cafeteria, Khalifa City, Abu Dhabi',
  },
  {
    name: 'Cafeteria Tea Time Express · Electra St',
    location: 'Electra Street, near Eldorado, Abu Dhabi',
    query: 'Eldorado Cinema Building, Electra Street, Abu Dhabi',
  },
  {
    name: 'Emirates Tea Cafeteria · Salam Street',
    location: 'Salam Street, Abu Dhabi City',
    query: 'Emirates Tea Cafeteria, Salam Street, Abu Dhabi City',
  },
  {
    name: 'Emirates Tea Cafeteria · Khalifa City',
    location: 'Khalifa City, Abu Dhabi',
    query: 'Emirates Tea Cafeteria, Khalifa City, Abu Dhabi',
  },
  {
    name: 'Star One Plus Restaurant · Al Falah St',
    location: 'Madinat Zayed, Al Falah Street, Abu Dhabi',
    query: 'Star One Plus Restaurant, Al Falah Street, Madinat Zayed, Abu Dhabi',
  },
  {
    name: 'Jabal Al Noor Al Shabi Restaurant · Al Rahba',
    location: 'Al Rahba, Abu Dhabi',
    query: 'Jabal Al Noor Al Shabi Restaurant, Al Rahba, Abu Dhabi',
  },
  {
    name: 'Jabal Al Noor Al Shabi Restaurant · Al Falah',
    location: 'Al Falah Old, Abu Dhabi',
    query: 'Jabal Al Noor Al Shabi Restaurant, Al Falah Old, Abu Dhabi',
  },
  {
    name: 'Golden Galaxy Refreshment · Al Rahba',
    location: 'Al Rahba Market, Abu Dhabi',
    query: 'Golden Galaxy Refreshment, Al Rahba Market, Abu Dhabi',
  },
  {
    name: 'Green Zaithoon Restaurant · Madinat Zayed',
    location: 'Madinat Zayed, Al Falah Street, Abu Dhabi',
    query: 'Green Zaithoon Restaurant, Al Falah Street, Madinat Zayed, Abu Dhabi',
  },
  {
    name: 'Plus Jabal Al Noor Restaurant & Café · Shilela',
    location: 'Shilela, Al Rahba, Abu Dhabi',
    query: 'Plus Jabal Al Noor Restaurant & Cafe, Shilela, Al Rahba, Abu Dhabi',
  },
  {
    name: 'Smart Tea Time Café · Baniyas East',
    location: 'Baniyas East, near Mafraq Mall, Abu Dhabi',
    query: 'Smart Tea Time Cafe, Baniyas East, near Mafraq Mall, Abu Dhabi',
  },
  {
    name: 'Grand Mark Restaurant · Al Falah',
    location: 'Al Falah 1A New, near Mubash Express Supermarket, Abu Dhabi',
    query: 'Grand Mark Restaurant, Al Falah 1A New, Abu Dhabi',
  },
  {
    name: 'Super Tea Time Cafeteria · Muroor Road',
    location: 'Muroor Road, opposite Khalifa University, Abu Dhabi City',
    query: 'Super Tea Time Cafeteria, Muroor Road, Abu Dhabi City',
  },
  {
    name: 'Calicut Food Book Restaurant · Salam St',
    location: 'Salam Street, near KIA Showroom, Abu Dhabi',
    query: 'Calicut Food Book Restaurant, Salam Street, Abu Dhabi',
  },
  {
    name: 'Golden Jabel Al Noor Cafeteria & Grill · Al Shamkha',
    location: 'Al Shamkha 9, near Makani Mall, Abu Dhabi',
    query: 'Golden Jabel Al Noor Cafeteria & Grill, Al Shamkha 9, Abu Dhabi',
  },
  {
    name: 'Al Shawamikh City Restaurant · Al Shawamikh',
    location: 'Al Shawamikh, Abu Dhabi',
    query: 'Al Shawamikh City Restaurant, Al Shawamikh, Abu Dhabi',
  },
  {
    name: 'Golden Tea Time Cafeteria · Abu Dhabi City',
    location: 'Abu Dhabi City',
    query: 'Golden Tea Time Cafeteria, Abu Dhabi City',
  },
  {
    name: 'SP Burger Cafeteria · Salam Street',
    location: 'Salam Street, Abu Dhabi City',
    query: 'SP Burger Cafeteria, Salam Street, Abu Dhabi City',
  },
  {
    name: 'Tea Plus Tea Cafeteria · Electra Street',
    location: 'Electra Street, Abu Dhabi',
    query: 'Tea Plus Tea Cafeteria, Electra Street, Abu Dhabi',
  },
  {
    name: 'Tea Plus Tea Cafeteria · Baniyas',
    location: 'Baniyas, Abu Dhabi',
    query: 'Tea Plus Tea Cafeteria, Baniyas, Abu Dhabi',
  },
]

export function BranchFinder() {
  const [selected, setSelected] = useState<number>(0)
  const branch = branches[selected] || branches[0]

  return (
    <section id="visit" className="visit-section section-wrap" aria-labelledby="visit-heading">
      <div>
        <div className="section-eyebrow">
          <MapPin size={16} /> YOUR NEXT HAPPY PLACE
        </div>
        <h2 id="visit-heading">
          GOOD TIMES.<br />
          JUST <span className="outline-text">AROUND<br className="desktop-break" /> THE CORNER.</span>
        </h2>
        <p>
          A quick catch-up. A well-earned break. A craving that<br className="desktop-break" /> can&apos;t wait. There&apos;s a Tea Time for that.
        </p>
      </div>

      <div className="location-card" id="location-card">
        <span className="location-kicker">COME ON OVER</span>
        <h3>
          Let&apos;s make it<br />Tea Time.
        </h3>
        <label htmlFor="branch">FIND YOUR NEIGHBOURHOOD</label>
        <div className="select-wrap">
          <select
            id="branch"
            value={selected}
            onChange={(event) => setSelected(Number(event.target.value))}
          >
            {branches.map((item, index) => (
              <option key={item.name} value={index}>
                {item.name}
              </option>
            ))}
          </select>
          <ChevronDown size={18} aria-hidden="true" />
        </div>
        <div className="location-address" aria-live="polite">
          <MapPin size={19} aria-hidden="true" />
          <p>{branch.location}</p>
        </div>
        <a
          key={branch.name}
          className="pill-link light-pill"
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            branch.query
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Let&apos;s go there <ArrowUpRight size={18} aria-hidden="true" />
        </a>
        <p className="location-footnote">Check opening hours with your chosen branch.</p>
      </div>
    </section>
  )
}
