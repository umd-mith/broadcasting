import React, { useEffect, useState, useRef } from "react"
import { graphql, useStaticQuery } from "gatsby"

import * as d3 from "d3"
import { D3ZoomEvent, SimulationNodeDatum, ZoomTransform } from "d3"

import './viz.css'

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
  kuomCount: number
  nfcbCount: number
  naebCount: number
  whaCount: number
  cpfPageID: string
}

interface DataNode {
  id: string,
  group: string,
  collections: string[]
  r: number,
  pageId?: string
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

interface Tooltip {
  x: number
  y: number
  text: string
}

// Component

const Viz = () => {
  const entityData = useStaticQuery(graphql`
    query entitiesforviz {
      allEntitiesJson {
        nodes {
          collections
          bavdName
          kuomCount
          nfcbCount
          naebCount
          whaCount
          cpfPageID
        }
      }
    }    
  `)

  const [show, setShow] = React.useState<string>("")
  const [tooltip, setTooltip] = React.useState<Tooltip | null>(null)

  // Set up nodes
  const collections = new Set<string>()
  const nodes: datum[] = entityData.allEntitiesJson.nodes.map((n: Entity) => {
    n.collections.map(c => collections.add(c))
    return {id: n.bavdName, group: "CPF", collections: n.collections, r: 10, pageId: n.cpfPageID}
  }) // Only considering the first coll for now.
  collections.forEach(c => nodes.push({id: c, group: "collection", collections: [c], r: 10}))

  // Set up links
  const links: Link[] = entityData.allEntitiesJson.nodes.reduce((acc: Link[], n: Entity) => {
    // Create a different link for every collCount > 0
    Object.keys(n).filter(k => k.endsWith("Count") && n[k as keyof Entity] > 0).map(k => {
      const link = {
        source: n.bavdName,
        target: k.replace("Count", "").toUpperCase(),
        strength: n[k as keyof Entity] as number
      }
      acc.push(link)
    })
    return acc
  }, [])

  const width = 1800
  const height = 1800

  const simulation = d3.forceSimulation(nodes)
      .alphaDecay(0.02)
      .force("link", d3.forceLink(links).id(d => (d as datum).id).distance(function(d) {return ((1 / d.strength) * 250)}).strength(1))
      .force("collide", d3.forceCollide().radius(d => {
        const datum = d as datum
        return datum.group === "collection" ? datum.r * 3 : datum.r + 1
      }).iterations(1))
      .force("charge", d3.forceManyBody().strength(-150))
      .force("x", d3.forceX(0.002))
      .force("y", d3.forceY(0.002))

  const svg = d3.create("svg")

  // const link = svg.append("g")
  //   .attr("stroke", "#8992A0")
  //   .attr("stroke-opacity", 0.5)
  //   .selectAll("line")
  //   .data(links)
  //   .join("line")
  //     .attr("stroke-width", 1)

  const node = svg.append("g")
    .attr("fill", "currentColor")
    .attr("stroke-linecap", "round")
    .attr("stroke-linejoin", "round")
    .selectAll("g")
    .data(nodes)
    .join("g")

  const circle = node.filter(d => d.group !== "collection").append("circle").lower()
    .attr("stroke", "#000")
    .attr("stroke-width", 0.5)
    .attr("fill", "#f2f2f2")
    .attr("r", d => d.r)
    .attr("class", d => d.collections.join(" "))
    .style("cursor", "pointer")


  const fulcrum = node.filter(d => d.group === "collection").append("text")
    .attr("text-anchor", "middle")
    .style("font-size", "20pt")
    .style("font-weight", "900")
    .style("paint-order", "stroke")
    .style("color", d => color(d.id))
    .attr("stroke", "#fff")
    .attr("stroke-width", 2)
    .text(d => d.id)

  // simulation.tick(200) // This doesn't to work well with the mouseover selection

  const d3Ref = useRef<HTMLDivElement>(null)
  const d3ZoomRef = useRef<SVGGElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = d3Ref.current
    const z = d3ZoomRef.current
    const tt = tooltipRef.current
    if (el && z && tt) {
      while(z.firstChild){
        z.removeChild(z.firstChild)
      }
      simulation.on("tick", () => {
        // link
        // .attr("x1", (d: unknown) => (d as ExpandedLink).source.x?.toString() || "")
        // .attr("y1", (d: unknown) => (d as ExpandedLink).source.y?.toString() || "")
        // .attr("x2", (d: unknown) => (d as ExpandedLink).target.x?.toString() || "")
        // .attr("y2", (d: unknown) => (d as ExpandedLink).target.y?.toString() || "")
    
        circle
          .attr("cx", d => d.x || "")
          .attr("cy", d => d.y || "")
    
        fulcrum
            .attr("x", d => d.x || "")
            .attr("y", d => d.y || "")
      })
      const rawSvg = svg.node()
      if (rawSvg) {
        for (const child of Array.from(rawSvg.children)) {
          z.append(child)
        }
      }

      // Zoom (ignoring d3 typescript)
      // @ts-ignore
      d3.select(el).call(d3.zoom()
          .extent([[0, 0], [width, height]])
          .scaleExtent([1, 3])
          .on("zoom", zoomed))

      function zoomed({transform}: {transform: ZoomTransform}) {
        d3.select(z).attr("transform", transform.toString())
      }

      const tip = d3.select(tt)

      circle
        .on('mouseover', (e, d) => {
          tip.style("opacity", 1)
            .html(`<strong>${d.id}</strong><br/>${d.collections.join(", ")}`)
            .style("left", (e.pageX-25) + "px")
            .style("top", (e.pageY-75) + "px")
        })
        .on('mouseout', () => {
          tip.style("opacity", 0)
        })
        .on('click', (e, d) => {
          if (d.pageId) {
            location.href = `../entity/${d.pageId}`
          }
        })

    }
  
  }, [])

  useEffect(() => {
    const el = d3Ref.current
    if (el && show) {
      d3.select(el).selectAll("circle")
        .attr("fill", d => {
          // Uncomment the following code to highlight a specific node for debugging
          // if (d.id === "WHA (Radio station : Madison, Wis.)") {
          //   return "#03fcec"
          // }
          return (d as DataNode).collections.indexOf(show) !== -1 ? color(show) : "#f2f2f2"
        })
    }
  }, [show])

  const tooltipEl = tooltip ? <div style={{position:"fixed", top: tooltip.y, left: tooltip.x}}>{tooltip.text}</div> : null

  return (
    <div id="visualization" className="page-programs programs">
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
          {tooltipEl}
          <div ref={d3Ref}>
            <svg viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`} style={{cursor: "grab"}}> 
              <g ref={d3ZoomRef}/>
            </svg>
            <div ref={tooltipRef} className="Tooltip" />
          </div>
        </section>
      </div>
  )
}

export default Viz