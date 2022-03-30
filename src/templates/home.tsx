import React from "react"
import rehypeReact from "rehype-react"
import Layout from "../components/layout"
import "./home.css"
import unified from "unified"

const ReadMore = ({children}) => {
  const [open, setOpen] = React.useState(false)
  const toggle = (e) => {
    e.preventDefault()
    setOpen(!open)
  }
  return <div>
    <a href="#" onClick={(e) => toggle(e)}>Read more...</a>
    <div className={open ? '' : 'hidden'}>
      {children}
    </div>
  </div>
}

const Home = ({pageContext}) => {
  
  const processor = unified().use(rehypeReact, {
    createElement: React.createElement,
    components: {
      details: ReadMore
    }
  })

  const renderAst = (ast: any): JSX.Element => {
    return (processor.stringify(ast) as unknown) as JSX.Element
  }

  return (
    <Layout title="home">
      <div className="page-home">
        <section className="site-intro">
          <h1 id="site-head">Broadcasting A/V Data</h1>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          </p>
        </section>
        <div className="below-the-fold">
          <section>
            {renderAst(pageContext.htmlAst)}
          </section>
        </div>
      </div>
    </Layout>
  )
}

export default Home
