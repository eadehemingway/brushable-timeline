import * as d3 from 'd3'
import {
  getHatchBodyTexture,
  getHatchHeadTexture,
  getLineBodyTexture,
  getLineHeadTexture
} from './utils'

export function stepSix(svg, progressOneToHundred) {
  // black people make up 33% of prison pop
  d3.range(100).forEach((n) => {
    if (n < 34 && progressOneToHundred > n) {
      const headColor = getHatchHeadTexture(svg, 'sienna')
      const bodyColor = getHatchBodyTexture(svg, 'sienna')
      svg.select(`#americas-prison-pop-head-${n}`).attr('fill', headColor)
      svg.select(`#americas-prison-pop-body-${n}`).attr('fill', bodyColor)
    } else {
      // // for when scrolling up
      const colHead = getLineHeadTexture(svg, 'linen')
      const colBody = getLineBodyTexture(svg, 'linen')
      svg.select(`#americas-prison-pop-head-${n}`).attr('fill', colHead)
      svg.select(`#americas-prison-pop-body-${n}`).attr('fill', colBody)
    }
  })
}
