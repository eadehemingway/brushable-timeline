import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { data } from './data'
import * as d3 from 'd3'
import textures from 'textures'
// import { textwrap } from 'd3-textwrap'
import { annotation, annotationLabel } from 'd3-svg-annotation'
import './styles.css'
import _ from 'lodash'

function App() {
  const sidePadding = 100
  const svgWidth = 1000
  const svgHeight = 500

  // this min and max year refers to the big timeline
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

    // const margin = { left: 50, top: 50, right: 200, bottom: 20 }
    // const annotationData = _.chain(data)
    //   .filter((d) => d.level == 1)
    //   .map((d, i) => {
    //     return {
    //       data: { startYear: d.startYear },
    //       note: { title: d.title, align: 'middle', orientation: 'leftright' },
    //       x: xScale(d.startDate),
    //       y:
    //         i % 2 == 0
    //           ? margin.top + (svgHeight - margin.top - margin.bottom) / 2
    //           : margin.top,
    //       dx: 20,
    //       dy: 0,
    //     }
    //   })
    //   .value()

    // const makeAnnotations = annotation()
    //   .type(annotationLabel)
    //   .annotations(annotationData)

    // d3.select('svg')
    //   .append('g')
    //   .attr('class', 'annotation-group')
    //   .call(makeAnnotations as any)
  }, [getXScale])

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

    const defaultSelection = [svgWidth / 2 - 50, svgWidth / 2 + 50] // on page load what it selects

    svg.append('g').call(brush).call(brush.move, defaultSelection)

    function brushed({ selection }) {
      const xYearMin = xScale.invert(selection[0]).getFullYear()
      const xYearMax = xScale.invert(selection[1]).getFullYear()
      setYearMin(xYearMin)
      setYearMax(xYearMax)
    }
  }, [getXScale])

  useEffect(() => {
    drawTimeline()
    drawBrushableTimeline()
  }, [drawTimeline, drawBrushableTimeline])

  const updateTimeline = useCallback(() => {
    // update timeline
    const newxscale = getXScale(yearMin, yearMax)
    // upate axis
    d3.select('.big-axis').call(d3.axisBottom(newxscale))

    // update lines
    d3.selectAll('.big-timeline-line')
      .attr('x1', (d: any) => newxscale(new Date(d.startYear, 0, 0)))
      .attr('x2', (d: any) => newxscale(new Date(d.startYear, 0, 0)))

    // // update labels
    d3.selectAll('.big-timeline-labels').attr('x', (d: any) =>
      newxscale(new Date(d.startYear, 0, 0))
    )
    // const red = textures.lines().lighter().size(8).stroke('#EB6A5B')

    // d3.select('svg').call(red)
    // // update labels
    // d3.selectAll('.annotation-note-bg')
    //   .attr('fill', red.url())
    //   .attr('fill-opacity', 1)
  }, [yearMin, yearMax, getXScale])

  useEffect(() => {
    updateTimeline()
  }, [updateTimeline])

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
