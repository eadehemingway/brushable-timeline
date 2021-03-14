import * as d3 from 'd3'
import { draw100People } from './draw100People'
import { american_prisoner, non_american_prisoner } from './variables'

export function stepOne(svg, progressOneToHundred) {
  // create a second 100 people to the right.

  if (progressOneToHundred === 0) {
    // for when scrolling up
    d3.selectAll('.hundred-prison-pop')
      .attr('opacity', 1)
      .transition()
      .attr('opacity', 0)
      .remove()
  }

  const non_american_pris = non_american_prisoner(svg)
  draw100People(300, 'prison-pop', non_american_pris)

  d3.range(progressOneToHundred + 1).forEach((n) => {
    const american_pris = american_prisoner(svg)
    if (n < 6) {
      svg.select(`#prison-pop-head-${n}`).attr('fill', american_pris)
      svg.select(`#prison-pop-body-${n}`).attr('fill', american_pris)
    }
  })
}
