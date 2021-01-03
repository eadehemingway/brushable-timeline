import { getXScale } from './xScale'
import * as d3 from 'd3'
import { incarcerations } from '../data'

export const drawAreaGraph = (
  yearMin,
  yearMax,
  timelineHeight,
  timelineGroup,
  areaName
) => {
  const xScale = getXScale(yearMin, yearMax)
  const yearIntoXScale = (year) => xScale(new Date(year, 0, 0))
  const yScaleCount = d3
    .scaleLinear()
    .domain(d3.extent(incarcerations, (d) => +d.total))
    .range([timelineHeight, 0])

  const area = d3
    .area()
    .x((d: any) => yearIntoXScale(+d.year))
    .y0(timelineHeight)
    .y1((d: any) => {
      return yScaleCount(d.total)
    })
    .curve(d3.curveCardinal)

  d3.select(timelineGroup)
    .append('g')
    .attr('class', 'incarcerations-group')
    .selectAll(areaName)
    .data([incarcerations])
    .join('path')
    .attr('class', areaName)
    .attr('d', (d: any) => area(d))
    .attr('fill', 'white')
    .attr('stroke', 'white')
    .attr('stroke-opacity', 1)
    .attr('fill-opacity', 0.1)
}
