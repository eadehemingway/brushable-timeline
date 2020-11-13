import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { data } from './data'
import * as d3 from 'd3'
import { textwrap } from 'd3-textwrap'
import './styles.css'

function App() {
  const sidePadding = 100
  const svgWidth = 1000
  const svgHeight = 500
  // get min/max years of data
  const startYears = data.map((d) => d.startYear)
  const min = Math.min(...startYears)
  console.log('min:', min)
  const max = Math.max(...startYears)

  const [xTranslate, setXTranslate] = useState(0)

  const getXScale = useCallback(
    () =>
      d3
        .scaleTime()
        .domain([new Date(min, 0, 0), new Date(max, 0, 0)])
        .range([sidePadding, svgWidth * 3]),
    [max, min]
  )

  const moveTimeline = useCallback(() => {
    const x = getXScale()(new Date(xTranslate, 0, 0))

    d3.select('.big-timeline').attr('transform', `translate(-${x}, 0)`)
  }, [xTranslate, max, min])

  useEffect(() => {
    moveTimeline()
  }, [moveTimeline])

  function drawTimeline() {
    const svg = d3
      .select('svg')
      .attr('height', svgHeight)
      .attr('width', svgWidth)
      .append('g')
      .attr('class', 'big-timeline')

    // create x scale (linear)
    const xScale = getXScale()

    // create y scale (three levels? discreet) (need scale but dont need axis)
    var yScale = d3
      .scaleLinear()
      .domain([0, 3])
      .range([svgHeight / 2, 0])

    // draw the x axis
    svg
      .append('g')
      .attr('class', 'big-axis')
      .attr('transform', 'translate(0,' + svgHeight / 2 + ')')
      .call(d3.axisBottom(xScale))

    // then plot lines (as if scatter graph)
    svg
      .selectAll('line')
      .data(data, (d: any) => d.id)
      .enter()
      .append('line')
      .attr('x1', (d) => xScale(new Date(d.startYear, 0, 0)))
      .attr('x2', (d) => xScale(new Date(d.startYear, 0, 0)))
      .attr('y1', (d) => yScale(d.level))
      .attr('y2', (d) => yScale(d.level) + 10 * d.level)
      .attr('stroke-width', 2)
      .attr('stroke', 'linen')

    // labels
    svg
      .selectAll('text')
      .data(data, (d: any) => d.id)
      .enter()
      .append('text')
      .text((d) => d.title)
      .attr('x', (d) => xScale(new Date(d.startYear, 0, 0)))
      .attr('y', (d) => yScale(d.level) + 10 * d.level + 5)
      .attr('fill', 'linen')
      .attr('text-anchor', 'middle')
      .attr('font-size', 8)

    var wrap = textwrap().bounds({ height: 100, width: 100 })

    // wrap all text
    d3.selectAll('text').call(wrap)
    d3.selectAll('foreignObject').attr('transform', 'translate(-50,0)')
  }

  useEffect(() => {
    drawTimeline()
    drawBrushableTimeline()
  }, [])

  function drawBrushableTimeline() {
    // draw mini timeline
    const svg = d3.select('svg')
    console.log('svg:', svg)

    // svg.append('g').attr('brushable-group')
    // create x scale (linear)
    const xScale = d3
      .scaleTime()
      .domain([new Date(min, 0, 0), new Date(max, 0, 0)])
      .range([sidePadding, svgWidth - sidePadding])

    // create y scale (three levels? discreet) (need scale but dont need axis)
    var mini_yScale = d3
      .scaleLinear()
      .domain([0, 3])
      .range([svgHeight - 50, svgHeight - 100])

    // draw the x axis
    svg
      .append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + (svgHeight - 50) + ')')
      .call(d3.axisBottom(xScale))

    // then plot lines (as if scatter graph)
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

    // draw box that you can drag along the timeline

    const brush = d3
      .brushX()
      .extent([
        [sidePadding, svgHeight - 150], // [x0, y0] is the top-left corner and
        [svgWidth - sidePadding, svgHeight - 10], //[x1, y1] is the bottom-right corner
      ])
      .on('brush', brushed)
      .on('end', brushended)

    const defaultSelection = [svgWidth / 2 - 50, svgWidth / 2 + 50] // on page load what it selects

    svg.append('g').call(brush).call(brush.move, defaultSelection)

    function brushended({ selection }) {
      // if (!selection) {
      //   gb.call(brush.move, defaultSelection)
      // }
    }

    function brushed({ selection }) {
      // this is where the graph should get updated...
      // selection gets the coordinates of what the brush is covering
      const xTranslate = xScale.invert(selection[0]).getFullYear()
      // const newMax = xScale.invert(selection[1]).getFullYear()

      setXTranslate(xTranslate)
      // setNewMax(newMax)
      // if (selection) {
      //   svg.property(
      //     'value',
      //     selection.map(xScale.invert, xScale).map(d3.utcDay.round)
      //   )
      //   svg.dispatch('input')
      // }
    }
    // draw a window below
    // make the window display whats in the box more zoomed in...
  }

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
