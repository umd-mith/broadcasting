import { Link } from "gatsby"
import React from "react"
import Nav from "./nav"

const Header = () => {
  return (
    <header>
      <div className="header-content">
        <Link aria-label="Broadcasting A/V data home page" to="/">
          LOGO
        </Link>
        <Nav />
      </div>
    </header>
  )
}

export default Header
