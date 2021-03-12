import * as d3 from 'd3'
import { getLineBodyTexture, getLineHeadTexture } from './utils'

export function stepTwo(svg, progressOneToHundred) {
  const bodyColor = getLineBodyTexture(svg, 'coral')
  const headColor = getLineHeadTexture(svg, 'coral')

  d3.range(progressOneToHundred + 1).forEach((n) => {
    if (n < 26) {
      svg.select(`#prison-pop-head-${n}`).attr('fill', headColor)
      svg.select(`#prison-pop-body-${n}`).attr('fill', bodyColor)
    }
  })
}
