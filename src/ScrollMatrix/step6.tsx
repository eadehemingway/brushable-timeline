import * as d3 from 'd3'

import {
  americas_prison_pop_id,
  blackAmericanPrisoner,
  nonBlackAmericanPrisoner
} from './variables'

export function stepSix(svg, progressOneToHundred) {
  // black people make up 33% of prison pop
  d3.range(100).forEach((n) => {
    if (n < 34 && progressOneToHundred > n) {
      const black_am = blackAmericanPrisoner(svg)

      svg.selectAll(`.${americas_prison_pop_id}-${n}`).attr('fill', black_am)
    } else {
      // // for when scrolling up
      const non_black_am = nonBlackAmericanPrisoner(svg)
      if (n > 14) {
        svg
          .selectAll(`.${americas_prison_pop_id}-${n}`)
          .attr('fill', non_black_am)
      }
    }
  })
}
