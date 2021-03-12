import * as d3 from 'd3'
import { draw100People } from './draw100People'

import { getHatchBodyTexture, getHatchHeadTexture } from './utils'

export function stepFour(svg, progressOneToHundred) {
  // make people on page disappear

  d3.selectAll('.hundred-prison-pop')
    .attr('opacity', 1)
    .transition()
    .attr('opacity', 0)
    .remove()

  // call draw a hundred people again... this time representing americas population

  const colHead = getHatchHeadTexture(svg, 'darkorange')

  const colBody = getHatchBodyTexture(svg, 'darkorange')

  draw100People(0, 'americas-pop', colHead, colBody)

  // color in 13% to represent black population

  d3.range(progressOneToHundred + 1).forEach((n) => {
    if (n < 14) {
      const headColor = getHatchHeadTexture(svg, 'sienna')

      const bodyColor = getHatchBodyTexture(svg, 'sienna')
      svg.select(`#americas-pop-head-${n}`).attr('fill', headColor)
      svg.select(`#americas-pop-body-${n}`).attr('fill', bodyColor)
    }
  })
}
