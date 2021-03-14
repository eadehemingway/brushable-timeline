import * as d3 from 'd3'
import { draw100People } from './draw100People'
import {
  getLineHeadTexture,
  getLineBodyTexture,
  getHatchHeadTexture,
  getHatchBodyTexture
} from './utils'
import {
  american,
  black_american,
  black_american_prisoner,
  non_black_american_prisoner
} from './variables'

export function stepFive(svg, progressOneToHundred) {
  // call draw a hundred people again... this time representing americas prison population
  function fill(d, i) {
    return i < 14
      ? black_american_prisoner(svg)
      : non_black_american_prisoner(svg)
  }
  if (progressOneToHundred === 0) {
    d3.selectAll('.hundred-americas-prison-pop')
      .attr('opacity', 1)
      .transition()
      .attr('opacity', 0)
      .remove()
  }

  draw100People(300, 'americas-prison-pop', fill)
}
