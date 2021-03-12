
import * as d3 from 'd3'
import { getHatchBodyTexture, getHatchHeadTexture } from './utils'

export function stepSix (svg, progressOneToHundred) {
    d3.range(progressOneToHundred + 1).forEach((n) => {
        if (n < 34) {
            const headColor = getHatchHeadTexture(svg, "sienna")
            const bodyColor = getHatchBodyTexture(svg, 'sienna')
          svg.select(`#americas-prison-pop-head-${n}`).attr('fill', headColor)
          svg.select(`#americas-prison-pop-body-${n}`).attr('fill', bodyColor)
        }
      })
}