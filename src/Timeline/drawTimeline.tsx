import * as d3 from 'd3'
import textures from 'textures'
import { data, periodChunks } from '../data'
import { drawAnnotations } from './drawAnnotations'
import { drawAreaGraph } from './drawBigAreaGraph'
import {
  bigTimelineHeight,
  svgHeight,
  svgWidth,
  textureColors,
} from './variables'
import { getXScale } from './xScale'

export const drawTimeline = (yearMax, yearMin) => {
  const bigTimelineGroup = d3
    .select('svg')
    .attr('height', svgHeight)
    .attr('width', svgWidth)
    .append('g')
    .attr('class', 'big-timeline')
    .attr('overflow', 'hidden')
    .attr('width', 100)

  // ---------BIG TIMELINE create scales-----------------------------------------------------------------

  const xScale = getXScale(yearMin, yearMax)
  const yearIntoXScale = (year) => xScale(new Date(year, 0, 0))

  const yScale = d3.scaleLinear().domain([-1, 5]).range([bigTimelineHeight, 0])

  // ---------BIG TIMELINE draw textured bgs-----------------------------------------------------------------

  bigTimelineGroup
    .selectAll('.big-tm-textured-bg')
    .data(periodChunks)
    .enter()
    .append('rect')
    .attr('class', 'big-tm-textured-bg')
    .attr('x', (d: any) => yearIntoXScale(d.startYear))
    .attr('y', 0)
    .attr('height', bigTimelineHeight)
    .attr(
      'width',
      (d: any) => yearIntoXScale(d.endYear) - yearIntoXScale(d.startYear)
    )
    .attr('fill', (d, i) => {
      const color = textures.lines().lighter().size(8).stroke(textureColors[i])
      d3.select('svg').call(color)
      return color.url()
    })

  // ---------BIG TIMELINE draw the x axis-----------------------------------------------------------------
  bigTimelineGroup
    .append('g')
    .attr('class', 'big-axis')
    .attr('transform', `translate(0,${svgHeight / 2})`)
    .call(d3.axisBottom(xScale))

  // ---------BIG TIMELINE plot lines-----------------------------------------------------------------
  bigTimelineGroup
    .append('g')
    .attr('class', 'big-timeline-line-group')
    .selectAll('line')
    .data(data, (d: any) => d.id)
    .enter()
    .append('line')
    .attr('class', 'big-timeline-line')
    .attr('x1', (d) => yearIntoXScale(d.startYear))
    .attr('x2', (d) => yearIntoXScale(d.startYear))
    .attr('y1', (d) => yScale(d.level))
    .attr('y2', (d) => yScale(d.level) + 15)
    .attr('stroke-width', 3)
    .attr('stroke', 'lightgray')

  // ---------BIG TIMELINE draw labels-----------------------------------------------------------------
  drawAnnotations(yearIntoXScale, yScale)

  drawAreaGraph(
    yearMin,
    yearMax,
    bigTimelineHeight,
    '.big-timeline',
    'big-area'
  )
}
