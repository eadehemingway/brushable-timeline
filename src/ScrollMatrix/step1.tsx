
import * as d3 from 'd3'
import { draw100People } from './draw100People'

export function stepOne (svg, progressOneToHundred) {
// create a second 100 people to the right.
draw100People(300, 'prison-pop', 'lightsteelblue')

    // d3.range(progressOneToHundred + 1).forEach((n) => {
    //     if (n < 26) {
    //       svg.select(`#head-${n}`).attr('fill', 'coral')
    //       svg.select(`#body-${n}`).attr('fill', 'coral')
    //     }
    //   })

}