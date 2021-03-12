import * as d3 from 'd3'

export function stepZero(svg, progressOneToHundred) {
  d3.range(100).forEach((n) => {
    if (n < 6 && progressOneToHundred > n) {
      svg.select(`#world-pop-head-${n}`).attr('fill', 'coral')
      svg.select(`#world-pop-body-${n}`).attr('fill', 'coral')
    } else {
      // for when scrolling up
      svg.select(`#world-pop-head-${n}`).attr('fill', 'lightsteelblue')
      svg.select(`#world-pop-body-${n}`).attr('fill', 'lightsteelblue')
    }
  })
}
