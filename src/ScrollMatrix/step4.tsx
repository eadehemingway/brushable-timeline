import * as d3 from 'd3'
import { draw100People } from './draw100People'
import { getXFromIndex } from './step3'

import {
  getHatchBodyTexture,
  getHatchHeadTexture,
  getLineBodyTexture,
  getLineHeadTexture
} from './utils'
import {
  american_prisoner,
  black_american,
  non_american_prisoner,
  non_black_american,
  non_black_american_prisoner
} from './variables'

export function stepFour(svg, progressOneToHundred) {
  function fill(d, i) {
    const non_american_pris = non_american_prisoner(svg)
    const american_pris = american_prisoner(svg)
    return i < 26 ? american_pris : non_american_pris
  }
  // make people on page disappear

  d3.selectAll('.hundred-prison-pop')
    .attr('opacity', 1)
    .transition()
    .attr('opacity', 0)
    .remove()

  const black_am = black_american(svg)
  if (progressOneToHundred === 0) {
    //remove the checkered men
    d3.selectAll('.hundred-americas-pop')
      .attr('opacity', 1)
      .transition()
      .attr('opacity', 0)
      .remove()
    // add back the four men that is a hundred layered men...

    draw100People(300, 'prison-pop', fill)
    const y = 100
    // make the prison-pop hundred become four people....
    d3.selectAll('.hundred-prison-pop-body')
      .transition()
      .attr('transform', (d, i) => {
        return 'translate(' + getXFromIndex(i) + ',' + y + ') scale(1)'
      })
    d3.selectAll('.hundred-prison-pop-head')
      .transition()
      .attr('r', 6)
      .attr('cx', (d, i) => {
        return getXFromIndex(i) + 17
      })
      .attr('cy', y + 5)
  } else {
    // call draw a hundred people again... this time representing americas population
    const nonBlackAm = non_black_american(svg)
    draw100People(0, 'americas-pop', nonBlackAm)

    // color in 13% to represent black population

    d3.range(progressOneToHundred + 1).forEach((n) => {
      if (n < 14) {
        svg.select(`#americas-pop-head-${n}`).attr('fill', black_am)
        svg.select(`#americas-pop-body-${n}`).attr('fill', black_am)
      }
    })
  }
}
