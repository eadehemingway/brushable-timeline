
import * as d3 from 'd3'
import { getBodyTexture, getHeadTexture } from './utils'

export function stepThree (svg, progressOneToHundred) {
  const bodyColor = getBodyTexture(svg, 'coral')
  const headColor = getHeadTexture(svg, 'coral')

d3.range(progressOneToHundred + 1).forEach((n) => {
  if (n < 26) {

    svg.select(`#prison-pop-head-${n}`).attr('fill', headColor)
    svg.select(`#prison-pop-body-${n}`).attr('fill', bodyColor)
  }
})



}