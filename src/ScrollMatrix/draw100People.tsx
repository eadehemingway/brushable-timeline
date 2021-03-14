import { manBodyD } from '../assets/man-icon'
import * as d3 from 'd3'
import { getX2Coordinate, getY2Coordinate } from './utils'
const dotsPerRow = 10
const iconWidth = 20
const iconHeight = 40
const leftBoxPadding = 40
const topBoxPadding = 40

export function draw100People(x1, id, color) {
  console.log('draw100People:')
  const svg = d3.select('#scroll-matrix')
  const data = d3.range(100)

  svg
    .selectAll(`.hundred-${id}-body`)
    .data(data)
    .join('path')
    .attr('class', `hundred-${id}-body hundred-${id} hundred`)
    .attr('d', manBodyD)
    .attr('id', (d, i) => `${id}-body-${i + 1}`)
    .attr('transform', (d, i) => getTransformForHundredBodies(i, x1))
    .attr('fill', color)

  svg
    .selectAll(`.hundred-${id}-head`)
    .data(data)
    .join('circle')
    .attr('class', `hundred-${id}-head hundred-${id} hundred`)
    .attr('id', (d, i) => `${id}-head-${i + 1}`)
    .attr('cx', (d, i) => getCXForHundredHeads(i, x1))
    .attr('cy', (d, i) => getCYForHundredHeads(i))
    .attr('r', 2.5)
    .attr('fill', color)
}

export function getTransformForHundredBodies(i, x1) {
  const x = leftBoxPadding + getX2Coordinate(i, dotsPerRow, iconWidth) + x1
  const y = getY2Coordinate(i, dotsPerRow, iconHeight) + topBoxPadding
  return 'translate(' + x + ',' + y + ') scale(0.3)'
}

export function getCXForHundredHeads(i, x1) {
  return x1 + leftBoxPadding + getX2Coordinate(i, dotsPerRow, iconWidth) + 5
}

export function getCYForHundredHeads(i) {
  return getY2Coordinate(i, dotsPerRow, iconHeight) + topBoxPadding
}
