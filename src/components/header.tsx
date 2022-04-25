import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import React from "react"
import Nav from "./nav"
import "./header.css"

const Header = () => {
  return (
    <header>
      <div className="header-content">
        <div className="gradient">
          <Link aria-label="Broadcasting A/V data home page" to="/">
            <StaticImage src="../images/logo.png" alt="Broadcasting A/V Data:
            Using linked data and archival records to enhance discoverability for broadcasting collections"
            width={1000}
            />
          </Link>
        </div>
        <Nav />
      </div>
    </header>
  )
}

export default Header
