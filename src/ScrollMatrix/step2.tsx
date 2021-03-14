import * as d3 from 'd3'
import { getLineBodyTexture, getLineHeadTexture } from './utils'
import {
  american_prisoner,
  black_american,
  non_american,
  non_american_prisoner,
  non_black_american
} from './variables'

export function stepTwo(svg, progressOneToHundred) {
  const non_american_pris = non_american_prisoner(svg)
  const american_pris = american_prisoner(svg)

  d3.range(100).forEach((n) => {
    if (n < 26 && progressOneToHundred > n) {
      svg.select(`#prison-pop-head-${n}`).attr('fill', american_pris)
      svg.select(`#prison-pop-body-${n}`).attr('fill', american_pris)
    } else {
      // for when scrolling up
      if (n > 5) {
        svg.select(`#prison-pop-head-${n}`).attr('fill', non_american_pris)
        svg.select(`#prison-pop-body-${n}`).attr('fill', non_american_pris)
      }
    }
  })
}
