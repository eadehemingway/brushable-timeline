

import { manBodyD } from '../assets/man-icon'
import * as d3 from 'd3'
import textures from 'textures'


  export function draw100People(x1, id, headColor, bodyColor) {

    const dotsPerRow = 10
    const iconWidth = 20
    const iconHeight = 40
    const leftBoxPadding = 40
    const topBoxPadding = 40


    const svg = d3
    .select('#scroll-matrix')

    const data = d3.range(100)

    svg
    .selectAll(`.hundred-${id}-body`)
    .data(data)
    .enter()
    .append('path')
    .attr('class',`hundred-${id}-body` )
    .attr('d', manBodyD)
    .attr('id', (d, i) => `${id}-body-${i + 1}`)
    .attr('transform', (d, i) => {
      const x2 = leftBoxPadding + getX2Coordinate(i, dotsPerRow, iconWidth)
      const x = x1 + x2

      const y = getY2Coordinate(i, dotsPerRow, iconHeight) + topBoxPadding
        return 'translate(' + x +',' + y + ') scale(0.3)'
      })
      .attr('fill', bodyColor
      )

    svg
      .selectAll(`.hundred-${id}-head`)
      .data(data)
      .enter()
      .append('circle')
      .attr('class' , `hundred-${id}-head`)
      .attr('id', (d, i) => `${id}-head-${i + 1}`)
      .attr(
        'cx',
        (d, i) => x1 + leftBoxPadding + getX2Coordinate(i, dotsPerRow, iconWidth) + 5
      )
      .attr(
        'cy',
        (d, i) => getY2Coordinate(i, dotsPerRow, iconHeight) + topBoxPadding
      )
      .attr('r', 2.5)
      .attr('fill', headColor)
  }

  function getY2Coordinate(index, dotsPerRow, height) {
    const placeInCol = Math.floor(index / dotsPerRow)
    const padding = 5
    return placeInCol * (padding + height)
  }

  function getX2Coordinate(index, dotsPerRow, width) {
    const placeInRow = index % dotsPerRow
    const padding = 5
    return placeInRow * (width + padding)
  }