import * as d3 from 'd3'
import { manBodyD } from '../assets/man-icon'
import { drawBigPeople } from './drawBigPeople'
import {
  getHatchBodyTexture,
  getHatchHeadTexture,
  getLineBodyTexture,
  getLineHeadTexture
} from './utils'

export function stepNine(svg, progressOneToHundred) {
  // black americans have a one in three chance of going to prison
  const data = [1, 2, 3]

  function fill(i, type) {
    if (type === 'head') {
      const headColor = getHatchHeadTexture(svg, 'sienna')
      const prisonHeadColor = getLineHeadTexture(svg, 'white')
      return i === 0 ? prisonHeadColor : headColor
    } else {
      const prisonBodyColor = getLineBodyTexture(svg, 'white')
      const bodyColor = getHatchBodyTexture(svg, 'sienna')
      return i === 0 ? prisonBodyColor : bodyColor
    }
  }

  if (progressOneToHundred === 0) {
    d3.selectAll('.black-americans-body')
      .attr('opacity', 1)
      .transition()
      .attr('opacity', 0)
      .remove()
    d3.selectAll('.black-americans-head')
      .attr('opacity', 1)
      .transition()
      .attr('opacity', 0)
      .remove()
  }

  drawBigPeople(svg, data, fill, 'black-americans', 400)
}
