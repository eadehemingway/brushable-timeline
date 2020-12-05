import { useCallback, useEffect, useState } from 'react'
import * as d3 from 'd3'

interface Props {
  percentage: number
  matrixId: string
  svgId: string
  x1: number
}

export default function Matrix({ percentage, matrixId, svgId, x1 }: Props) {
  const [data, setData] = useState([])
  useEffect(() => {
    const data = d3.range(100).map((n, i) => {
      let fillColor
      if (n >= Math.ceil(percentage)) fillColor = 'coral'
      if (n < Math.floor(percentage)) fillColor = 'linen'

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
    const dotsPerRow = 10
    const radius = 20
    const leftBoxPadding = 80
    const topBoxPadding = 100
    const svg = d3.select(`#${svgId}`)
    svg
      .selectAll(`.${matrixId}-icons`)
      .data(data)
      .enter()
      .append('path')
      .attr('class', `${matrixId}-icons`)
      .attr(
        'd',
        'M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z'
      )
      .attr('fill', (d) => d.fillColor)
      .attr('transform', (d, i) => {
        const x = x1 + getX2Coordinate(i, dotsPerRow, radius) + leftBoxPadding
        const y = getY2Coordinate(i, dotsPerRow, radius) + topBoxPadding
        return 'translate(' + x + ',' + y + ')'
      })
  }, [percentage, matrixId, svgId, x1, data])

  return null
}
