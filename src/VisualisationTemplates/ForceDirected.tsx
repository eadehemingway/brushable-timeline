import { useEffect, useState } from 'react'
import * as d3 from 'd3'
import { orange } from '../styles'

interface Props {
  percentage: number
  forceId: string
  svgId: string
  x: number
}

export default function ForceDirected({
  percentage,
  forceId,
  svgId,
  x,
}: Props) {
  const [data, setData] = useState([])

  // useEffect(() => {
  //   return () => d3.selectAll(`.circle-${position}`).remove();
  // }, [position]);

  useEffect(() => {
    const data = d3.range(100).map((n, i) => {
      let fillColor = 'grey'
      if (n >= Math.ceil(percentage)) fillColor = 'none'
      if (n < Math.floor(percentage)) fillColor = 'white'

      return { id: i, fillColor, forceId }
    })
    setData(data)
  }, [percentage, forceId])

  useEffect(() => {
    const radius = 6

    const collision = d3.forceCollide(radius * 2).strength(0.8)
    interface dataWithCoordinates {
      x: number
      y: number
    }

    d3.forceSimulation(data)
      .force('collision', collision)
      .force('center', d3.forceCenter(x, 200))
      .on('tick', () => {
        // call the tick function running the simulation
        d3.selectAll(`.circle-${forceId}`)
          .attr('cy', (d: dataWithCoordinates) => d.y)
          .attr('cx', (d: dataWithCoordinates) => d.x)
      })

    const svg = d3.select(`#${svgId}`)

    const circles = svg.selectAll(`.circle-${forceId}`).data(data)
    circles
      .enter()
      .append('circle')
      .attr('r', radius)
      .attr('class', `circle-${forceId}`)
      .attr('stroke', orange)
      .attr('stroke-width', 2)
      .attr('opacity', 1)
      .attr('fill', (d) => d.fillColor)

    circles.attr('fill', (d) => d.fillColor)
  }, [data, percentage, svgId, forceId, x])

  return null
}
