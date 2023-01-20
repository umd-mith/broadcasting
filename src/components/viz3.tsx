import React, { useEffect, useState, useRef } from "react"
import { graphql, useStaticQuery } from "gatsby"

import * as d3 from "d3"
import { D3DragEvent, Simulation, SimulationLinkDatum, SimulationNodeDatum } from "d3"

/* *********************************
* FIND AND FIX TYPING!! LOOK FOR : any *
************************************/
function color(d: string) {
  switch (d) {
    case "NAEB":
      return "#006847" // green
    case "KUOM":
      return "#FFD700" // gold
    case "WHA":
      return "#003884" // blue
    case "NFCB":
      return "#840a00" // red
    default:
      return "#2d2d2d"
  }
}

interface Entity {
  collections: string[]
  bavdName: string
  references: {
    collection: string
  }[]
}

interface DataNode {
  id: string,
  group: string,
  collections: string[]
}

interface Link {
  source: string
  target: string
  strength: number
}

type datum = SimulationNodeDatum & DataNode

interface ExpandedLink {
  index: number
  source: datum
  strength: number
  target: datum
}

// Component

const Viz = () => {
  const entityData = useStaticQuery(graphql`
    query entitiesforviz3 {
      allEntitiesJson {
        nodes {
          collections
          bavdName
          references {
            collection
          }
        }
      }
    }
  `)

const [show, setShow] = React.useState<string>("")

  // Set up nodes
  const collections = new Set<string>()
  const nodes: datum[] = entityData.allEntitiesJson.nodes.map((n: Entity) => {
    n.collections.map(c => collections.add(c))
    return {id: n.bavdName, group: "CPF", collections: n.collections}
  }) // Only considering the first coll for now.
  collections.forEach(c => nodes.push({id: c, group: "collection", collections: [c]}))

  // Set up links
  const links: Link[] = entityData.allEntitiesJson.nodes.reduce((acc: Link[], n: Entity) => {
    const colls : {[key: string] : number} = {}
    for (const r of n.references) {
      colls[r.collection] ? colls[r.collection]++ : colls[r.collection] = 1
    }
    for (const coll of Object.keys(colls)) {
      const link = {
        source: n.bavdName,
        target: coll,
        strength: colls[coll]
      }
      acc.push(link)
    }
    return acc
  }, [])

  const nodeTitle = (d: DataNode) => d.id
  const T = nodeTitle == null ? null : d3.map(nodes, nodeTitle)

  const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => (d as datum).id).distance(function(d) {return ((1 / d.strength) * 200)}).strength(1))
      .force("charge", d3.forceManyBody().strength(-100))
      .force("x", d3.forceX())
      .force("y", d3.forceY())

  const width = 2000
  const height = 2000

  const svg = d3.create("svg")

  const link = svg.append("g")
    .attr("stroke", "#8992A0")
    .attr("stroke-opacity", 0.5)
    .selectAll("line")
    .data(links)
    .join("line")
      .attr("stroke-width", 1)

  const node = svg.append("g")
    .attr("fill", "currentColor")
    .attr("stroke-linecap", "round")
    .attr("stroke-linejoin", "round")
    .selectAll("g")
    .data(nodes)
    .join("g")
    // .call(drag(simulation))

  // const labels = node.append("g")
  if (T) node.append("title").text((d: datum) => {
    if (d.index === undefined) return ""
    return T[d.index]
  })

  //  const label = labels.append("text")
  //      .attr("x", 8)
  //      .attr("y", "0.31em")
  //      .attr("dy", "-0.5em")
  //      .attr("text-anchor", "middle")
  //      .text(d => d.id)
    
  //  const labelOutline = label.clone(true).lower()
  //      .attr("aria-hidden", "true")
  //      .attr("fill", "none")
  //      .attr("stroke", "white")
  //      .attr("stroke-width", 3)

  const circle = node.append("circle").lower()
    .attr("stroke", "#fff")
    .attr("stroke-width", 0.5)
    .attr("r", 5)
    .attr("class", d => d.collections.join(" "))

  // simulation.tick(200)
  // There must be a better way to handle types...
  

  const d3Ref = useRef<HTMLDivElement>(null)
  const d3ZoomRef = useRef<SVGGElement>(null)

  const [k, setK] = useState(1)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  useEffect(() => {
    const el = d3Ref.current
    const z = d3ZoomRef.current
    if (el && z) {
      while(z.firstChild){
        z.removeChild(z.firstChild)
      }
      simulation.on("tick", () => {
        link
        .attr("x1", (d: unknown) => (d as ExpandedLink).source.x?.toString() || "")
        .attr("y1", (d: unknown) => (d as ExpandedLink).source.y?.toString() || "")
        .attr("x2", (d: unknown) => (d as ExpandedLink).target.x?.toString() || "")
        .attr("y2", (d: unknown) => (d as ExpandedLink).target.y?.toString() || "")
    
        circle
          .attr("cx", d => d.x || "")
          .attr("cy", d => d.y || "")
    
    //    label
    //        .attr("x", d => d.x)
    //        .attr("y", d => d.y);
      
    //    labelOutline
    //        .attr("x", d => d.x)
    //        .attr("y", d => d.y);
      })
      const rawSvg = svg.node()
      if (rawSvg) {
        for (const child of Array.from(rawSvg.children)) {
          z.append(child)
        }
      }

      const zoom = d3.zoom().on("zoom", (event) => {
        const { x, y, k } = event.transform
        setK(k)
        setX(x)
        setY(y)
      })
      // d3.select(el).call(zoom)

    }
  
  }, [])

  useEffect(() => {
    const el = d3Ref.current
    if (el && show) {
      d3.select(el).selectAll("circle")
        .attr("fill", (d) => {
          return d.collections.indexOf(show) !== -1 ? color(show) : "#2d2d2d"
        })
    }
  }, [show])

  return (
    <div id="entities" className="page-programs programs entities">
        <section>
          <h1>
            Visualization
          </h1>
          <article>
            <p>Introduction and info.</p>
            <div onMouseOver={() => setShow("NAEB")}>
              <span style={{width: "10px", height: "10px", backgroundColor: "#006847", display: "inline-block"}}></span> NAEB
            </div>
            <div onMouseOver={() => setShow("KUOM")}>
              <span style={{width: "10px", height: "10px", backgroundColor: "#FFD700", display: "inline-block"}}></span> KUOM
            </div>
            <div onMouseOver={() => setShow("WHA")}>
              <span style={{width: "10px", height: "10px", backgroundColor: "#003884", display: "inline-block"}}></span> WHA
            </div>
            <div onMouseOver={() => setShow("NFCB")}>
              <span style={{width: "10px", height: "10px", backgroundColor: "#840a00", display: "inline-block"}}></span> NFCB
            </div>
          </article>
        </section>
        <section>          
          {/* 
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .style("font", "5px sans-serif") */}
          <div ref={d3Ref}>
            <svg viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}> 
              <g transform={`translate(${x},${y})scale(${k})`} ref={d3ZoomRef}/>
            </svg>
          </div>
        </section>
      </div>
  )
}

export default Viz