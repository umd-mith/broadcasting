import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import React from "react"
import Nav from "./nav"

const Header = () => {
  return (
    <header>
      <div className="header-content">
        <Link aria-label="Broadcasting A/V data home page" to="/">
          <StaticImage src="../images/logo.png" alt="Broadcasting A/V Data:
          Using linked data and archival records to enhance discoverability for broadcasting collections"/>
        </Link>
        <Nav />
      </div>
    </header>
  )
}

export default Header
