import * as d3 from 'd3'

import {
  americas_pop_id,
  americas_prison_pop_id,
  blackAmericanPrisoner,
  nonBlackAmerican
} from './variables'

export function stepSeven(svg, progressOneToHundred) {
  // black males 6% of pop, and 40% of prison pop

  const non_black_am = nonBlackAmerican(svg)
  d3.range(100).forEach((n) => {
    if (n > 7) {
      svg.selectAll(`.${americas_pop_id}-${n}`).attr('fill', non_black_am)
    }
  })

  // color in 40% of prisoners to represent male black population

  d3.range(progressOneToHundred + 1).forEach((n) => {
    const black_am_prisoner = blackAmericanPrisoner(svg)
    if (n < 40) {
      svg
        .selectAll(`.${americas_prison_pop_id}-${n}`)
        .attr('fill', black_am_prisoner)
    }
  })
}
