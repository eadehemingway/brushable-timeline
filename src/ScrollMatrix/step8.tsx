import * as d3 from 'd3'

import { draw100People } from './draw100People'
import { drawBigPeople } from './drawBigPeople'

import {
  americas_pop_id,
  americas_prison_pop_id,
  blackAmerican,
  blackAmericanPrisoner,
  nonBlackAmerican,
  nonBlackAmericanPrisoner,
  whiteAmerican,
  white_americans_id,
  whiteAmericanPrisoner
} from './variables'

export function stepEight(svg, progressOneToHundred) {
  function fillAmPop(d, i) {
    return i < 40 ? blackAmerican(svg) : nonBlackAmerican(svg)
  }
  function fillAmPrisPop(d, i) {
    return i < 40 ? blackAmericanPrisoner(svg) : nonBlackAmericanPrisoner(svg)
  }

  function fill(i, type) {
    return i === 0 ? whiteAmericanPrisoner(svg) : whiteAmerican(svg)
  }
  //white americans have a one in seventeen chance in going to prison
  // remove the men on screen

  if (progressOneToHundred === 0) {
    // remove the seventeen men
    d3.selectAll(`.${white_americans_id}`)
      .attr('opacity', 1)
      .transition()
      .attr('opacity', 0)
      .remove()

    // add the two hundred people of american and american prisoners

    draw100People(0, americas_pop_id, fillAmPop)
    draw100People(300, americas_prison_pop_id, fillAmPrisPop)
  } else {
    d3.selectAll('.hundred')
      .attr('opacity', 1)
      .transition()
      .attr('opacity', 0)
      .remove()
    const data = d3.range(17)

    drawBigPeople(svg, data, fill, white_americans_id, 0)
  }
}
