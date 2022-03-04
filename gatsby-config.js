/** @type {import('gatsby').GatsbyConfig} */
module.exports = {
  siteMetadata: {
    title: "Broadcasting A/V Data",
    description:
      "Description.",
    author: `Maryland Institute for Technology in the Humanities`,
    siteUrl: `https://broadcasting.unlockingtheairwaves.org`,
    twitter: `https://twitter.com/umd_mith`,
    siteNav: [
      {
        name: "Home",
        link: "/",
      },
      {
        name: "Entities",
        link: "/entities/",
      },
    ],
  },
  plugins: ["gatsby-plugin-image", "gatsby-plugin-react-helmet", "gatsby-plugin-sitemap", "gatsby-transformer-remark", "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages/"
    },
    __key: "pages"
  }]
};