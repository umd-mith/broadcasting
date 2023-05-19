import React from "react"
import rehypeReact from "rehype-react"
import Layout from "../components/layout"
import "./home.css"
import unified from "unified"
import ReadMore from "../components/readmore"
import { StaticImage, GatsbyImage } from "gatsby-plugin-image"
import { graphql } from "gatsby"


export default function Home({data, pageContext}) {
  
  const processor = unified().use(rehypeReact, {
    createElement: React.createElement,
    components: {
      details: ReadMore
    }
  })

  const renderAst = (ast: any): JSX.Element => {
    return (processor.stringify(ast) as unknown) as JSX.Element
  }

  const exhibsBaseURL = "https://www.unlockingtheairwaves.org/exhibits/"

  return (
    <Layout title="home">
      <div className="page-home">
        <section className="site-intro">
          <h1 id="site-head">Broadcasting A/V Data</h1>
          <p>
          Using linked data and archival records to enhance discoverability for broadcasting collections
          </p>
        </section>
        <div className="below-the-fold">
          <section>
            {renderAst(pageContext.htmlAst)}
            <div className="documentation">
              <div>
                <StaticImage src="../images/github-mark.png" alt="GitHub logo"/>
                <h3><a href="https://github.com/umd-mith/broadcasting">GitHub Repository</a></h3>
              </div>
              <div>
                <StaticImage src="../images/tutorials.png" alt="Still from a video tutorial" />
                <h3><a href="https://vimeo.com/showcase/9765583">Video Tutorials</a></h3>
              </div>
              <div>
                <StaticImage src="../images/docs.png" alt="Screenshot of a documentation document" />
                <h3><a href="https://drive.google.com/drive/folders/1wR4qzQngN0f7q3os4YqIY_CFYFegoZQV">Workflow Documentation</a></h3>
              </div>
            </div>
          </section>
          <section>
            <h2>Exhibits</h2>
            <div className="exhibits-container">
              {pageContext.exhibs.map(exhib => {
                const imgData = data.allFile.nodes.filter(n => n.name + n.ext === exhib.image)[0]
                const img = imgData 
                  ? <GatsbyImage image={imgData.childImageSharp.gatsbyImageData} alt={exhib.imageDesc} />
                  : <img src={exhib.image} alt={exhib.imageDesc} />
                return (
                <div className="exhibit-summary-card">
                  <div className="exhibit-card-meta">
                    <a href={`${exhibsBaseURL}${exhib.slug}`}>
                      <h2>{exhib.title}</h2>
                    </a>
                    <p>{exhib.author}</p>
                  </div>
                  <div className="exhibit-image">
                    <a href="#">
                      {img}
                    </a>
                  </div>
                </div>
              )})}
              <div className="exhibit-summary-card">
                <div className="exhibit-card-meta">
                  <a href="#/">
                    <h2>See All Exhibits at Unlocking the Airwaves</h2>
                  </a>
                </div>
                <div className="exhibit-image">
                  <a href="#">
                    <StaticImage
                      src="../images/unlocking.png"
                      alt="Unlocking the Airwaves logo"
                    />
                  </a>
                </div>
              </div>
            </div>
          </section>
          <section>
            <h2>Contributors</h2>
            <div className="contribs">
              <div>
                <h3>Project Team</h3>
                <ul>
                  <li>Stephanie Sapienza (Principal Investigator, MITH)</li>
                  <li>Eric Hoyt (Principal Investigator, University of Wisconsin-Madison)</li>
                  <li>Emily Frazier (Graduate Research Assistant, MITH)</li>
                  <li>Raffaele Viglianti (Senior Research Software Developer, MITH)</li>
                  <li>Ben Pettis (University of Wisconsin-Madison)</li>
                  <li>Trevor Muñoz (Director, MITH)</li>
                  <li>Daniel Pitti (SNAC Director, University of Virginia)</li>
                  <li>Joseph Glass (SNAC Developer, University of Virginia)</li>
                  <li>Cat Phan (University of Wisconsin-Madison)</li>
                  <li>Steven Dast (University of Wisconsin-Madison)</li>
                  <li>Erik Moore (University of Minnesota)</li>
                  <li>Rebecca Toov (University of Minnesota)</li>
                  <li>Laura Schnitker (University of Maryland Libraries)</li>
                </ul>
              </div>
              <div>
                <h3>Exhibit Curators</h3>
                <ul>
                  <li>Christina Gibson, Towson University</li>
                  <li>Glenn Clatworthy, Independent Researcher</li>
                  <li>Jennifer Hyland Wang, University of Wisconsin-Madison</li>
                  <li>Bill Kirkpatrick, University of Winnipeg</li>
                  <li>Marit MacArthur, University of California, Davis</li>
                  <li>Allison Perlman, University of California, Irvine</li>
                  <li>Alexander Russo, The Catholic University of America</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query exhibQ {
    allFile(filter: {dir: {regex: "/images$/"}}) {
      nodes {
        name
        ext
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  }
`
