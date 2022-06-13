/** @type {import('gatsby').GatsbyConfig} */
const path = require("path")
const basePath = '/broadcasting'

module.exports = {
  pathPrefix: basePath,
  siteMetadata: {
    title: "Broadcasting A/V Data",
    description:
      "Description.",
    author: `Maryland Institute for Technology in the Humanities`,
    siteUrl: `https://broadcasting.unlockingtheairwaves.org`,
    twitter: `https://twitter.com/umd_mith`,
    siteNav: [
      {
        name: "About",
        link: "/",
      },
      {
        name: "Entities",
        link: "/entities/",
      },
    ],
  },
  plugins: [
    "gatsby-plugin-image", 
    "gatsby-transformer-json",
    "gatsby-plugin-react-helmet", 
    "gatsby-plugin-sitemap", 
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp", {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "./src/images/"
      },
      __key: "images"
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              linkImagesToOriginal: false
            },
          },
        ]
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "pages",
        "path": "./src/pages/"
      },
      __key: "pages"
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "pages",
        "path": "./src/content/"
      },
      __key: "content"
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.resolve(__dirname, "static/data/"),
      },
      __key: "data"
    },]
};