import React, { useEffect } from 'react'
import styled from 'styled-components'
import { data } from './data'
import * as d3 from 'd3'
import './styles.css'

function App() {
  const sidePadding = 100
  const svgWidth = 1000
  const svgHeight = 500

  function drawTimeline() {
    const svg = d3
      .select('svg')
      .attr('height', svgHeight)
      .attr('width', svgWidth)
    // get min/max years of data
    const startYears = data.map((d) => d.startYear)
    const min = Math.min(...startYears)
    console.log('min:', min)
    const max = Math.max(...startYears)

    // create x scale (linear)
    const xScale = d3
      .scaleTime()
      .domain([min, max])
      // .domain([d3.timeParse('%Y')(`${min}`), d3.timeParse('%Y')(`${max}`)])
      .range([sidePadding, svgWidth - sidePadding])

    const test = xScale(min)
    console.log('should equal 100:', test)

    // create y scale (three levels? discreet) (need scale but dont need axis)
    var yScale = d3
      .scaleLinear()
      .domain([0, 3])
      .range([svgHeight / 2, 0])

    // draw the x axis
    svg
      .append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + svgHeight / 2 + ')')
      .call(d3.axisBottom(xScale))

    // then plot points (as if scatter graph)
    svg
      .selectAll('line')
      .data(data, (d: any) => d.id)
      .enter()
      .append('line')
      .attr('x1', (d) => xScale(d.startYear))
      .attr('x2', (d) => xScale(d.startYear))
      .attr('y1', (d) => yScale(d.level))
      .attr('y2', (d) => yScale(d.level) + 10 * d.level)
      .attr('stroke-width', 2)
      .attr('stroke', 'linen')
  }

  useEffect(() => {
    drawTimeline()
  }, [])

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
