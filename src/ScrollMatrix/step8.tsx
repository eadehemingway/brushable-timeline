import * as d3 from 'd3'
import { manBodyD } from '../assets/man-icon'
import { drawBigPeople } from './drawBigPeople'
import {
  getHatchBodyTexture,
  getHatchHeadTexture,
  getLineBodyTexture,
  getLineHeadTexture,
  getX2Coordinate,
  getY2Coordinate
} from './utils'

export function stepEight(svg, progressOneToHundred) {
  //white americans have a one in seventeen chance in going to prison

  // remove the men on screen
  d3.selectAll('.hundred-americas-pop-body')
    .attr('opacity', 1)
    .transition()
    .attr('opacity', 0)
    .remove()
  d3.selectAll('.hundred-americas-prison-pop-body')
    .attr('opacity', 1)
    .transition()
    .attr('opacity', 0)
    .remove()
  d3.selectAll('.hundred-americas-pop-head')
    .attr('opacity', 1)
    .transition()
    .attr('opacity', 0)
    .remove()
  d3.selectAll('.hundred-americas-prison-pop-head')
    .attr('opacity', 1)
    .transition()
    .attr('opacity', 0)
    .remove()

  const data = d3.range(17)

  function fill(i, type) {
    if (type === 'head') {
      const prisonHeadColor = getLineHeadTexture(svg, 'white')
      const headColor = getHatchHeadTexture(svg, 'linen')
      return i === 0 ? prisonHeadColor : headColor
    } else {
      const prisonBodyColor = getLineBodyTexture(svg, 'white')
      const bodyColor = getHatchBodyTexture(svg, 'linen')
      return i === 0 ? prisonBodyColor : bodyColor
    }
  }

  drawBigPeople(svg, data, fill, 'white-americans', 0)
}
