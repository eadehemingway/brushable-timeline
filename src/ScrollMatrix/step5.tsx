import * as d3 from 'd3'
import { draw100People } from './draw100People'
import {
  getLineHeadTexture,
  getLineBodyTexture,
  getHatchHeadTexture,
  getHatchBodyTexture
} from './utils'

export function stepFive(svg, progressOneToHundred) {
  // call draw a hundred people again... this time representing americas prison population

  if (progressOneToHundred === 0) {
    d3.selectAll('.hundred-americas-prison-pop')
      .attr('opacity', 1)
      .transition()
      .attr('opacity', 0)
      .remove()
  } else {
    const colHead = getLineHeadTexture(svg, 'linen')
    const colBody = getLineBodyTexture(svg, 'linen')

    draw100People(300, 'americas-prison-pop', colHead, colBody)

    // color in 13% to represent black population

    d3.range(progressOneToHundred + 1).forEach((n) => {
      if (n < 14) {
        const headColor = getHatchHeadTexture(svg, 'sienna')
        const bodyColor = getHatchBodyTexture(svg, 'sienna')
        svg.select(`#americas-prison-pop-head-${n}`).attr('fill', headColor)
        svg.select(`#americas-prison-pop-body-${n}`).attr('fill', bodyColor)
      }
    })
  }
}
