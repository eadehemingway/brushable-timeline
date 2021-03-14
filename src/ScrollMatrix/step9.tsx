import * as d3 from 'd3'
import { manBodyD } from '../assets/man-icon'
import { drawBigPeople } from './drawBigPeople'
import {
  getHatchBodyTexture,
  getHatchHeadTexture,
  getLineBodyTexture,
  getLineHeadTexture
} from './utils'
import { black_american, black_american_prisoner } from './variables'

export function stepNine(svg, progressOneToHundred) {
  // black americans have a one in three chance of going to prison
  const data = [1, 2, 3]

  function fill(i, type) {
    return i === 0 ? black_american_prisoner(svg) : black_american(svg)
  }

  if (progressOneToHundred === 0) {
    d3.selectAll('.black-americans')
      .attr('opacity', 1)
      .transition()
      .attr('opacity', 0)
      .remove()
  }

  drawBigPeople(svg, data, fill, 'black-americans', 400)
}
