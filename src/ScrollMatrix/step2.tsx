import * as d3 from 'd3'
import {
  americanPrisoner,
  nonAmericanPrisoner,
  prison_pop_id
} from './variables'

export function stepTwo(svg, progressOneToHundred) {
  d3.range(100).forEach((n) => {
    if (n < 26 && progressOneToHundred > n) {
      svg
        .selectAll(`.${prison_pop_id}-${n}`)
        .attr('fill', americanPrisoner(svg))
    } else {
      // for when scrolling up
      if (n > 5) {
        svg
          .selectAll(`.${prison_pop_id}-${n}`)
          .attr('fill', nonAmericanPrisoner(svg))
      }
    }
  })
}
