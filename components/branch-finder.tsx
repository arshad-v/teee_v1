'use client'

import { useState, useMemo } from 'react'
import { ArrowUpRight, MapPin, Search, X, ChevronDown } from 'lucide-react'

export interface Branch {
  id: string
  name: string
  address: string
  area: string
  query: string
}

export const BRANCH_DIRECTORY: Branch[] = [
  {
    id: 'star-one-plus',
    name: 'Star One Plus Restaurant LLC',
    address: 'Madinat Zayed, Al Falah Street, Abu Dhabi',
    area: 'Madinat Zayed',
    query: 'Star One Plus Restaurant LLC Madinat Zayed Al Falah Street Abu Dhabi',
  },
  {
    id: 'tea-time-shamkha-12',
    name: 'Tea Time Cafeteria',
    address: 'Al Shamkha 12, Near Makani Mall, Abu Dhabi',
    area: 'Al Shamkha',
    query: 'Tea Time Cafeteria Al Shamkha 12 near Makani Mall Abu Dhabi',
  },
  {
    id: 'tea-time-branch-1-shilela',
    name: 'Tea Time Cafeteria Branch 1',
    address: 'Shilela, Al Rahba, Abu Dhabi',
    area: 'Al Rahba',
    query: 'Tea Time Cafeteria Branch 1 Shilela Al Rahba Abu Dhabi',
  },
  {
    id: 'tea-time-branch-2-muroor',
    name: 'Tea Time Cafeteria Branch 2',
    address: 'Muroor Road, Opposite Khalifa University, Abu Dhabi City',
    area: 'Muroor Road',
    query: 'Tea Time Cafeteria Branch 2 Muroor Road opposite Khalifa University Abu Dhabi',
  },
  {
    id: 'tea-time-branch-3-hamdan',
    name: 'Tea Time Cafeteria Branch 3',
    address: 'Madinat Zayed, Hamdan Street, Abu Dhabi City',
    area: 'Madinat Zayed',
    query: 'Tea Time Cafeteria Branch 3 Madinat Zayed Hamdan Street Abu Dhabi',
  },
  {
    id: 'tea-time-branch-4-falah-old',
    name: 'Tea Time Cafeteria Branch 4',
    address: 'Al Falah Old, Abu Dhabi',
    area: 'Al Falah',
    query: 'Tea Time Cafeteria Branch 4 Al Falah Old Abu Dhabi',
  },
  {
    id: 'tea-time-branch-5-shamkha-13',
    name: 'Tea Time Cafeteria Branch 5',
    address: 'Al Shamkha 13, Near Makani Mall, Abu Dhabi',
    area: 'Al Shamkha',
    query: 'Tea Time Cafeteria Branch 5 Al Shamkha 13 near Makani Mall Abu Dhabi',
  },
  {
    id: 'tea-time-branch-6-sky-mall',
    name: 'Tea Time Cafeteria Branch 6',
    address: 'Al Falah, Sky Mall, Abu Dhabi',
    area: 'Al Falah',
    query: 'Tea Time Cafeteria Branch 6 Sky Mall Al Falah Abu Dhabi',
  },
  {
    id: 'tea-time-branch-7-safeer-mall',
    name: 'Tea Time Cafeteria Branch 7',
    address: 'Safeer Mall, Khalifa City, Abu Dhabi',
    area: 'Khalifa City',
    query: 'Tea Time Cafeteria Branch 7 Safeer Mall Khalifa City Abu Dhabi',
  },
  {
    id: 'tea-time-branch-8-rabdan',
    name: 'Tea Time Cafeteria Branch 8',
    address: 'Bain Al Jesrain, Rabdan, Abu Dhabi',
    area: 'Rabdan',
    query: 'Tea Time Cafeteria Branch 8 Bain Al Jesrain Rabdan Abu Dhabi',
  },
  {
    id: 'tea-time-plus-khalifa-city',
    name: 'Tea Time Plus Cafeteria',
    address: 'Khalifa City, Abu Dhabi',
    area: 'Khalifa City',
    query: 'Tea Time Plus Cafeteria Khalifa City Abu Dhabi',
  },
  {
    id: 'cafeteria-tea-time-express',
    name: 'Cafeteria Tea Time Express',
    address: 'Electra Street, Near Eldorado, Abu Dhabi',
    area: 'Electra Street',
    query: 'Cafeteria Tea Time Express Electra Street near Eldorado Abu Dhabi',
  },
  {
    id: 'emirates-tea-salam-st',
    name: 'Emirates Tea Cafeteria',
    address: 'Salam Street, Abu Dhabi City',
    area: 'Salam Street',
    query: 'Emirates Tea Cafeteria Salam Street Abu Dhabi',
  },
  {
    id: 'emirates-tea-branch-1-khalifa',
    name: 'Emirates Tea Cafeteria Branch 1',
    address: 'Khalifa City, Abu Dhabi',
    area: 'Khalifa City',
    query: 'Emirates Tea Cafeteria Branch 1 Khalifa City Abu Dhabi',
  },
  {
    id: 'jabal-al-noor-al-shabi',
    name: 'Jabal Al Noor Al Shabi Restaurant',
    address: 'Al Rahba, Abu Dhabi',
    area: 'Al Rahba',
    query: 'Jabal Al Noor Al Shabi Restaurant Al Rahba Abu Dhabi',
  },
  {
    id: 'jabal-al-noor-al-shabi-br1',
    name: 'Jabal Al Noor Al Shabi Restaurant Br1',
    address: 'Al Falah Old, Abu Dhabi',
    area: 'Al Falah',
    query: 'Jabal Al Noor Al Shabi Restaurant Br1 Al Falah Old Abu Dhabi',
  },
  {
    id: 'golden-galaxy-refreshment',
    name: 'Golden Galaxy Refreshment',
    address: 'Al Rahba Market, Abu Dhabi',
    area: 'Al Rahba',
    query: 'Golden Galaxy Refreshment Al Rahba Market Abu Dhabi',
  },
  {
    id: 'green-zaithoon-restaurant',
    name: 'Green Zaithoon Restaurant',
    address: 'Madinat Zayed, Al Falah Street, Abu Dhabi',
    area: 'Madinat Zayed',
    query: 'Green Zaithoon Restaurant Madinat Zayed Al Falah Street Abu Dhabi',
  },
  {
    id: 'plus-jabal-alnoor-cafe',
    name: 'Plus Jabal Alnoor Restaurant & Café',
    address: 'Shilela, Al Rahba, Abu Dhabi',
    area: 'Al Rahba',
    query: 'Plus Jabal Alnoor Restaurant Cafe Shilela Al Rahba Abu Dhabi',
  },
  {
    id: 'smart-tea-time-cafe',
    name: 'Smart Tea Time Café',
    address: 'Baniyas East, Near Mafraq Mall, Abu Dhabi',
    area: 'Baniyas',
    query: 'Smart Tea Time Cafe Baniyas East near Mafraq Mall Abu Dhabi',
  },
  {
    id: 'grand-mark-restaurant',
    name: 'Grand Mark Restaurant',
    address: 'Al Falah 1A New, Near Mubash Express Supermarket, Abu Dhabi',
    area: 'Al Falah',
    query: 'Grand Mark Restaurant Al Falah 1A New near Mubash Express Supermarket Abu Dhabi',
  },
  {
    id: 'super-tea-time-cafeteria',
    name: 'Super Tea Time Cafeteria',
    address: 'Muroor Road, Opposite Khalifa University, Abu Dhabi City',
    area: 'Muroor Road',
    query: 'Super Tea Time Cafeteria Muroor Road opposite Khalifa University Abu Dhabi',
  },
  {
    id: 'calicut-food-book-restaurant',
    name: 'Calicut Food Book Restaurant',
    address: 'Salam Street, Near KIA Showroom, Abu Dhabi',
    area: 'Salam Street',
    query: 'Calicut Food Book Restaurant Salam Street near KIA Showroom Abu Dhabi',
  },
  {
    id: 'golden-jabel-al-noor-grill',
    name: 'Golden Jabel Al Noor Cafeteria & Grill',
    address: 'Al Shamkha 9, Near Makani Mall, Abu Dhabi',
    area: 'Al Shamkha',
    query: 'Golden Jabel Al Noor Cafeteria Grill Al Shamkha 9 near Makani Mall Abu Dhabi',
  },
  {
    id: 'al-shawamikh-city-restaurant',
    name: 'Al Shawamikh City Restaurant',
    address: 'Al Shawamikh, Abu Dhabi',
    area: 'Al Shawamikh',
    query: 'Al Shawamikh City Restaurant Al Shawamikh Abu Dhabi',
  },
  {
    id: 'golden-tea-time-cafeteria',
    name: 'Golden Tea Time Cafeteria',
    address: 'Abu Dhabi City',
    area: 'Abu Dhabi City',
    query: 'Golden Tea Time Cafeteria Abu Dhabi City',
  },
  {
    id: 'sp-burger-cafeteria',
    name: 'SP Burger Cafeteria',
    address: 'Salam Street, Abu Dhabi City',
    area: 'Salam Street',
    query: 'SP Burger Cafeteria Salam Street Abu Dhabi City',
  },
  {
    id: 'tea-plus-tea-cafeteria',
    name: 'Tea Plus Tea Cafeteria',
    address: 'Electra Street, Abu Dhabi',
    area: 'Electra Street',
    query: 'Tea Plus Tea Cafeteria Electra Street Abu Dhabi',
  },
  {
    id: 'tea-plus-tea-cafeteria-branch-1',
    name: 'Tea Plus Tea Cafeteria Branch 1',
    address: 'Baniyas, Abu Dhabi',
    area: 'Baniyas',
    query: 'Tea Plus Tea Cafeteria Branch 1 Baniyas Abu Dhabi',
  },
]

