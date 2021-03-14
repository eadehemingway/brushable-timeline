import * as d3 from 'd3'
import { american, non_american } from './variables'

export function stepZero(svg, progressOneToHundred) {
  d3.range(100).forEach((n) => {
    if (n < 6 && progressOneToHundred > n) {
      svg.select(`#world-pop-head-${n}`).attr('fill', american)
      svg.select(`#world-pop-body-${n}`).attr('fill', american)
    } else {
      // for when scrolling up
      svg.select(`#world-pop-head-${n}`).attr('fill', non_american)
      svg.select(`#world-pop-body-${n}`).attr('fill', non_american)
    }
  })
}
