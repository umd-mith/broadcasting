import React from "react"
import { graphql, Link } from "gatsby"
import { StaticImage, GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image"
import { FaExternalLinkAlt } from "react-icons/fa"
import "./entity.css"

import Layout from "../components/layout"

import { radiomap } from "../utils/labels"

interface Reference {
  collection: string
  series: string[]
  title: string
  URL: string
}

export interface EntityData {
  id: string
  wikidataLabel: string
  bavdName: string
  altLabels: string[]
  birthDate: string
  deathDate: string
  birthPlace: string
  deathPlace: string
  wikidataDescription: string
  description: string
  employer: string[]
  fieldOfWork: string[]
  inceptionDate: string
  cpfPageID: string
  naraURL: string[]
  occupation: string[]
  viafURL: string[]
  wikipediaURL: string
  worldCatURL: string[]
  snacURL: string[]
  associatedPlaces: string[]
  locURL: string[]
  collections: string[]
  image: ImageDataLike
  references: Reference[]
}

interface Props {
  data: {
    entitiesJson: EntityData
  }
}

const Arrow = (props: any) => <svg {...props} viewBox="0 0 24 24"><path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path></svg>

const Accordion = ({title, children}: {title: JSX.Element, children: JSX.Element | JSX.Element[]}) => {
  const [expanded, setExpanded] = React.useState(false)
  const arrow = expanded ? <Arrow className="arrow expanded"/> : <Arrow className="arrow"/>

  const accRef = React.useRef<HTMLDivElement>(null)

  const handleExpand = () => {
    const el = accRef.current
    
    if (el) {
      const handler = function() {
        el.style.removeProperty('--max-height')
        el.removeEventListener("transitionend", handler)
      }
      if (!expanded) {
        const height = el.scrollHeight
        el.style.setProperty('--max-height', height + 'px')
        el.addEventListener("transitionend", handler, false)
      } else {
        // TODO: figure out animation on collapse
      }
    }
    setExpanded(!expanded)
  }

  return (<div className="reference">
    <h4 onClick={handleExpand}>{arrow} <span>{title}</span></h4>
    <div className={`accordion ${expanded ? 'expanded' : ''}`} ref={accRef}>
      {children}
    </div>
  </div>)
}

const CollReference = ({coll, reference}: {coll: string, reference: {[key: string]: Partial<Reference>[]}}) => {
  const total = Object.keys(reference).reduce((tot, s) => {tot += reference[s].length; return tot}, 0)
  let keys = Object.keys(reference).sort()
  if (keys.indexOf("None") > -1) {
    keys = ["None", ...keys.filter(k => k !== "None")]
  }
  
  const label = radiomap[coll]
  const labelfull = `${label.full} (${label.altshort || coll})`
  return <Accordion title={<span>{labelfull} <span className="registry-coll-chip">{total}</span></span>}>
    {
      keys.map(series => {

        const total = reference[series].length

        const info = <ul>{
          reference[series].sort((a, b) => {
            const at = a.title || ""
            const bt = b.title || ""
            return at.trim() > bt.trim() ? 1 : -1
          }).map(url => (
            <li key={url.URL || ""}>{<>
              <a href={url.URL}>{url.title}</a>
              <a className="newtab" href={url.URL} target="_blank" rel="noopener noreferrer">
                <FaExternalLinkAlt title="Open in new tab" />
              </a>
            </>}</li>
          ))
        }</ul>
        
        return (
          <div key={series}>
            {series !== "None" 
            ? <Accordion title={<span>{series !== "None" ? series : ""} <span className="registry-coll-chip">{total}</span></span>}>
              {info}
            </Accordion> 
            : info}
          </div>
      )})
    }
  </Accordion>
}

const References = ({references}: {references: Reference[]}) => {

  // Group by series
  const bySeries = references.reduce((acc: {[key: string]: Partial<Reference>[]}, x: Reference) => {
    for (const s of x.series) {
      (acc[s] = acc[s] || []).push({'collection': x.collection, 'title': x.title, 'URL': x.URL})
    }
    return acc
  }, {})

  const grouped: {[key: string]: {[key: string]: Partial<Reference>[]}} = {}

  for (const series of Object.keys(bySeries)) {
    for (const url of bySeries[series]) {
      const coll = url.collection || ""
      grouped[coll] = grouped[coll] || {};
      (grouped[coll][series] = grouped[coll][series] || []).push(url)
    }
  }

  return <>{Object.keys(grouped).sort().map(coll => (
    <CollReference coll={coll} reference={grouped[coll]} key={coll}/>
  ))}</>
}

const Entity = ({ data }: Props) => {
  const entity = data.entitiesJson

  let image = (
    <StaticImage
      src="../images/missing-person.png"
      width={300}
      alt="Unknown Image"
    />
  )

  let abstract: JSX.Element | undefined

  if (entity.image) {
    const img = getImage(entity.image)
    if (img) {
      image = <GatsbyImage image={img} alt={entity.wikidataLabel} />
    }
  }

  if (entity.description) {
    const readMore = entity.wikipediaURL ?  <em>Read more at <a href={entity.wikipediaURL}>Wikipedia</a>...</em> : ''
    abstract = (
      <p>
        {entity.description}
        {readMore}
      </p>
    )
  }

  let birth = null
  if (entity.birthDate) {
    const t = new Date(entity.birthDate)
    birth = `${t.getUTCFullYear()}`
    if (entity.birthPlace) {
      birth += `, ${entity.birthPlace}`
    }
  }

  let death = null
  if (entity.deathDate) {
    const t = new Date(entity.deathDate)
    death = `${t.getUTCFullYear()}`
    if (entity.deathPlace) {
      death += `, ${entity.deathPlace}`
    }
  }

  let inception = null
  if (entity.inceptionDate) {
    const t = new Date(entity.inceptionDate)
    inception = `${t.getUTCFullYear()}`
  }

  return (
    <Layout title={entity.wikidataLabel}>
      <div className="page-cpf">
        <section>
          <h1>
            <span>Entity | </span>{entity.wikidataLabel}
          </h1>
          <div className="cpf">
            <div className="image">{image}</div>
            <div className="bio">
              {abstract}
              <p>
                <Field label="Born" value={birth} />
                <Field label="Died" value={death} />
                <Field label="Inception" value={inception} />
              </p>
              <p>
                <Field label="Alternate Names" value={entity.altLabels} />
                <Field label="Occupation(s)" value={entity.occupation} />
                <Field
                  label="Field(s) of Work"
                  value={entity.fieldOfWork}
                />
                <Field label="Employer(s)" value={entity.employer} />
                <Field label="Associated Place(s)" value={entity.associatedPlaces} />
              </p>
              <div>
                <OptionalLink text="Social Networks and Archival Context (SNAC) Record" url={entity.snacURL} />
                <OptionalLink text="Library of Congress Name Authority File (LCNAF)" url={entity.locURL} />
                <OptionalLink text="Virtual International Authority File (VIAF)" url={entity.viafURL} />
                <OptionalLink text="WorldCat Record" url={entity.worldCatURL} />
                <OptionalLink text="National Archives and Records Administration (NARA)" url={entity.naraURL} />
              </div>
              <div className="references">
                <h3>Appears in:</h3>
                <References references={entity.references} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

type FieldProps = {
  label: string
  value?: string[] | string | null
}

const Field = ({ label, value }: FieldProps): JSX.Element | null => {
  if (value === undefined || value === null || value.length === 0) {
    return null
  }

  if (typeof value === "string") {
    value = [value]
  }

  if (value[0].match(/^https?:/)) {
    return (
      <>
        <span className="label">{label}</span>: &nbsp;
        {value.map((v: string) => (
          <span>
            <Link to={v}>{v}</Link>&nbsp;
          </span>
        ))}
        <br />
      </>
    )
  }

  return (
    <>
      <span className="label">{label}</span>: {value.join(", ")} <br />
    </>
  )
}

const OptionalLink = ({text, url}: {text: string, url: string[] | string}): JSX.Element | null => {
  if (Array.isArray(url) && url.length > 1) {
    return (
      <>
        {url.map((u, i) => (
          <div key={`url-${u}`}><a href={u}>{text} {i + 1}</a></div>
        ))}
      </>
    )
  } else if (url) {
    return <><a href={url as string}>{text}</a>
    <a className="newtab" href={url as string} target="_blank" rel="noopener noreferrer">
      <FaExternalLinkAlt title="Open in new tab" />
    </a><br /></>
  } else {
    return null
  } 
}

export const query = graphql`
  query($id: String!) {
    entitiesJson(id: { eq: $id }) {
      id
      wikidataLabel
      altLabels
      birthDate
      deathDate
      birthPlace
      deathPlace
      description
      wikidataDescription
      employer
      fieldOfWork
      inceptionDate
      cpfPageID
      naraURL
      occupation
      viafURL
      wikipediaURL
      worldCatURL
      snacURL
      associatedPlaces
      locURL
      collections
      image {
        childImageSharp {
          gatsbyImageData
        }
      }
      references {
        collection,
        series,
        title,
        URL
      }
    }
  }    
`

export default Entity
