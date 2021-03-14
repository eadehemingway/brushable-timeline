import * as d3 from 'd3'
import { manBodyD } from '../assets/man-icon'
import { draw100People } from './draw100People'
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
  d3.selectAll('.hundred')
    .attr('opacity', 1)
    .transition()
    .attr('opacity', 0)
    .remove()
  if (progressOneToHundred === 0) {
    // remove the seventeen men
    d3.selectAll('.white-americans-body')
      .attr('opacity', 1)
      .transition()
      .attr('opacity', 0)
      .remove()
    d3.selectAll('.white-americans-head')
      .attr('opacity', 1)
      .transition()
      .attr('opacity', 0)
      .remove()

    const orangeHead = getHatchHeadTexture(svg, 'darkorange')
    const orangeBody = getHatchBodyTexture(svg, 'darkorange')
    // add back in the two hundreds people...
    draw100People(0, 'americas-pop', orangeHead, orangeBody)
    const colHead = getLineHeadTexture(svg, 'linen')
    const colBody = getLineBodyTexture(svg, 'linen')
    draw100People(300, 'americas-prison-pop', colHead, colBody)
  }

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
