import * as d3 from 'd3'
import { draw100People } from './draw100People'
import { getLineBodyTexture, getLineHeadTexture } from './utils'

export function stepOne(svg, progressOneToHundred) {
  // create a second 100 people to the right.

  const bodyColor = getLineBodyTexture(svg, 'white')
  const headColor = getLineHeadTexture(svg, 'white')

  draw100People(300, 'prison-pop', headColor, bodyColor)

  const bodyCoralColor = getLineBodyTexture(svg, 'coral')
  const headCoralColor = getLineHeadTexture(svg, 'coral')

  d3.range(progressOneToHundred + 1).forEach((n) => {
    if (n < 6) {
      svg.select(`#prison-pop-head-${n}`).attr('fill', headCoralColor)
      svg.select(`#prison-pop-body-${n}`).attr('fill', bodyCoralColor)
    }
  })
}
