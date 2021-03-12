
import * as d3 from 'd3'
import { manBodyD } from '../assets/man-icon'
import { getHatchBodyTexture, getHatchHeadTexture, getLineBodyTexture, getLineHeadTexture, getX2Coordinate, getY2Coordinate } from './utils'

export function stepNine (svg, progressOneToHundred) {

    // draw 17 men
    const data = d3.range(17)
    const headColor = getHatchHeadTexture(svg, "linen")
    const bodyColor = getHatchBodyTexture(svg, 'linen')


    const prisonBodyColor = getLineBodyTexture(svg, 'white')
    const prisonHeadColor = getLineHeadTexture(svg, 'white')

        svg
        .selectAll(`.seventeen-body`)
        .data(data)
        .enter()
        .append('path')
        .attr('class',`seventeen-body` )
        .attr('d', manBodyD)

        .attr('transform', (d, i) => {

          const y =  getY2Coordinate(i, 10, 100)
          const x = getX2Coordinate(i, 10, 60)

            return 'translate(' + x +',' + y+ ') scale(1)'
          })
          .attr('fill', (d,i) => i === 0 ?prisonBodyColor :  bodyColor
          )

        svg
          .selectAll(`seventeen-head`)
          .data(data)
          .enter()
          .append('circle')
          .attr('class' , `seventeen-head`)

          .attr(
            'cx',
            (d, i) =>{



                return getX2Coordinate(i, 10, 60)
            }
          )
          .attr(
            'cy',
            (d, i) => getY2Coordinate(i, 10, 100)
          )
          .attr('r',6)
          .attr('fill', (d,i) => i === 0 ?prisonHeadColor :  headColor)
}