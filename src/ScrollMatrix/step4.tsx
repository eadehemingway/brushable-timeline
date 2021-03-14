import * as d3 from 'd3'
import { draw100People } from './draw100People'
import { getXFromIndex } from './step3'

import {
  americanPrisoner,
  americas_pop_id,
  blackAmerican,
  nonAmericanPrisoner,
  nonBlackAmerican,
  prison_pop_id
} from './variables'

export function stepFour(svg, progressOneToHundred) {
  function fill(d, i) {
    const non_american_pris = nonAmericanPrisoner(svg)
    const american_pris = americanPrisoner(svg)
    return i < 26 ? american_pris : non_american_pris
  }
  // make people on page disappear

  d3.selectAll(`.hundred-${prison_pop_id}`)
    .attr('opacity', 1)
    .transition()
    .attr('opacity', 0)
    .remove()

  const black_am = blackAmerican(svg)
  if (progressOneToHundred === 0) {
    //remove the checkered men
    d3.selectAll(`.hundred-${americas_pop_id}`)
      .attr('opacity', 1)
      .transition()
      .attr('opacity', 0)
      .remove()
    // add back the four men that is a hundred layered men...

    draw100People(300, 'prison-pop', fill)
    const y = 100
    // make the prison-pop hundred become four people....
    d3.selectAll(`.hundred-${prison_pop_id}-body`)
      .transition()
      .attr('transform', (d, i) => {
        return 'translate(' + getXFromIndex(i) + ',' + y + ') scale(1)'
      })
    d3.selectAll(`.hundred-${prison_pop_id}-head`)
      .transition()
      .attr('r', 6)
      .attr('cx', (d, i) => {
        return getXFromIndex(i) + 17
      })
      .attr('cy', y + 5)
  } else {
    // call draw a hundred people again... this time representing americas population
    const nonBlackAm = nonBlackAmerican(svg)
    draw100People(0, americas_pop_id, nonBlackAm)

    // color in 13% to represent black population

    d3.range(progressOneToHundred + 1).forEach((n) => {
      if (n < 14) {
        svg.selectAll(`.${americas_pop_id}-${n}`).attr('fill', black_am)
      }
    })
  }
}
