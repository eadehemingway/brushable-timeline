import * as d3 from 'd3'
import { draw100People } from './draw100People'
import { getXFromIndex } from './step3'

import {
  getHatchBodyTexture,
  getHatchHeadTexture,
  getLineBodyTexture,
  getLineHeadTexture
} from './utils'

export function stepFour(svg, progressOneToHundred) {
  // make people on page disappear

  d3.selectAll('.hundred-prison-pop')
    .attr('opacity', 1)
    .transition()
    .attr('opacity', 0)
    .remove()
  function fillHead(d, i) {
    const color = i <= 25 ? 'darkorange' : 'white'
    return getLineHeadTexture(svg, color)
  }
  function fillBody(d, i) {
    const color = i <= 25 ? 'darkorange' : 'white'
    return getLineBodyTexture(svg, color)
  }

  if (progressOneToHundred === 0) {
    //remove the checkered men
    d3.selectAll('.hundred-americas-pop')
      .attr('opacity', 1)
      .transition()
      .attr('opacity', 0)
      .remove()
    // add back the four men that is a hundred layered men...

    draw100People(300, 'prison-pop', fillHead, fillBody)
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

    const colHead = getHatchHeadTexture(svg, 'darkorange')
    const colBody = getHatchBodyTexture(svg, 'darkorange')

    draw100People(0, 'americas-pop', colHead, colBody)

    // color in 13% to represent black population

    d3.range(progressOneToHundred + 1).forEach((n) => {
      if (n < 14) {
        const headColor = getHatchHeadTexture(svg, 'sienna')

        const bodyColor = getHatchBodyTexture(svg, 'sienna')
        svg.select(`#americas-pop-head-${n}`).attr('fill', headColor)
        svg.select(`#americas-pop-body-${n}`).attr('fill', bodyColor)
      }
    })
  }
}
