import { getXScale } from './xScale'
import * as d3 from 'd3'
import { incarcerations } from '../data'

export const drawAreaGraph = (type, yBottom, yTop, minX, maxX) => {
  const xScale = getXScale(minX, maxX)

  const yearIntoXScale = (year) => xScale(new Date(year, 0, 0))

  const yScaleCount = d3
    .scaleLinear()
    .domain(d3.extent(incarcerations, (d) => +d.total))
    .range([yBottom, yTop])

  const area = d3
    .area()
    .x((d: any) => yearIntoXScale(+d.year))
    .y0(yBottom)
    .y1((d: any) => yScaleCount(d.total))
    .curve(d3.curveCardinal)

  d3.select(`.${type}-timeline`)
    .append('g')
    .attr('class', 'incarcerations-group')
    .selectAll(`${type}-area`)
    .data([incarcerations])
    .join('path')
    .attr('class', `${type}-area`)
    .attr('d', (d: any) => area(d))
    .attr('fill', 'white')
    .attr('stroke', 'white')
    .attr('stroke-opacity', 1)
    .attr('fill-opacity', 0.1)
}