export function BranchFinder() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBranchId, setSelectedBranchId] = useState<string>(BRANCH_DIRECTORY[1].id)

  // Filter branches instantaneously by search term
  const filteredBranches = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return BRANCH_DIRECTORY
    return BRANCH_DIRECTORY.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.address.toLowerCase().includes(q) ||
        b.area.toLowerCase().includes(q)
    )
  }, [searchQuery])

  // Resolve currently active branch
  const activeBranch = useMemo(() => {
    const found = filteredBranches.find((b) => b.id === selectedBranchId)
    if (found) return found
    return filteredBranches[0] || BRANCH_DIRECTORY[0]
  }, [selectedBranchId, filteredBranches])

  const googleMapsUrl = activeBranch
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeBranch.query)}`
    : '#'

  return (
    <section id="visit" className="visit-section section-wrap" aria-labelledby="visit-heading">
      <div>
        <div className="section-eyebrow">
          <MapPin size={16} aria-hidden="true" /> YOUR NEXT HAPPY PLACE
        </div>
        <h2 id="visit-heading">
          GOOD TIMES.<br />
          JUST <span className="outline-text">AROUND<br className="desktop-break" /> THE CORNER.</span>
        </h2>
        <p>
          A quick catch-up. A well-earned break. A craving that<br className="desktop-break" /> can&apos;t wait.
          There&apos;s a Tea Time for that.
        </p>
      </div>

      <div className="location-card">
        <span className="location-kicker">WHERE TO FIND US</span>
        <h3>
          Let&apos;s make it<br />Tea Time.
        </h3>

        {/* Instant Search Bar */}
        <div className="branch-search-box">
          <label htmlFor="branch-search-input" className="branch-search-label">
            SEARCH ANY BRANCH, STREET, OR AREA
          </label>
          <div className="branch-input-wrap">
            <Search className="branch-search-icon" size={17} aria-hidden="true" />
            <input
              id="branch-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search e.g. Shamkha, Khalifa City, Electra, Makani Mall..."
              className="branch-search-input"
              autoComplete="off"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="branch-clear-btn"
                aria-label="Clear search input"
                title="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Branch Selection Dropdown */}
        <div className="branch-select-group">
          <label htmlFor="branch-select" className="branch-search-label">
            {searchQuery
              ? `MATCHING LOCATIONS (${filteredBranches.length})`
              : 'CHOOSE YOUR NEIGHBOURHOOD'}
          </label>
          {filteredBranches.length === 0 ? (
            <div className="branch-empty-state">
              <p>No locations found matching &ldquo;{searchQuery}&rdquo;</p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="branch-empty-reset"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="select-wrap">
              <select
                id="branch-select"
                value={activeBranch?.id || ''}
                onChange={(e) => setSelectedBranchId(e.target.value)}
                className="branch-native-select"
              >
                {filteredBranches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} — {b.address}
                  </option>
                ))}
              </select>
              <ChevronDown size={18} aria-hidden="true" />
            </div>
          )}
        </div>

        {/* Restored to original: clean location address and original CTA button */}
        <div className="location-address" aria-live="polite">
          <MapPin size={19} aria-hidden="true" />
          <p>{activeBranch?.address || ''}</p>
        </div>

        <a
          className="pill-link light-pill"
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Let&apos;s go there <ArrowUpRight size={18} aria-hidden="true" />
        </a>

        <p className="location-footnote">
          All locations open early till late. Timings may vary slightly by branch.
        </p>
      </div>
    </section>
  )
}
