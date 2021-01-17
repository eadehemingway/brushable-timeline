import { useCallback, useEffect, useState } from 'react'
import * as d3 from 'd3'
import { manBodyD } from './assets/man-icon'
import manIcon from './assets/man-icon.png'
import manIconSvg from './assets/man-icon.svg'
import { cream, orange } from './styles'

interface Props {
  percentage: number
  matrixId: string
  svgId: string
  x1: number
  range: number
}

export default function Matrix({
  percentage,
  matrixId,
  svgId,
  x1,
  range,
}: Props) {
  const [data, setData] = useState([])
  useEffect(() => {
    const data = d3.range(range).map((n, i) => {
      let fillColor
      if (n >= Math.ceil(percentage)) fillColor = orange
      if (n < Math.floor(percentage)) fillColor = cream

      return { id: i, fillColor, svgId }
    })
    setData(data)
  }, [percentage, svgId])

  const getY2Coordinate = useCallback((index, dotsPerRow, unitWidth) => {
    const placeInCol = Math.floor(index / dotsPerRow)
    const padding = 5
    return placeInCol * (padding + unitWidth)
  }, [])
  const getX2Coordinate = useCallback((index, dotsPerRow, unitWidth) => {
    const placeInRow = index % dotsPerRow
    const padding = 5
    return placeInRow * (unitWidth + padding)
  }, [])

  useEffect(() => {
    const dotsPerRow = 15
    const iconWidth = 20
    const iconHeight = 40
    const leftBoxPadding = 20
    const topBoxPadding = 50
    const svg = d3.select(`#${svgId}`)
    const iconGroups = svg
      .selectAll(`.${matrixId}-icons`)
      .data(data)
      .enter()
      .append('g')
      .attr('class', `${matrixId}-icons`)

    iconGroups
      .append('path')
      .attr('d', manBodyD)
      .attr('fill', (d) => d.fillColor)
      .attr('transform', (d, i) => {
        const x =
          x1 + getX2Coordinate(i, dotsPerRow, iconWidth) + leftBoxPadding
        const y = getY2Coordinate(i, dotsPerRow, iconHeight) + topBoxPadding
        return 'translate(' + x + ',' + y + ') scale(0.3)'
      })

    iconGroups
      .append('circle')
      .attr('cx', 18)
      .attr('cy', 8)
      .attr('r', 8)
      .attr('fill', (d) => d.fillColor)
      .attr('transform', (d, i) => {
        const x =
          x1 + getX2Coordinate(i, dotsPerRow, iconWidth) + leftBoxPadding
        const y = getY2Coordinate(i, dotsPerRow, iconHeight) + topBoxPadding
        return 'translate(' + x + ',' + y + ') scale(0.3)'
      })
  }, [percentage, matrixId, svgId, x1, range, data])

  return null
}
