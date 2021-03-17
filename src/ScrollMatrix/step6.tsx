import * as d3 from 'd3'

import {
  black_prison_pop_id,
  american,
  blackAmerican,
  americanPrisoner,
  blackAmericanPrisoner
} from './variables'

export function stepSix(svg, progressOneToHundred) {
  // black people make up 33% of prison pop

  if(progressOneToHundred===0){

    d3.range(100).forEach((n) => {
      if (n < 14) {
        svg.selectAll(`.${black_prison_pop_id}-${n}`).attr('fill',  blackAmericanPrisoner(svg));
        svg.selectAll(`.hundred-${black_prison_pop_id}-head.${black_prison_pop_id}-${n}`)
          .attr('fill', blackAmerican)
      }else{
        svg.selectAll(`.${black_prison_pop_id}-${n}`).attr('fill',  americanPrisoner(svg));
        svg.selectAll(`.hundred-${black_prison_pop_id}-head.${black_prison_pop_id}-${n}`)
          .attr('fill', american)
      }
    })
  }else{


    d3.range(100).forEach((n) => {
      if (n < 34 ) {
        const black_am = blackAmericanPrisoner(svg)
  
        svg.selectAll(`.${black_prison_pop_id}-${n}`).attr('fill',  blackAmericanPrisoner(svg));
            svg.selectAll(`.hundred-${black_prison_pop_id}-head.${black_prison_pop_id}-${n}`)
              .attr('fill', blackAmerican)
  
      } 
    })
  }

  
}
