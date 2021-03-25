import * as d3 from 'd3'
import {
  draw100People,
  getCXForHundredHeads,
  getCYForHundredHeads,
  getTransformForHundredBodies
} from './draw100People'
import { drawBigPeople } from './drawBigPeople'

import {
  prison_pop_id,
  black_prison_pop_id,
  american,
  blackAmerican,
  americanPrisoner,
  blackAmericanPrisoner,
  white_americans_id
} from './variables'


export function stepEight(svg, progressOneToHundred) {

  function fillAmPrisPop(d, i) {
    return i < 13 ? blackAmerican : american
  }

  function fillBlackPrisPop(i) {
    return i === 0 ? blackAmericanPrisoner(svg) : blackAmerican
  }

  function fillBlackPrisPopHead(i) {
    return i === 0 ? blackAmerican : blackAmerican
  }

  function fillPrisPop(d,i) {
    return i < 40 ? blackAmericanPrisoner(svg) : americanPrisoner(svg)
  }

 

  const data = [1, 2, 3]

  if (progressOneToHundred === 0) {
    //remove the seventeen men
    d3.selectAll(`.hundred-${white_americans_id}`)
    .attr('opacity', 1)
    .transition()
    .attr('opacity', 0)
    .remove()



    draw100People(300, black_prison_pop_id, fillPrisPop,20) // the three heads move back but not the body

    d3.selectAll(`.hundred-${black_prison_pop_id}-body`)
    .transition()
    .attr('transform', (d, i) => getTransformForHundredBodies(i, 300,20))
    .attr('fill', (d,i)=>fillPrisPop(d,i))

    d3.selectAll(`.hundred-${black_prison_pop_id}-head`)
      .transition()
      .attr('r', 2.5)
      .attr('cx', (d, i) => getCXForHundredHeads(i, 300,20))
      .attr('cy', (d, i) => getCYForHundredHeads(i))
      .attr('fill', (d,i)=>fillAmPrisPop(d,i))
      

    // add the two hundred people of american and american prisoners
    draw100People(0, prison_pop_id, fillAmPrisPop,20)
    
  } else {
     
    // remove the prison-pop hundred on the left
    d3.selectAll(`.hundred-${prison_pop_id}`)
      .transition()
      .attr('opacity', 0)
      .remove()

      drawBigPeople(data, fillBlackPrisPop, fillBlackPrisPopHead, black_prison_pop_id, 100)
    
   

  }
  
}



