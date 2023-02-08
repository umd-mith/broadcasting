import React, { useEffect, useRef } from "react"
import { graphql, useStaticQuery } from "gatsby"

import * as d3 from "d3"
import { SimulationNodeDatum, ZoomTransform } from "d3"

import "./viz.css"

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

const COLLS = ["NAEB", "KUOM", "WHA", "NFCB"]

interface Entity {
  collections: string[]
  bavdName: string
  kuomCount: number
  nfcbCount: number
  naebCount: number
  whaCount: number
  cpfPageID: string
  references: {
    URL: string
    title: string
  }[]
}

interface DataNode {
  id: string,
  group: string,
  collections: string[]
  r: number,
  pageId?: string,
  programs?: {
    URL: string
    title: string
  }[]
  pulse?: boolean
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
          references {
            URL
            title
          }
        }
      }
    }    
  `)

  const [show, setShow] = React.useState<string[]>(COLLS)

  // Set up nodes
  const collections = new Set<string>()
  const nodes: datum[] = entityData.allEntitiesJson.nodes.map((n: Entity) => {
    n.collections.map(c => collections.add(c))
    return {
      id: n.bavdName,
      group: "CPF",
      collections: n.collections,
      r: 10,
      pageId: n.cpfPageID,
      programs: n.references
    }
  })
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

      const d3el = d3.select(el)

      const tip = d3.select(tt)
  
      const showTip = (e: MouseEvent, d: datum, extra: string = "") => {

        tip.style("opacity", 1)
          .html(`<strong><a href="../entity/${d.pageId}">${d.id}</a></strong><br/><em>${d.collections.join(", ")}</em>${extra}`)
          .style("left", (e.pageX-25) + "px")
          .style("top", (e.pageY-100) + "px")
      }

      const hideTip = () => {
        tip.style("opacity", 0)
        circle
          .attr("stroke", "#000")
          .attr("stroke-width", 0.5)
      }

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
      d3el.call(d3.zoom()
          .extent([[0, 0], [width, height]])
          .scaleExtent([1, 3])
          .on("zoom", zoomed))

      function zoomed({transform}: {transform: ZoomTransform}) {
        d3.select(z).attr("transform", transform.toString())
      }

      function pulsate(selection: any) {
        const sel = selection as d3.Selection<SVGCircleElement, datum, SVGGElement, null>
        recursive_transitions()
    
        function recursive_transitions() {
          if (sel.data()[0].pulse) {
            sel.transition()
                .duration(400)
                .attr("r", 10)
                .transition()
                .duration(800)
                .attr("r", 15)
                .on("end", recursive_transitions)
          } else {
            // transition back to normal
            sel.transition()
                .duration(200)
                .attr("r", 10)
          }
        }
      }
    

      circle
        .on("mouseenter", function (e, d) {
          if (d3el.attr("data-selected") !== "true") {
            showTip(e, d)
          } else if (d3.select(this).classed("highlight")) {
            const relationNode = nodes.filter(n => n.pulse)[0]
            if (relationNode) {
              const related = d.programs?.filter(x => (relationNode?.programs || []).map(p => p.URL).indexOf(x.URL) > -1) || []
              // showTip(e, d, `<div><strong>Related programs:</strong><ul>${related.map(r => `<li><a href="${r.URL}">${r.title}</a></li>`).join("")}</ul></div>`)
              showTip(e, d, `<br/>${related.length} programs in common with ${relationNode.id}`)
            }
          }
        })
        .on("mouseout", () => {
          if (d3el.attr("data-selected") !== "true") {
            hideTip()
          }
        })
        .on("click", function (e: MouseEvent, d) {
          e.stopPropagation()
          d3el.attr("data-selected", "true")
          showTip(e, d)
          
          const el = d3.select(this)
          d.pulse = true
          pulsate(el)

          circle.each(function (c) {
            const circleEl = d3.select(this)
            if ((c.programs || []).filter(p => (d.programs || []).map(u => u.URL).includes(p.URL)).length === 0) {
              circleEl.attr("class", "noinfo")
            } else {
              circleEl.attr("class", "highlight")
            }
            if (c.id !== d.id) {
              c.pulse = false
            }
          })
            
        })
  
        d3el.selectChild()
          .on("click", () => {
            if (d3el.attr("data-selected")) {
              d3el.attr("data-selected", "false")
              hideTip()
            }
            circle.classed("noinfo", false)
            circle.classed("highlight", false)
            circle.each(d => d.pulse = false)
          })

    }
  
  }, [])


  useEffect(() => {
    const el = d3Ref.current
    if (el) {
      d3.select(el).selectAll("circle")
        .attr("fill", d => {
          // Uncomment the following code to highlight a specific node for debugging
          // if (d.id === "WHA (Radio station : Madison, Wis.)") {
          //   return "#03fcec"
          // }
          

          const cols = (d as DataNode).collections
          if (show.length === 1) {
            return cols.indexOf(show[0]) > -1 ? color(show[0]) : "#f2f2f2"
          }
          // Find link with highest strength
          const strongest = links.reduce((acc: ExpandedLink | null, l: Link | ExpandedLink) => {
            const link = l as ExpandedLink
            if (link.source.id === (d as DataNode).id && show.indexOf(link.target.id) !== -1) {
              if (acc) {
                if (acc.strength < link.strength) acc = link
              } else {
                acc = link
              }
            }
            return acc
          }, null)
          return cols.filter(x => show.indexOf(x) > -1).length > 0 ? color(strongest?.target.id || "") : "#f2f2f2"
        })
        .attr("fill-opacity", d => {
          const cols = (d as DataNode).collections
          if (cols.length === 1) {
            return "100%"
          }
          return cols.filter(x => show.indexOf(x) > -1).length > 0 ? "60%" : "100%"
        })
    }
  }, [show])

  const handleShownCollection = (coll: string) => {
    if (show.indexOf(coll) !== -1) {
      setShow(show.filter(c => c !== coll))
    } else {
      setShow([...show, coll])
    }
  }

  return (
    <div id="visualization" className="page-programs programs">
        <section>
          <h1>
            Visualization
          </h1>
          <article>
            <p>Use this visualization to explore the entities (people and organizations) connected to the NAEB, NFCB, WHA, and KUOM radio collections. Each entity is represented by one circle. Hover over a collection name in the legend to highlight the entities who contributed to programs in that collection. Entities are positioned according to the number of programs to which they contributed in each collection. Hover over a circle on the visualization to bring up the entity's name and connected collections, and click on the circle to open the associated landing page with biographical information and links to other content for that entity. Pan and zoom around the visualization using your mouse and scroll wheel.</p>
            <div className="Legend">
              {COLLS.map(C => (
                <span key={C}>
                  <input className={`FormCheckInput ${C}`} type="checkbox" value={C} checked={show.includes(C)} id={C} onChange={() => handleShownCollection(C)}/>
                  <label className="FormCheckLabel" htmlFor={C}>
                    {C}
                  </label>
                </span>
              ))
              }
            </div>
          </article>
        </section>
        <section className="Viz">
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