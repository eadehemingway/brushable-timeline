import * as d3 from 'd3'
import { drawBigPeople } from './drawBigPeople'

import {
  white_americans_id,
  american,
  whiteAmerican,
  whiteAmericanPrisoner,
  americanPrisoner
} from './variables'

export function stepNine(svg, progressOneToHundred) {
  // black americans have a one in three chance of going to prison
  const data = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]

  function fillWhitePrisPop(i) {
    return i === 0 ? whiteAmericanPrisoner(svg) : whiteAmerican
  }

  function fillWhitePrisPopHead(i) {
    return i === 0 ? whiteAmerican : whiteAmerican
  }

  if (progressOneToHundred === 0) {
    // remove the seventeen men
    d3.selectAll(`.hundred-${white_americans_id}`)
      .attr('opacity', 1)
      .transition()
      .attr('opacity', 0)
      .remove()

  }else{

    drawBigPeople(data, fillWhitePrisPop, fillWhitePrisPopHead, white_americans_id, 400)
    
  }


}
