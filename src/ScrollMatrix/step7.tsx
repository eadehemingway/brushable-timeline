import * as d3 from 'd3'

import {
  prison_pop_id,
  black_prison_pop_id,
  blackAmericanPrisoner,
  american,
  blackAmerican,
  americanPrisoner
} from './variables'

export function stepSeven(svg, progressOneToHundred) {
  // black males 6% of pop, and 40% of prison pop

  if(progressOneToHundred===0){

    d3.range(100).forEach((n) => {
      if (n < 34) {
        svg.selectAll(`.${black_prison_pop_id}-${n}`).attr('fill',  blackAmericanPrisoner(svg));
        svg.selectAll(`.hundred-${black_prison_pop_id}-head.${black_prison_pop_id}-${n}`)
          .attr('fill', blackAmerican)
      }else{
        svg.selectAll(`.${black_prison_pop_id}-${n}`).attr('fill',  americanPrisoner(svg));
        svg.selectAll(`.hundred-${black_prison_pop_id}-head.${black_prison_pop_id}-${n}`)
          .attr('fill', american)
      }

      if (n < 14 ) {
        svg
        .selectAll(`.${prison_pop_id}-${n}`)
        .attr('fill', blackAmerican)
      }else{
        svg
        .selectAll(`.${prison_pop_id}-${n}`)
        .attr('fill', american)
      }
    })
  }else{

    d3.range(100).forEach((n) => {
      if (n < 41 ) {
        const black_am = blackAmericanPrisoner(svg)
  
        svg.selectAll(`.${black_prison_pop_id}-${n}`).attr('fill',  blackAmericanPrisoner(svg));
        svg.selectAll(`.hundred-${black_prison_pop_id}-head.${black_prison_pop_id}-${n}`)
          .attr('fill', blackAmerican)
  
      } 
      if (n < 6 ) {
        svg
        .selectAll(`.${prison_pop_id}-${n}`)
        .attr('fill', blackAmerican)
      }else{
        svg
        .selectAll(`.${prison_pop_id}-${n}`)
        .attr('fill', american)

      }
    })

  }

}
