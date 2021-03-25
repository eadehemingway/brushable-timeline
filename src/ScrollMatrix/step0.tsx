import * as d3 from 'd3'
import { transform100People } from './draw100People'
import { world_pop_id, american, non_american} from './variables'

export function stepZero(svg, progressOneToHundred) {

  if (progressOneToHundred === 0) {

      transform100People(0, world_pop_id, non_american,40);
      d3.selectAll(`.hundred-prison-pop`)
      .attr('opacity', 0)
      .remove()

  }
  
  d3.range(100).forEach((n) => {
    if (n < 6 && progressOneToHundred > n) {
      svg.selectAll(`.${world_pop_id}-${n}`).attr('fill', american)
      
    } else {
      // for when scrolling up
      svg.selectAll(`.${world_pop_id}-${n}`).attr('fill', non_american)
    }
  })
}
