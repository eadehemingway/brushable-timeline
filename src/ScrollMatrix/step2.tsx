import * as d3 from 'd3'
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
      svg.selectAll(`.prison-pop-${n}`).attr('fill', american_pris)
    } else {
      // for when scrolling up
      if (n > 5) {
        svg.selectAll(`.prison-pop-${n}`).attr('fill', non_american_pris)
      }
    }
  })
}
