import { getXScale } from './xScale'
import * as d3 from 'd3'

export const updateTimeline = (yearMin, yearMax) => {
  const newxscale = getXScale(yearMin, yearMax)
  const newYearIntoXScale = (year) => newxscale(new Date(year, 0, 0))

  // upate axis
  d3.select('.big-axis').call(d3.axisBottom(newxscale))

  // update lines
  d3.selectAll('.big-timeline-line')
    .attr('x1', (d: any) => newYearIntoXScale(d.startYear))
    .attr('x2', (d: any) => newYearIntoXScale(d.startYear))

  // update backgrounds
  d3.selectAll('.big-tm-textured-bg')
    .attr('x', (d: any) => newYearIntoXScale(d.startYear))
    .attr('width', (d: any) => {
      const initialVal =
        newYearIntoXScale(d.endYear) - newYearIntoXScale(d.startYear)
      return Math.max(initialVal, 100)
    })

  // update labels
  d3.selectAll('.label').attr('transform', (d: any) => {
    return `translate(${newYearIntoXScale(d.data.startYear)}, ${d.y})`
  })
}
