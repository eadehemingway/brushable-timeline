import * as d3 from 'd3'
import { drawBigPeople } from './drawBigPeople'

import {
  blackAmerican,
  black_americans_id,
  blackAmericanPrisoner
} from './variables'

export function stepNine(svg, progressOneToHundred) {
  // black americans have a one in three chance of going to prison
  const data = [1, 2, 3]

  function fill(i, type) {
    return i === 0 ? blackAmericanPrisoner(svg) : blackAmerican(svg)
  }

  if (progressOneToHundred === 0) {
    d3.selectAll(`.${black_americans_id}`)
      .attr('opacity', 1)
      .transition()
      .attr('opacity', 0)
      .remove()
  }

  drawBigPeople(svg, data, fill, black_americans_id, 400)
}
