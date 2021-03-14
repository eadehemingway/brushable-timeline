import * as d3 from 'd3'
import { american, non_american, world_pop_id } from './variables'

export function stepZero(svg, progressOneToHundred) {
  d3.range(100).forEach((n) => {
    if (n < 6 && progressOneToHundred > n) {
      svg.selectAll(`.${world_pop_id}-${n}`).attr('fill', american)
    } else {
      // for when scrolling up
      svg.selectAll(`.${world_pop_id}-${n}`).attr('fill', non_american)
    }
  })
}
