import * as d3 from 'd3'
import { draw100People,transform100People } from './draw100People'

import {
  prison_pop_id,
  black_prison_pop_id,
  american,
  blackAmerican,
  americanPrisoner,
  blackAmericanPrisoner
} from './variables'

export function stepFive(svg, progressOneToHundred) {
  // call draw a hundred people again... this time representing americas prison population

  const nonBlackAm = americanPrisoner(svg)

  if (progressOneToHundred === 0) {
  //if scrolling up remove people on the right (black American prison pop)
      d3.selectAll(`.hundred-${black_prison_pop_id}`)
      .attr('opacity', 1)
      .transition()
      .attr('opacity', 0)
      .remove()
  }

  const american_pris = americanPrisoner(svg)

  transform100People(0, prison_pop_id, nonBlackAm, 20)

  draw100People(300, black_prison_pop_id, american_pris,20)
  svg.selectAll(`.hundred-${black_prison_pop_id}-head`)
    .attr('fill', american)

  d3.range(100).forEach((n) => {
    if (n < 14) {
      svg.selectAll(`.${black_prison_pop_id}-${n}`).attr('fill',  blackAmericanPrisoner(svg));
      svg.selectAll(`.hundred-${black_prison_pop_id}-head.${black_prison_pop_id}-${n}`)
        .attr('fill', blackAmerican)
    }
  })  
}
