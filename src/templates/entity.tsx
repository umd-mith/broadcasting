import React from "react"
import { graphql, Link } from "gatsby"
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image"
import "./entity.css"

import Layout from "../components/layout"

// ADD TYPING
const Entity = ({ data }: any) => {
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
      image = <GatsbyImage image={img} alt={entity.name} />
    }
  }

  if (entity.Description) {
    const readMore = entity.Wikipedia_URL ?  <em>Read more at <a href={entity.Wikipedia_URL}>Wikipedia</a>...</em> : ''
    abstract = (
      <p>
        {entity.Description}
        {readMore}
      </p>
    )
  }

  let birth = null
  if (entity.date_of_birth__P569_) {
    const t = new Date(entity.date_of_birth__P569_)
    birth = `${t.getUTCFullYear()}`
    if (entity.place_of_birth__P19_) {
      birth += `, ${entity.place_of_birth__P19_}`
    }
  }

  let death = null
  if (entity.date_of_death__P570_) {
    const t = new Date(entity.date_of_death__P570_)
    death = `${t.getUTCFullYear()}`
    if (entity.place_of_death__P20_) {
      death += `, ${entity.place_of_death__P20_}`
    }
  }

  let inception = null
  if (entity.inception__P571_) {
    const t = new Date(entity.inception__P571_)
    inception = `${t.getUTCFullYear()}`
  }

  return (
    <Layout title={entity.Wikidata_label}>
      <div className="page-cpf">
        <section>
          <h1>
            {entity.Wikidata_label}
          </h1>
          <div className="cpf">
            <div className="image">{image}</div>
            <div className="bio">
              <h2>{entity.Wikidata_label}</h2>
              {abstract}
              <p>
                <Field label="Born" value={birth} />
                <Field label="Died" value={death} />
                <Field label="Inception" value={inception} />
              </p>
              <p>
                {/* <Field label="Alternate Names" value={entity.altNames} /> */}
                <Field label="Occupation(s)" value={entity.occupation__P106_} />
                <Field
                  label="Field(s) of Work"
                  value={entity.field_of_work__P101_}
                />
                <Field label="Employer(s)" value={entity.employer__P108_} />
                {/* <Field label="Broadcast to" value={cpf.cpfPage.broadastTo} /> */}
                <Field label="Owned by" value={entity.owned_by__P127_} />
                <Field label="Website" value={entity.official_website__P856_} />
                <Field label="Associated Place(s)" value={entity.Associated_Places} />
                {/* <SubjectField subjects={cpf.cpfPage.subjects} /> */}
              </p>
              <p>
                <OptionalLink text="Social Networks and Archival Context (SNAC) Record" url={entity.SNAC_Ark_URLs} />
                <OptionalLink text="Library of Congress Name Authority File (LCNAF)" url={entity.LOC_URLs} />
                <OptionalLink text="Virtual International Authority File (VIAF)" url={entity.VIAF_URLs} />
                <OptionalLink text="WorldCat Record" url={entity.WorldCat_URLs} />
                <OptionalLink text="National Archives and Records Administration (NARA)" url={entity.NARA_URLs} />
              </p>
              {/* <div>
                {relatedEpisodes}
                {relatedDocuments}
              </div> */}
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

// const SubjectField = ({subjects}) => {
//   if (subjects) {
//     return(
//       <>
//         <span className="label">Associated Subject(s)</span>: &nbsp;
//         {subjects.map((s, i) => ( 
//           <span key={`subject-${s.title}`}>
//             {i > 0 && ", "}
//             <Link to={`/search/?f=subject:${s.title}`}>{s.title}</Link>
//           </span>
//         ))}
//       </> 
//     )
//   } else {
//     return ''
//   } 
// }

// const DocumentList = docs => {
//   if (docs.length === 0) {
//     return ""
//   }
//   return (
//     <div>
//       <h2>Related Documents</h2>
//       <ul>
//         {docs.map(d => (
//           <li key={d.id}>
//             <Link to={`/document/${d.iaId}/`}>{d.title}</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// const EpisodeList = (cpfId, episodes) => {
//   if (episodes.length === 0) {
//     return ""
//   }

//   // group episode information by series as a map keyed by the series id
//   // so that we can output a list of episodes grouped by the series they are a part of
//   const seriesMap = new Map()
//   for (const e of episodes) {
//     if (!seriesMap.has(e.series.id)) {
//       seriesMap.set(e.series.id, { title: e.series.title, episodes: [] })
//     }
//     seriesMap.get(e.series.id).episodes.push(e)
//   }
//   const seriesIds = Array.from(seriesMap.keys())

//   return (
//     <div>
//       <h2>Related Episodes</h2>
//       {seriesIds.map(seriesId => {
//         const series = seriesMap.get(seriesId)
//         return (
//           <div key={seriesId}>
//             <b>
//               <Link to={`/programs/${seriesId}/`}>{series.title}</Link>
//             </b>
//             <ul>
//               {series.episodes.map(e => {
//                 let role = ""
//                 for (const episode of episodes) {
//                   const cpfRoles = joinLists(
//                     episode.creator,
//                     episode.contributor
//                   )
//                   const cpfRole = cpfRoles.find(e => e.id === cpfId)
//                   if (cpfRole) {
//                     role = `(${cpfRole.role})`
//                   }
//                 }
//                 return (
//                   <li key={e.id}>
//                     <Link to={`/episode/${e.aapbId}/`}>{e.title}</Link> {role}
//                   </li>
//                 )
//               })}
//             </ul>
//             <br />
//           </div>
//         )
//       })}
//     </div>
//   )
// }

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
    return <><a href={url as string}>{text}</a><br /></>
  } else {
    return null
  } 
}

// function joinLists(a, b) {
//   if (!a) a = []
//   if (!b) b = []
//   return a.concat(b)
// }

export const query = graphql`
  query($id: String!) {
    entitiesJson(id: { eq: $id }) {
      id
      Wikidata_label
      date_of_birth__P569_
      date_of_death__P570_
      place_of_birth__P19_
      place_of_death__P20_
      Description
      employer__P108_
      field_of_work__P101_
      inception__P571_
      CPF_Pages_ID
      NARA_URLs
      occupation__P106_
      owned_by__P127_
      VIAF_URLs
      official_website__P856_
      Wikipedia_URL
      WorldCat_URLs
      SNAC_Ark_URLs
      Associated_Places
      LOC_URLs
    }
  }    
`

export default Entity
