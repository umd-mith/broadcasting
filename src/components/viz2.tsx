import React, { useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"

import * as d3 from "d3"
import { D3DragEvent, Simulation, SimulationLinkDatum, SimulationNodeDatum } from "d3"
import { FaExternalLinkSquareAlt } from "react-icons/fa"
import { linkSync } from "fs"

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

// Component

const Viz = () => {
  const entityData = useStaticQuery(graphql`
    query entitiesforviz2 {
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

  const nodes = entityData.allEntitiesJson.nodes
  const links = entityData.allEntitiesJson.nodes

  const targets = links.flatMap(({bavdName,references}:{bavdName:any, references:any}) => references.map((collection:any) => ({source: bavdName, target: collection})))

  const counttargets = Object.values(targets.reduce( (acc, i) => {
    var key = JSON.stringify(i)
    return {
      ...acc,
      [key]: {...i, count: (acc[key]?.count || 0) + 1}
    }
   },{}));

  const [multiPlace, setMultiPlace] = React.useState<boolean>(false)
  const [show, setShow] = React.useState<string>("")

  const d3Ref = React.useRef<HTMLDivElement>(null)
  const width = 1000
  const height = 1000
  const scaleFactor = 1

  const flattened: string[] = []
  //const groupIds = flattened.concat.apply([], nodes.map((n: any) => n.collections)) // flatten groups
  //  .filter((v, i, s) => s.indexOf(v) === i) // remove duplicates
  //  .map(groupId => {
  //    return {
  //      groupId,
  //      count: nodes.filter((n: any) => n.collections.indexOf(groupId) > -1).length
  //    }
  //  })
  //  .filter(g => g.count > 2)
  //  .map(g => g.groupId)

  //  const polygonGenerator = (groupId: string) => {
  //    const node_coords: [number, number][] = node
  //      .filter(function(d: any) { return d.collections.indexOf(groupId) > -1 })
  //      .data()
  //      .map(function(d: any) { return [d.x +25, d.y  +25] })
        
  //    return d3.polygonHull(node_coords)
  //  }
  
    const valueline = d3.line()
      .x((d) => d[0] )
      .y((d) => d[1] )
      .curve(d3.curveCatmullRomClosed)

  //  function updateGroups(groupIds: string[]) {
  //    groupIds.forEach(function(groupId: string) {
  //      let centroid = [0, 0]
  //      const path = paths.filter((d) => d == groupId)
  //        .attr('transform', 'scale(1) translate(0,0)')
  //        .attr('d', (d) => {
  //          const polygon = polygonGenerator(d) as [number, number][]
  //          centroid = d3.polygonCentroid(polygon)
  
            // to scale the shape properly around its points:
            // move the 'g' element to the centroid point, translate
            // all the path around the center of the 'g' and then
            // we can scale the 'g' element properly
  //          return valueline(
  //            polygon.map(function(point) {
  //              return [  point[0] - centroid[0], point[1] - centroid[1] ]
  //            })
  //          )
  //        })
  
  //      const pathNode = path.node() as SVGPathElement
  
  //      d3.select(pathNode.parentNode as HTMLElement).attr('transform', 'translate('  + centroid[0] + ',' + (centroid[1]) + ') scale(' + scaleFactor + ')')
  //    })
  //  }

    const drag = (simulation: Simulation<SimulationNodeDatum, SimulationLinkDatum<SimulationNodeDatum>>) => {
  
      function dragstarted(event: D3DragEvent<SVGImageElement, SimulationNodeDatum, {fx: number, fy: number, x: number, y: number}>) {
        // setTooltip(null)
        if (!event.active) simulation.alphaTarget(0.3).restart()
        event.subject.fx = event.subject.x
        event.subject.fy = event.subject.y
      }
      
      function dragged(event: D3DragEvent<SVGImageElement, SimulationNodeDatum, {fx: number, fy: number, x: number, y: number}>) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }
      
      function dragended(event: D3DragEvent<SVGImageElement, SimulationNodeDatum, {fx: number | null, fy: number | null}>) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }
      
      // any: for some reason can't use SVGImageElement even though request type is BaseType | SVGImageElement
      return d3.drag<any, unknown, SVGGElement>() 
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended);
    }

     /*
    "NAEB"
    1
    : 
    "KUOM"
    2
    : 
    "WHA"
    3
    : 
    "NFCB"
    */

  // const groupPositionsX = (d: SimulationNodeDatum, groupIds: string[]) => {
  //   const entity = nodes[d.index as number]
  //   if (entity.collections.length === groupIds.length) {
  //     return width/2
  //   } else if (entity.collections.length === 1) {
  //     if (entity.collections[0] === groupIds[0] || entity.collections[0] === groupIds[3]) {
  //       return -width
  //     }
  //   } else if (entity.collections.length === 2) {
  //     return width / 4
  //   } else if (entity.collections.length === 3) {
  //     return width / 3
  //   }
  //   return width
  // }

  // const groupPositionsY = (d: SimulationNodeDatum, groupIds: string[]) => {
  //   const entity = nodes[d.index as number]
  //   if (entity.collections.length === groupIds.length) {
  //     return height/2
  //   } else if (entity.collections.indexOf("NAEB") > -1) {
  //     return -height
  //   } else if (entity.collections.indexOf("KUOM") > -1) {
  //     return -height
  //   } else if (entity.collections.indexOf("WHA") > -1) {
  //     return height/2
  //   } else if (entity.collections.indexOf("NFCB") > -1) {
  //     return height/2
  //   }
  //   return height
  // }

  // const simulation = d3.forceSimulation(nodes)
  //    .force("link", d3.forceLink(links).id(d => {
  //      // This type casting is awkward and likely should be handled by extending SimulationNodeDatum
  //      const l = d; return l.id
  //    }).distance((d) => {
  //      const groupsFactor = nodes.filter((n) => n.id === links[d.index].target)[0].groups.length + 1
  //      return 100 / groupsFactor
  //    }))
  //   .force("charge", d3.forceManyBody())
  //   .force("collisionForce", d3.forceCollide(25))
  //   // .force("yPosition", d3.forceY((d) => groupPositionsY(d, groupIds)))
  //   // .force("xPosition", d3.forceX((d) => groupPositionsX(d, groupIds)))
  //   .force("center", d3.forceCenter(width*3, height))
  //   .stop()

  const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(counttargets).id(d => d.id).distance(function(d) {return ((1 / d.count) * 200)}).strength(1))
    .force("charge", d3.forceManyBody().strength(-500))
    .force("x", d3.forceX())
    .force("y", d3.forceY())
    .force("center", d3.forceCenter(width*3, height))

  const svg = d3.create("svg")
    .attr("viewBox", `0 0 ${width*6} ${height*6}`)

  const groups = svg.append('g').attr('style', 'fill-opacity: .1; stroke-opacity: 1;')

  console.log(show)
  const node = svg.append("g")
    .selectAll("circle")
    .data(nodes)
    .join("circle")
      .attr("fill", (d) => d.collections.indexOf(show) !== -1 ? color(show) : "#2d2d2d")
      .attr("stroke", "#2d2d2d")
      .attr("stroke-opacity", 1)
      .attr("stroke-width", 1.5)
      .attr("r", 20)
      .attr("class", d => d.collections.join(' '))
      // .call(drag(simulation))

  const link = svg.append("g")
    .attr("stroke", "#8992A0")
    .attr("stroke-opacity", 0.5)
    .selectAll("line")
    .data(counttargets)
    .join("line")
        .attr("stroke-width", 1);

  //node.append("title").text(({index: i}) => `${nodes[i].bavdName} in ${nodes[i].collections.join(', ')}`)

  // const node = svg.append("g")
  //   .selectAll("image")
  //   .data(nodes)
  //   .join("image")
  //     .attr("height", (d) => 50)
  //     .attr("style", (d) => {
  //       let s = "cursor: pointer;"
  //       return s
  //     })
  //     .attr("alt", (d) => d.bavdName)
  //     .attr("xlink:href", (d) => {
  //       return "https://scholarlyediting.org/issues/39/mabel-dodge-luhans-whirling-around-mexico-a-selection/static/772dea01572cfb5fd7bfe97f51ca3f5e/1f8a1/placeholder.png"
  //     })
  //     .call(drag(simulation))

  const paths = groups.selectAll('.path_placeholder')
    // .data(groupIds)
    .enter()
    .append('g')
    .attr('class', 'path_placeholder')
    .append('path')
    .attr('stroke', (d) => color(d) )
    .attr('fill', (d) => color(d) )
    .attr('opacity', 0)

  paths
    .transition()
    .duration(2000)
    .attr('opacity', 1)

  // Tick it a determined number of times without drawing
  //simulation.tick(200)

   simulation.on("tick", () => {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);
   })
  
  node
      .attr("cx", (d: any) => d.x)
      .attr("cy", (d: any) => d.y)

//  updateGroups(groupIds)

  useEffect(() => {
    const el = d3Ref.current
    if (el) {
      while(el.firstChild){
        el.removeChild(el.firstChild)
      }
      d3Ref.current.append(svg.node() as Node)
    }
  
  }, [show])

  return (
    <div id="entities" className="page-programs programs entities">
        <section>
          <h1>
            Visualization2
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
          <div ref={d3Ref}/>
        </section>
      </div>
  )
}

export default Viz