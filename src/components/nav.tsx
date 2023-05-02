import { Link, useStaticQuery, graphql } from "gatsby"
import React, { useState } from 'react';

import './nav.css'

type NavLink = {
    name: string
    link: string
}

const Nav = () => {
    const navData = useStaticQuery(graphql`
        {
            site {
                siteMetadata {
                    siteNav {
                    name
                    link
                    }
                }
            }
        }
    `)
    
    const [hidden, setHidden] = useState(true);

    const toggleMenu = () => {
        setHidden(prevState => !prevState)
    }
    
    return(
        <div className="main-nav-container">
            <button 
                className="header-menu-button" 
                type="button" 
                onClick={toggleMenu}>
                    Menu
            </button>
            <nav className="main-nav">
                <ul id="main-nav-menu" className={hidden ? 'menu': 'menu menu-open'}>
                    <li><a href="https://unlockingtheairwaves.org/">&lt; Back to Airwaves</a></li>
                    {navData.site.siteMetadata.siteNav.map((link: NavLink) => (
                        <li key={link.name}>
                            <Link activeClassName="active" to={link.link}>{link.name}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default Nav