import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Registry from "../components/registry"

import { EntityData } from "../templates/entity"

interface Props {
  data: {
    allEntitiesJson: {
      nodes: Partial<EntityData>[]
    }
  }
}

const Entities = ({ data }: Props) => {

  const maxLen = 250
  const items = data.allEntitiesJson.nodes.map((s: any) => {
    const desc = s.description || ''
    return {
      name: s.wikidataLabel,
      url: `/entity/${s.cpfPageID}/`,
      description: desc.length > maxLen ? desc.substring(0, maxLen) + '...' : desc,
      collections: s.collections
    }
  })

  return (
    <Layout title="Programs">
      <div id="entities" className="page-programs programs">
        <section>
          <h1>
            Browse Entities
          </h1>
          <article>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </article>
        </section>
        <section>
          <Registry name="entity name" items={items} />
        </section>
      </div>
    </Layout>
  )
}

export default Entities

export const query = graphql`
  query {
    allEntitiesJson(sort: {fields: wikidataLabel, order: ASC}) {
      nodes {
        wikidataLabel
        cpfPageID
        description
        collections
      }
    }
  }
`
