import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Registry from "../components/registry"
import ReadMore from "../components/readmore"

import { EntityData } from "../templates/entity"

import "./entities.css"

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
    const description = s.description || s.expandedBlurb || ''
    return {
      name: s.bavdName,
      url: `/entity/${s.cpfPageID}/`,
      // description: desc.length > maxLen ? desc.substring(0, maxLen) + '...' : desc,
      description,
      collections: s.collections
    }
  })

  return (
    <Layout title="Programs">
      <div id="entities" className="page-programs programs entities">
        <section>
          <h1>
            Browse Entities (People &amp; Organizations)
          </h1>
          <article>
            <p><strong>entity</strong> (noun): The corporate bodies, persons, or families associated in some way with the creation, accumulation, maintenance, and/or use of archival materials (Society of American Archivists. <em><strong><a href="https://perma.cc/6YFC-64DD">Describing Archives: A Content Standard.</a></strong></em> Chicago: Society of American Archivists, 2004). </p>
            <p>Listed below are all the entities (people and organizations) that were either a) involved in the creation of, b) a subject of, or c) a guest appearing in, the programs 
              in the four <em>Broadcasting A/V Data</em> educational radio collections. These include: </p>
            <ul>
              <li>The National Association of Educational Broadcasters collections at UMD Libraries (NAEB); </li>
              <li>The National Federation of Community Broadcasters collections at UMD Libraries (NFCB); </li>
              <li>The Wisconsin Public Radio collections at University of Wisconsin-Madison Libraries (WHA); and </li>
              <li>The WLB/KUOM collections at University of Minnesota Libraries (WLB/KUOM). </li>
            </ul>

            <p>Click on an entity’s name to go to their landing page with brief biographical information from Wikidata, Wikipedia, and the Social Networks &amp; Archival Context (SNAC) database, as well as links to associated programs and/or documents in the respective portal for each collection. Use the alphabetical index to jump to a particular letter, or the search bar to look for specific names or keywords from the entities' descriptions. Click 'Read More' for more information on way we curated this index of names, and how to use this page.</p>

            <ReadMore>
              <>
                <p> The index below consists of entities which meet our selection criteria:</p>
                  <ul>
                    <li>Entities that overlap more than one of the four collections, or</li>
                    <li>Entities which are represented frequently enough in any one collection that they are considered important to the history of educational radio, regardless of overlap between the four collections.</li>
                  </ul>

                <p>This index page is similar to the <a href="https://www.unlockingtheairwaves.org/people/">People</a> and <a href="https://www.unlockingtheairwaves.org/organizations/">Organizations</a>
                  index pages on the <em>Airwaves</em> site. As such, they are only browsable, and not searchable. This approach is by design, because BA/VD’s research 
                  question address the question of <em>exploring collections through a network-centric lens, as opposed to a content-centric lens</em>. However, you can use the toggles in the navigation bar above to limit your view of the entity index by either:</p>
                <ul>
                  <li>Displaying entities from one or more specific collection(s);</li>
                  <li>Hiding entities which solely exist in one collection (select the ‘Hide Single Collection Entities’ button).</li>
                </ul>            
                <p>Each entity has a unique ID that comes from the Wikidata knowledge base, which begins with the letter 'Q' in the URL of each landing page. This identifier can also be used to locate the organization's record on Wikidata, which contains links to other references to the person across the web (Library of Congress, VIAF, and more).</p>
              </>
            </ReadMore>
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
    allEntitiesJson(sort: {fields: bavdName, order: ASC}) {
      nodes {
        bavdName
        wikidataLabel
        cpfPageID
        expandedBlurb
        collections
        description
      }
    }
  }
`
