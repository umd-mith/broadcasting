import React, { useState } from "react"
import { Link } from "gatsby"
import { FaAngleUp } from "react-icons/fa"

import "./registry.css"
import "./chip.css"

interface RegistryEntity {
  name: string
  url: string
  description: string
  collections: string[]
}

interface Props {
  name: string
  items: RegistryEntity[]
}

export default function Registry({ name, items }: Props) {
  const collections = ["NAEB", "NFCB", "WHA", "KUOM"]

  const [searchQuery, setSearchQuery] = useState("")
  const [activeCollections, setActiveCollections] = useState(collections)
  const [singleCollection, setSingleCollection] = useState(true)

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
  const itemsByLetter = new Map(letters.map(l => [l, []]))

  // a category for items that don't start with A-Z
  itemsByLetter.set("Other", [])

  for (const item of items) {
    // Apply search filter
    const escaped = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const searchable = item.name + " " + item.description
    if (!searchable.match(new RegExp(escaped, "i"))) {
      continue
    }

    // Apply single collection filter
    if (!singleCollection && item.collections.length < 2) {
      continue
    } 

    // Apply collection filter
    if (item.collections.filter(value => activeCollections.includes(value)).length === 0) {
      continue
    }

    const firstLetter = item.name[0].toUpperCase()

    if (itemsByLetter.has(firstLetter)) {
      const group = itemsByLetter.get(firstLetter) as RegistryEntity[]
      group.push(item)
    } else {
      const group = itemsByLetter.get("Other") as RegistryEntity[]
      group.push(item)
    }
  }

  const scrollBack = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleCollectionFilter = (coll: string) => {
    if (activeCollections.indexOf(coll) > -1) {
      setActiveCollections(activeCollections.filter(c => c !== coll))
    } else {
      setActiveCollections([...activeCollections, coll])
    }
  }

  const handleSingleCollectionFilter = () => {
    setSingleCollection(!singleCollection)
  }

  return (
    <div className="registry">
      <div className="registry-filter">
        <span><label>Show entities from: </label></span>
        {collections.map((c, i) => (<span key={c}>
          <input type="checkbox" 
            checked={activeCollections.indexOf(c) > -1}
            onChange={() => handleCollectionFilter(c)}
            key={`c${i}`} /> <label>{c}</label>
        </span>))}
        <span>
        <input type="checkbox" 
            checked={singleCollection}
            onChange={() => handleSingleCollectionFilter()} /> <label>Single Collection Only</label>
        </span>
      </div>
      <input
        className="registry-search"
        type="text"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder={`Search by ${name}`}
        aria-label="Search"
      />

      <div className="registry-nav">
        {letters.map(letter => (
          <a href={`#letter-${letter}`} key={letter}>{letter}</a>
        ))}
      </div>

      <div>
        Entities shown: {Array.from(itemsByLetter.keys()).map(l => {
          const ibls = itemsByLetter.get(l) as RegistryEntity[]
          return ibls.length
        }).reduce((a, b) => a + b, 0)} / {items.length}
      </div>

      {Array.from(itemsByLetter.keys()).map(letter => {
        const ibls = itemsByLetter.get(letter) as RegistryEntity[]
        const hasItems = ibls.length > 0
        return (
          <section style={{ display: hasItems ? "block" : "none" }} key={letter}>
            <div className="letter-section">
              <div className="letter" id={`letter-${letter}`}>
                {letter}
              </div>
              <div>
                <button className="button back" onClick={scrollBack}>
                  <FaAngleUp />
                </button>
              </div>
            </div>

            <ul>
              {ibls.map(item => (
                <li key={item.url}>
                  <Link to={item.url}>{item.name}</Link>:
                  {item.collections.map(c => <span className="registry-coll-chip" key={c}>{c}</span>)}
                  <div dangerouslySetInnerHTML={{__html: item.description}}/>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
