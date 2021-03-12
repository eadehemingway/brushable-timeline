
import * as d3 from 'd3'
import { getLineBodyTexture, getLineHeadTexture } from './utils'

export function stepThree (svg, progressOneToHundred) {

// remove the world-pop hundred on the left

d3.selectAll('.hundred-world-pop-body').attr("opacity", 1).transition().attr("opacity", 0).remove()
d3.selectAll('.hundred-world-pop-head').attr("opacity", 1).transition().attr("opacity", 0).remove()

const y = 100

const x1 = 80
const x2 = 160
const x3 = 240
const x4 = 320

function getXFromIndex (index){
    switch (true){
        case index <25 :
            return x1
        case index < 50:
            return x2
        case index < 75:
            return x3
        case index <100:
            return x4
    }
}
// make the prison-pop hundred become four people....
d3.selectAll('.hundred-prison-pop-body').transition().attr('transform', (d,i)=>{

    return 'translate(' + getXFromIndex(i) +',' + y + ') scale(1)'


})
d3.selectAll('.hundred-prison-pop-head').transition().attr('r', 6).attr('cx', (d,i)=>{
   return getXFromIndex(i) + 17
}).attr('cy', y + 5 )
}