import * as d3 from 'd3'

import { black_american_prisoner, non_black_american } from './variables'

export function stepSeven(svg, progressOneToHundred) {
  // black males 6% of pop, and 40% of prison pop

  const non_black_am = non_black_american(svg)
  d3.range(100).forEach((n) => {
    if (n > 7) {
      svg.selectAll(`.americas-pop-${n}`).attr('fill', non_black_am)
    }
  })

  // color in 40% of prisoners to represent male black population

  d3.range(progressOneToHundred + 1).forEach((n) => {
    const black_am_prisoner = black_american_prisoner(svg)
    if (n < 40) {
      svg.selectAll(`.americas-prison-pop-${n}`).attr('fill', black_am_prisoner)
    }
  })
}
