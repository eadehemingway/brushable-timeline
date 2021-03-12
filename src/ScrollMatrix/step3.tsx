import * as d3 from 'd3'
import {
  getCXForHundredHeads,
  getCYForHundredHeads,
  getTransformForHundredBodies
} from './draw100People'

export function stepThree(svg, progressOneToHundred) {
  // remove the world-pop hundred on the left
  d3.selectAll('.hundred-world-pop')
    .attr('opacity', 1)
    .transition()
    .attr('opacity', 0)
    .remove()

  if (progressOneToHundred === 0) {
    // translate back to original order
    // for when scrolling up
    d3.selectAll('.hundred-prison-pop-body')
      .transition()
      .attr('transform', (d, i) => getTransformForHundredBodies(i, 300))

    d3.selectAll('.hundred-prison-pop-head')
      .transition()
      .attr('r', 2.5)
      .attr('cx', (d, i) => getCXForHundredHeads(i, 300))
      .attr('cy', (d, i) => getCYForHundredHeads(i))
  } else {
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
  }
}

function getXFromIndex(index) {
  switch (true) {
    case index < 25:
      return 80
    case index < 50:
      return 160
    case index < 75:
      return 240
    case index < 100:
      return 320
  }
}
