import { manBodyD } from '../assets/man-icon'
import * as d3 from 'd3'
import { getX2Coordinate, getY2Coordinate } from './utils'
const dotsPerRow = 10
const iconHeight = 40
const leftBoxPadding = 40
const topBoxPadding = 40

export function draw100People(x1, id, color,iconWidth) {
  console.log('draw100People:')
  const svg = d3.select('#scroll-matrix')
  const data = d3.range(100)

  svg
    .selectAll(`.hundred-${id}-body`)
    .data(data)
    .join('path')
    .attr(
      'class',
      (d, i) => `hundred-${id}-body hundred-${id} hundred ${id}-${i + 1}`
    )
    .attr('d', manBodyD)
    .attr('transform', (d, i) => getTransformForHundredBodies(i, x1,iconWidth))
    .attr('fill', color)

  svg
    .selectAll(`.hundred-${id}-head`)
    .data(data)
    .join('circle')
    .attr(
      'class',
      (d, i) => `hundred-${id}-head hundred-${id} hundred ${id}-${i + 1}`
    )
    .attr('cx', (d, i) => getCXForHundredHeads(i, x1,iconWidth))
    .attr('cy', (d, i) => getCYForHundredHeads(i))
    .attr('r', 2.5)
    .attr('fill', color)
}

export function transform100People(x1, id, color,iconWidth) {

  const svg = d3.select('#scroll-matrix')

  svg
    .selectAll(`.hundred-${id}-body`)
    .transition().duration(150)
    .attr('transform', (d, i) => getTransformForHundredBodies(i, x1,iconWidth));

  svg
    .selectAll(`.hundred-${id}-head`)
    .transition().duration(150)
    .attr('cx', (d, i) => getCXForHundredHeads(i, x1,iconWidth))
    .attr('cy', (d, i) => getCYForHundredHeads(i));
}

export function getTransformForHundredBodies(i, x1,iconWidth) {
  const x = leftBoxPadding + getX2Coordinate(i, dotsPerRow, iconWidth) + x1
  const y = getY2Coordinate(i, dotsPerRow, iconHeight) + topBoxPadding
  return 'translate(' + x + ',' + y + ') scale(0.3)'
}

export function getCXForHundredHeads(i, x1,iconWidth) {
  return x1 + leftBoxPadding + getX2Coordinate(i, dotsPerRow, iconWidth) + 5
}

export function getCYForHundredHeads(i) {
  return getY2Coordinate(i, dotsPerRow, iconHeight) + topBoxPadding
}
