import * as d3 from 'd3'
import {
  prison_pop_id,
  american,
  non_american,
  americanPrisoner
} from './variables'


export function stepTwo(svg, progressOneToHundred) {

  

  d3.range(100).forEach((n) => {

    svg
      .selectAll(`.hundred-${prison_pop_id}-head.${prison_pop_id}-${n}`)
      .attr('fill', non_american)

    if (n < 26 ) {
      svg
        .selectAll(`.${prison_pop_id}-${n}`)
        .attr('fill', americanPrisoner(svg))
      svg
        .selectAll(`.hundred-${prison_pop_id}-head.${prison_pop_id}-${n}`)
        .attr('fill', american)
    } else {
      // for when scrolling up
      // if (n > 5) {
      //   svg
      //     .selectAll(`.${prison_pop_id}-${n}`)
      //     .attr('fill', nonAmericanPrisoner(svg))
      // }
    }

  })
}
