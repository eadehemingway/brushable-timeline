import * as d3 from 'd3'
import { draw100People, transform100People } from './draw100People'
import { getXFromIndex } from './step3'

import {
  black_prison_pop_id,
  prison_pop_id,
  american ,
  non_american,
  blackAmerican,
  americanPrisoner,
  nonAmericanPrisoner
} from './variables'

export function stepFour(svg, progressOneToHundred) {

  const y = 100
  

  if (progressOneToHundred === 0) {
    //remove the checkered men
    d3.selectAll(`.hundred-${black_prison_pop_id}`)
    .attr('opacity', 1)
    .transition()
    .attr('opacity', 0)
    .remove()
    // add back the four men that is a hundred layered men...

    
    // make the prison-pop hundred become four people....
    d3.selectAll(`.hundred-${prison_pop_id}-body`)
      .transition()
      .attr('transform', (d, i) => {
        return 'translate(' + getXFromIndex(i) + ',' + y + ') scale(1)'
      }).attr("fill",(d,i) => i<26?americanPrisoner(svg):nonAmericanPrisoner(svg))

    d3.selectAll(`.hundred-${prison_pop_id}-head`)
      .transition()
      .attr('r', 6)
      .attr('cx', (d, i) => {
        return getXFromIndex(i) + 17
      })
      .attr('cy', y + 5)
      .attr("fill",(d,i) => i<26?american:non_american)  //this part fill not working!!
  } else {
    // call draw a hundred people again... this time representing americas population
 
    transform100People(0, prison_pop_id, american, 40)

    d3.selectAll(`.hundred-${prison_pop_id}-head`)
      .attr('r', 2.5)

    d3.selectAll(`.hundred-${prison_pop_id}`)
    .attr('r', 2.5)
    .attr('fill',american)

    // color in 13% to represent black population

    if(progressOneToHundred>50){

      d3.range(100).forEach((n) => {
      if (n < 14) {
        svg.selectAll(`.${prison_pop_id}-${n}`).attr('fill', blackAmerican)
      }
    })

    }

    
  }
}
