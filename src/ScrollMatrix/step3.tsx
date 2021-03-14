import * as d3 from 'd3'
import {
  draw100People,
  getCXForHundredHeads,
  getCYForHundredHeads,
  getTransformForHundredBodies
} from './draw100People'
import {
  american,
  non_american,
  prison_pop_id,
  world_pop_id
} from './variables'

function fill(d, i) {
  return i < 5 ? american : non_american
}

export function stepThree(svg, progressOneToHundred) {
  if (progressOneToHundred === 0) {
    // for when scrolling up
    // translate back to original order of 100 people
    d3.selectAll(`.hundred-${prison_pop_id}-body`)
      .transition()
      .attr('transform', (d, i) => getTransformForHundredBodies(i, 300))

    d3.selectAll(`.hundred-${prison_pop_id}-head`)
      .transition()
      .attr('r', 2.5)
      .attr('cx', (d, i) => getCXForHundredHeads(i, 300))
      .attr('cy', (d, i) => getCYForHundredHeads(i))

    // add back in the 100 people on the left
    draw100People(0, world_pop_id, fill)
  } else {
    // remove the world-pop hundred on the left
    d3.selectAll(`.hundred-${world_pop_id}`)
      .attr('opacity', 1)
      .transition()
      .attr('opacity', 0)
      .remove()
    const y = 100

    // make the prison-pop hundred become four people....
    d3.selectAll(`.hundred-${prison_pop_id}-body`)
      .transition()
      .attr(
        'transform',
        (d, i) => 'translate(' + getXFromIndex(i) + ',' + y + ') scale(1)'
      )
    d3.selectAll(`.hundred-${prison_pop_id}-head`)
      .transition()
      .attr('r', 6)
      .attr('cx', (d, i) => getXFromIndex(i) + 17)
      .attr('cy', y + 5)
  }
}

export function getXFromIndex(index) {
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
