import * as d3 from 'd3'
import {
  getHatchBodyTexture,
  getHatchHeadTexture,
  getLineBodyTexture,
  getLineHeadTexture
} from './utils'
import {
  black_american,
  black_american_prisoner,
  non_black_american,
  non_black_american_prisoner
} from './variables'

export function stepSix(svg, progressOneToHundred) {
  // black people make up 33% of prison pop
  d3.range(100).forEach((n) => {
    if (n < 34 && progressOneToHundred > n) {
      const black_am = black_american_prisoner(svg)

      svg.select(`#americas-prison-pop-head-${n}`).attr('fill', black_am)
      svg.select(`#americas-prison-pop-body-${n}`).attr('fill', black_am)
    } else {
      // // for when scrolling up
      const non_black_am = non_black_american_prisoner(svg)
      if (n > 14) {
        svg.select(`#americas-prison-pop-head-${n}`).attr('fill', non_black_am)
        svg.select(`#americas-prison-pop-body-${n}`).attr('fill', non_black_am)
      }
    }
  })
}
