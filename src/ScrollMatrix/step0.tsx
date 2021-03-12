
import * as d3 from 'd3'

export function stepZero (svg, progressOneToHundred) {

    d3.range(progressOneToHundred + 1).forEach((n) => {
        if (n < 6) {
          svg.select(`#head-${n}`).attr('fill', 'coral')
          svg.select(`#body-${n}`).attr('fill', 'coral')
        }
      })

}