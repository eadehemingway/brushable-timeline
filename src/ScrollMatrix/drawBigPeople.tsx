import { manBodyD } from "../assets/man-icon"
import { getY2Coordinate, getX2Coordinate } from "./utils"



export function drawBigPeople(svg, data, fill, className, x1){


const dotsPerRow = 5
const manHeight = 90
const manWidth = 50
const yPadding = 50
    svg
        .selectAll(`.${className}-body`)
        .data(data)
        .enter()
        .append('path')
        .attr('class',`${className}-head` )
        .attr('d', manBodyD)

        .attr('transform', (d, i) => {

          const y =  getY2Coordinate(i, dotsPerRow, manHeight) +yPadding
          const x = getX2Coordinate(i, dotsPerRow, manWidth) + x1

            return 'translate(' + x +',' + y+ ') scale(0.8)'
          })
          .attr('fill', fill
          )

        svg
          .selectAll(`.${className}-body`)
          .data(data)
          .enter()
          .append('circle')
          .attr('class' , `${className}-head`)

          .attr(
            'cx',
            (d, i) =>{



                return getX2Coordinate(i, dotsPerRow, manWidth) + 16 + x1
            }
          )
          .attr(
            'cy',
            (d, i) => getY2Coordinate(i, dotsPerRow, manHeight) + yPadding
          )
          .attr('r',6)
          .attr('fill', fill)
}