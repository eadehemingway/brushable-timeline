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
import {
  american,
  black_american,
  black_american_prisoner,
  non_black_american,
  non_black_american_prisoner,
  white_american,
  white_american_prisoner
} from './variables'

export function stepEight(svg, progressOneToHundred) {
  function fillAmPop(d, i) {
    return i < 40 ? black_american(svg) : non_black_american(svg)
  }
  function fillAmPrisPop(d, i) {
    return i < 40
      ? black_american_prisoner(svg)
      : non_black_american_prisoner(svg)
  }

  function fill(i, type) {
    return i === 0 ? white_american_prisoner(svg) : white_american(svg)
  }
  //white americans have a one in seventeen chance in going to prison
  // remove the men on screen

  if (progressOneToHundred === 0) {
    // remove the seventeen men
    d3.selectAll('.white-americans')
      .attr('opacity', 1)
      .transition()
      .attr('opacity', 0)
      .remove()

    // add the two hundred people of american and american prisoners

    draw100People(0, 'americas-pop', fillAmPop)
    draw100People(300, 'americas-prison-pop', fillAmPrisPop)
  } else {
    d3.selectAll('.hundred')
      .attr('opacity', 1)
      .transition()
      .attr('opacity', 0)
      .remove()
    const data = d3.range(17)

    drawBigPeople(svg, data, fill, 'white-americans', 0)
  }
}
