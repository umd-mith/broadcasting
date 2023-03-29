import React from "react"
import "./search.css"

interface Props {
  query: string
  set: React.Dispatch<React.SetStateAction<string>>
  placeholder: string
}

export const isSearchMatch = (query: string, string: string): boolean => {
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  if (string.match(new RegExp(escaped, "i"))) return true
  return false
}

const Search = ({query, set, placeholder}: Props) => {
  return (
    <div className="search">
      <input
          className="search-bar"
          type="text"
          value={query}
          onChange={e => set(e.target.value)}
          placeholder={placeholder}
          aria-label="Search"
          />
      <span className="search-clear" onClick={() => set("")}>
        <svg className="search-clear-icon" viewBox="10 10 30 30">
          <path fillRule="evenodd" d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z" clipRule="evenodd"/>
        </svg>
      </span>
    </div>
  )
}

export default Search
