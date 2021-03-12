import * as d3 from 'd3'
import { getLineBodyTexture, getLineHeadTexture } from './utils'

export function stepTwo(svg, progressOneToHundred) {
  const bodyColor = getLineBodyTexture(svg, 'coral')
  const headColor = getLineHeadTexture(svg, 'coral')

  const prisonHeadCol = getLineHeadTexture(svg, 'white')
  const prisonBodyCol = getLineBodyTexture(svg, 'white')

  d3.range(100).forEach((n) => {
    if (n < 26 && progressOneToHundred > n) {
      svg.select(`#prison-pop-head-${n}`).attr('fill', headColor)
      svg.select(`#prison-pop-body-${n}`).attr('fill', bodyColor)
    } else {
      // for when scrolling up
      if (n > 5) {
        svg.select(`#prison-pop-head-${n}`).attr('fill', prisonHeadCol)
        svg.select(`#prison-pop-body-${n}`).attr('fill', prisonBodyCol)
      }
    }
  })
}
