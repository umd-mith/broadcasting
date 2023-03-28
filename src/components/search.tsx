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
    <input
        className="search"
        type="text"
        value={query}
        onChange={e => set(e.target.value)}
        placeholder={placeholder}
        aria-label="Search"
      />
  )
}

export default Search
