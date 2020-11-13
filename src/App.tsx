import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { data } from './data'
import * as d3 from 'd3'
// import { textwrap } from 'd3-textwrap'
import './styles.css'

function App() {
  const sidePadding = 100
  const svgWidth = 1000
  const svgHeight = 500

  const [yearMin, setYearMin] = useState<number>(1950)
  const [yearMax, setYearMax] = useState<number>(1930)

  const getXScale = useCallback(
    (min, max) =>
      d3
        .scaleTime()
        .domain([new Date(min, 0, 0), new Date(max, 0, 0)])
        .range([sidePadding, svgWidth - sidePadding]),
    []
  )

  useEffect(() => {
    // update timeline
    const newxscale = getXScale(yearMin, yearMax)
    // upate axis
    d3.select('.big-axis').call(d3.axisBottom(newxscale))

    // update lines
    d3.selectAll('.big-timeline-line')
      .attr('x1', (d: any) => newxscale(new Date(d.startYear, 0, 0)))
      .attr('x2', (d: any) => newxscale(new Date(d.startYear, 0, 0)))

    // update labels
    d3.selectAll('.big-timeline-labels').attr('x', (d: any) =>
      newxscale(new Date(d.startYear, 0, 0))
    )
  }, [yearMin, yearMax, getXScale])

  const drawTimeline = useCallback(() => {
    const bigTimelineGroup = d3
      .select('svg')
      .attr('height', svgHeight)
      .attr('width', svgWidth)
      .append('g')
      .attr('class', 'big-timeline')

    const xScale = getXScale(1930, 1950)

    // create y scale (three levels? discreet) (need scale but dont need axis)
    var yScale = d3
      .scaleLinear()
      .domain([0, 3])
      .range([svgHeight / 2, 0])

    // draw the x axis
    bigTimelineGroup
      .append('g')
      .attr('class', 'big-axis')
      .attr('transform', `translate(0,${svgHeight / 2})`)
      .call(d3.axisBottom(xScale))

    // then plot lines (as if scatter graph)
    bigTimelineGroup
      .append('g')
      .attr('class', 'big-timeline-line-group')
      .selectAll('line')
      .data(data, (d: any) => d.id)
      .enter()
      .append('line')
      .attr('class', 'big-timeline-line')
      .attr('x1', (d) => xScale(new Date(d.startYear, 0, 0)))
      .attr('x2', (d) => xScale(new Date(d.startYear, 0, 0)))
      .attr('y1', (d) => yScale(d.level))
      .attr('y2', (d) => yScale(d.level) + 10 * d.level)
      .attr('stroke-width', 2)
      .attr('stroke', 'linen')

    // labels
    bigTimelineGroup
      .selectAll('.big-timeline-labels')
      .data(data, (d: any) => d.id)
      .enter()
      .append('text')
      .attr('class', 'big-timeline-labels')
      .text((d) => d.title)
      .attr('x', (d) => xScale(new Date(d.startYear, 0, 0)))
      .attr('y', (d) => yScale(d.level) + 15 * d.level + 5)
      .attr('fill', 'linen')
      .attr('text-anchor', 'middle')
      .attr('font-size', 8)

    // wrap text
    // const wrap = textwrap().bounds({ height: 100, width: 100 })
    // d3.selectAll('.big-timeline-labels').call(wrap)
    // d3.selectAll('foreignObject').attr('transform', 'translate(-50,0)')
  }, [])

  const drawBrushableTimeline = useCallback(() => {
    const startYears = data.map((d) => d.startYear)
    const min = Math.min(...startYears)
    const max = Math.max(...startYears)

    const svg = d3.select('svg')
    const xScale = getXScale(min, max)
    var mini_yScale = d3
      .scaleLinear()
      .domain([0, 3])
      .range([svgHeight - 50, svgHeight - 100])
    svg
      .append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + (svgHeight - 50) + ')')
      .call(d3.axisBottom(xScale))

    svg
      .selectAll('.brush-lines')
      .data(data, (d: any) => d.id)
      .enter()
      .append('line')
      .attr('x1', (d) => xScale(new Date(d.startYear, 0, 0)))
      .attr('x2', (d) => xScale(new Date(d.startYear, 0, 0)))
      .attr('y1', (d) => mini_yScale(d.level))
      .attr('y2', (d) => mini_yScale(d.level) + 10 * d.level)
      .attr('stroke-width', 2)
      .attr('stroke', 'linen')

    const brush = d3
      .brushX()
      .extent([
        [sidePadding, svgHeight - 150], // [x0, y0] is the top-left corner and
        [svgWidth - sidePadding, svgHeight - 10], //[x1, y1] is the bottom-right corner
      ])
      .on('brush', brushed)
      .on('end', () => 1)

    const defaultSelection = [svgWidth / 2 - 50, svgWidth / 2 + 50] // on page load what it selects

    svg.append('g').call(brush).call(brush.move, defaultSelection)

    function brushed({ selection }) {
      const xYearMin = xScale.invert(selection[0]).getFullYear()
      const xYearMax = xScale.invert(selection[1]).getFullYear()
      setYearMin(xYearMin)
      setYearMax(xYearMax)
    }
  }, [])

  useEffect(() => {
    drawTimeline()
    drawBrushableTimeline()
  }, [drawTimeline, drawBrushableTimeline])

  return (
    <Container>
      <Svg />
    </Container>
  )
}

export default App

const Container = styled.div`
  background-color: #282c34;
  height: 100vh;
  display: grid;
  justify-items: center;
`
const Svg = styled.svg`
  border: 2px solid linen;
  margin-top: 100px;
`
