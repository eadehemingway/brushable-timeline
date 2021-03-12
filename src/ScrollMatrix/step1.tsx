import * as d3 from 'd3'
import { draw100People } from './draw100People'
import { getLineBodyTexture, getLineHeadTexture } from './utils'

export function stepOne(svg, progressOneToHundred) {
  // create a second 100 people to the right.

  if (progressOneToHundred === 0) {
    // for when scrolling up
    d3.selectAll('.hundred-prison-pop')
      .attr('opacity', 1)
      .transition()
      .attr('opacity', 0)
      .remove()
  }
  const whitePrisonBodyCol = getLineBodyTexture(svg, 'white')
  const whitePrisonHeadCol = getLineHeadTexture(svg, 'white')

  draw100People(300, 'prison-pop', whitePrisonHeadCol, whitePrisonBodyCol)

  const bodyCoralColor = getLineBodyTexture(svg, 'coral')
  const headCoralColor = getLineHeadTexture(svg, 'coral')

  d3.range(progressOneToHundred + 1).forEach((n) => {
    if (n < 6) {
      svg.select(`#prison-pop-head-${n}`).attr('fill', headCoralColor)
      svg.select(`#prison-pop-body-${n}`).attr('fill', bodyCoralColor)
    }
  })
}
