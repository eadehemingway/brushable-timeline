import * as d3 from 'd3'
import { getHatchBodyTexture, getHatchHeadTexture } from './utils'

export function stepSeven(svg, progressOneToHundred) {
  // black males 6% of pop, and 40% of prison pop

  d3.range(progressOneToHundred + 1).forEach((n) => {
    if (n > 7) {
      const colHead = getHatchHeadTexture(svg, 'darkorange')
      const colBody = getHatchBodyTexture(svg, 'darkorange')
      svg.select(`#americas-pop-head-${n}`).attr('fill', colHead)
      svg.select(`#americas-pop-body-${n}`).attr('fill', colBody)
    }
    if (n < 14) {
      const headColor = getHatchHeadTexture(svg, 'sienna')
      const bodyColor = getHatchBodyTexture(svg, 'sienna')
      svg.select(`#americas-prison-pop-head-${n}`).attr('fill', headColor)
      svg.select(`#americas-prison-pop-body-${n}`).attr('fill', bodyColor)
    }
  })

  // color in 40% of prisoners to represent male black population

  d3.range(progressOneToHundred + 1).forEach((n) => {
    if (n < 40) {
      const headColor = getHatchHeadTexture(svg, 'sienna')
      const bodyColor = getHatchBodyTexture(svg, 'sienna')
      svg.select(`#americas-prison-pop-head-${n}`).attr('fill', headColor)
      svg.select(`#americas-prison-pop-body-${n}`).attr('fill', bodyColor)
    }
  })
}
