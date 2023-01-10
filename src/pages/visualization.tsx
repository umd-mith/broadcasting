import React from "react"
import Loadable from "@loadable/component"
import Layout from "../components/layout"


const LoadableViz = Loadable(() => import("../components/viz"))

const Viz = () => {
  return (
    <Layout title="Visualization">
      <LoadableViz/>
    </Layout>
  )
}

export default  Viz