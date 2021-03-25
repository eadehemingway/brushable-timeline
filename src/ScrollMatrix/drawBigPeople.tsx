import { manBodyD } from '../assets/man-icon'
import * as d3 from 'd3'
import { getY2Coordinate, getX2Coordinate } from './utils'

export function drawBigPeople(data, fill, fillhead, className, x1) {
  const svg = d3.select('#scroll-matrix')
  const dotsPerRow = 5
  const manHeight = 90
  const manWidth = 50
  const yPadding = 50
  svg
    .selectAll(`.hundred-${className}-body`)
    .data(data)
    .join('path')
    .attr('class',(d,i) => `hundred-${className}-body hundred-${className} hundred ${className}-${i + 1}`)
    .attr('d', manBodyD)
    .transition()
    .attr('transform', (d, i) => {
      const y = getY2Coordinate(i, dotsPerRow, manHeight) + yPadding
      const x = getX2Coordinate(i, dotsPerRow, manWidth) + x1

      return 'translate(' + x + ',' + y + ') scale(0.8)'
    })
    .attr('fill', (d, i) => fill(i))

  svg
    .selectAll(`.hundred-${className}-head`)
    .data(data)
    .join('circle')
    .attr('class', (d,i) =>`hundred-${className}-head hundred-${className} hundred ${className}-${i + 1}`)
    .transition()
    .attr('cx', (d, i) => {
      return getX2Coordinate(i, dotsPerRow, manWidth) + 15 + x1
    })
    .attr(
      'cy',
      (d, i) => getY2Coordinate(i, dotsPerRow, manHeight) + yPadding + 5
    )
    .attr('r', 4)
    .attr('fill', (d, i) => fillhead(i))
}
