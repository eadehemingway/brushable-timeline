import * as d3 from 'd3'
import { draw100People, transform100People } from './draw100People'
import {
  world_pop_id,
  prison_pop_id,
  non_american,
  american,
  nonAmericanPrisoner,
  americanPrisoner
} from './variables'

export function stepOne(svg, progressOneToHundred) {
  
  if (progressOneToHundred === 0) {
    // for when scrolling up
    d3.selectAll(`.${prison_pop_id}`)
      .attr('opacity', 1)
      .transition()
      .attr('opacity', 0)
      .remove()
  }

  // create a second 100 people to the right.

  const non_american_pris = nonAmericanPrisoner(svg)
  const american_pris = americanPrisoner(svg)

  draw100People(300, prison_pop_id, non_american_pris,20)
  transform100People(0, world_pop_id, non_american,20)

  d3.range(100).forEach((n) => {
    if (n < 6) {
      svg.selectAll(`.${prison_pop_id}-${n}`).attr('fill', american_pris);
      svg.selectAll(`${world_pop_id}-${n}`).attr('fill', american);
      svg.selectAll(`.hundred-${prison_pop_id}-head.${prison_pop_id}-${n}`)
        .attr('fill', american)
    }else{
      svg.selectAll(`.hundred-${prison_pop_id}-head.${prison_pop_id}-${n}`)
        .attr('fill', non_american)
    }
  })

  

}
