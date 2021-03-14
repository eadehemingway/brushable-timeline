import * as d3 from 'd3'
import { draw100People } from './draw100People'

import {
  americas_prison_pop_id,
  blackAmericanPrisoner,
  nonBlackAmericanPrisoner
} from './variables'

export function stepFive(svg, progressOneToHundred) {
  // call draw a hundred people again... this time representing americas prison population
  function fill(d, i) {
    return i < 14 ? blackAmericanPrisoner(svg) : nonBlackAmericanPrisoner(svg)
  }
  if (progressOneToHundred === 0) {
    d3.selectAll(`.hundred-${americas_prison_pop_id}`)
      .attr('opacity', 1)
      .transition()
      .attr('opacity', 0)
      .remove()
  }

  draw100People(300, americas_prison_pop_id, fill)
}
