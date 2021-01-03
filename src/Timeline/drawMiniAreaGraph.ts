import { getXScale } from './xScale'
import * as d3 from 'd3'
import { incarcerations } from '../data'
import { maxYearInData, minYearInData, svgHeight } from './variables'

export const drawMiniAreaGraph = (
  yearMin,
  yearMax,
  timelineHeight,
  timelineGroup,
  areaName
) => {
  const xScale = getXScale(yearMin, yearMax)
  const yBottom = svgHeight - 50
  const yTop1 = svgHeight - 100
  const yTop2 = svgHeight - 150
  const mini_xScale = getXScale(minYearInData, maxYearInData)
  const miniYearIntoXScale = (year) => mini_xScale(new Date(year, 0, 0))
  const yearIntoXScale = (year) => xScale(new Date(year, 0, 0))
  const mini_yScaleCount = d3
    .scaleLinear()
    .domain(d3.extent(incarcerations, (d) => +d.total))
    .range([yBottom, yTop2])

  const mini_area = d3
    .area()
    .x((d: any) => miniYearIntoXScale(+d.year))
    .y0(yBottom)
    .y1((d: any) => mini_yScaleCount(+d.total))
    .curve(d3.curveCardinal)

  d3.select('svg')
    .append('g')
    .attr('class', 'mini-incarcerations-group')
    .selectAll('path.miniarea')
    .data([incarcerations])
    .join('path')
    .attr('class', 'miniarea')
    .attr('d', (d: any) => mini_area(d))
    .attr('fill', 'white')
    .attr('stroke', 'white')
    .attr('stroke-opacity', 1)
    .attr('fill-opacity', 0.1)
}
