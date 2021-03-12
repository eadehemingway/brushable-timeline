
import * as d3 from 'd3'
import { manBodyD } from '../assets/man-icon'
import { getHatchBodyTexture, getHatchHeadTexture, getLineBodyTexture, getLineHeadTexture } from './utils'

export function stepEight (svg, progressOneToHundred) {
// remove the men on screen
    d3.selectAll('.hundred-americas-pop-body').attr("opacity", 1).transition().attr("opacity", 0).remove()
    d3.selectAll('.hundred-americas-prison-pop-body').attr("opacity", 1).transition().attr("opacity", 0).remove()
    d3.selectAll('.hundred-americas-pop-head').attr("opacity", 1).transition().attr("opacity", 0).remove()
    d3.selectAll('.hundred-americas-prison-pop-head').attr("opacity", 1).transition().attr("opacity", 0).remove()


    // draw three men
const data = [1,2,3]
const headColor = getHatchHeadTexture(svg, "sienna")
const bodyColor = getHatchBodyTexture(svg, 'sienna')


const prisonBodyColor = getLineBodyTexture(svg, 'white')
const prisonHeadColor = getLineHeadTexture(svg, 'white')

    svg
    .selectAll(`.three-body`)
    .data(data)
    .enter()
    .append('path')
    .attr('class',`three-body` )
    .attr('d', manBodyD)

    .attr('transform', (d, i) => {



        return 'translate(' + i * 60 +',' + 100+ ') scale(1)'
      })
      .attr('fill', (d,i) => i === 0 ?prisonBodyColor :  bodyColor
      )

    svg
      .selectAll(`three-head`)
      .data(data)
      .enter()
      .append('circle')
      .attr('class' , `three-head`)

      .attr(
        'cx',
        (d, i) => (i * 60) +15
      )
      .attr(
        'cy',
        (d, i) => 100
      )
      .attr('r',6)
      .attr('fill', (d,i) => i === 0 ?prisonHeadColor :  headColor)
}