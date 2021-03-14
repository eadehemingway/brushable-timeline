import * as d3 from 'd3'
import { draw100People } from './draw100People'
import {
  americanPrisoner,
  nonAmericanPrisoner,
  prison_pop_id
} from './variables'

export function stepOne(svg, progressOneToHundred) {
  // create a second 100 people to the right.

  if (progressOneToHundred === 0) {
    // for when scrolling up
    d3.selectAll(`.${prison_pop_id}`)
      .attr('opacity', 1)
      .transition()
      .attr('opacity', 0)
      .remove()
  }

  const non_american_pris = nonAmericanPrisoner(svg)
  draw100People(300, prison_pop_id, non_american_pris)

  d3.range(progressOneToHundred + 1).forEach((n) => {
    const american_pris = americanPrisoner(svg)
    if (n < 6) {
      svg.selectAll(`.${prison_pop_id}-${n}`).attr('fill', american_pris)
    }
  })
}
