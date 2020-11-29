import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { data, periodChunks } from './data'
import * as d3 from 'd3'
import textures from 'textures'
// import { textwrap } from 'd3-textwrap'
import { annotation, annotationLabel } from 'd3-svg-annotation'
import './styles.css'
import _ from 'lodash'

export function Timeline() {
  const sidePadding = 0
  const svgWidth = 1000
  const svgHeight = 500
  const textureColors = ['#EB6A5B', '#4d5382', '#813405', '#f9a03f']
  const bigTimelineHeight = 250

  // this min and max year refers to the big timeline
  const [yearMin, setYearMin] = useState<number>(1950)
  const [yearMax, setYearMax] = useState<number>(1980)

  const getXScale = useCallback(
    (min, max) =>
      d3
        .scaleTime()
        .domain([new Date(min, 0, 0), new Date(max, 0, 0)])
        .range([sidePadding, svgWidth - 10]), //I added 10 here so the last annotation doesn't get cut off
    []
  )

  const drawTimeline = useCallback(() => {
    const bigTimelineGroup = d3
      .select('svg')
      .attr('height', svgHeight)
      .attr('width', svgWidth)
      .append('g')
      .attr('class', 'big-timeline')
      .attr('overflow', 'hidden')
      .attr('width', 100)

    // ---------BIG TIMELINE create scales-----------------------------------------------------------------

    const xScale = getXScale(1950, 1980)

    var yScale = d3.scaleLinear().domain([0, 3]).range([svgHeight, 0])

    // ---------BIG TIMELINE draw textured bgs-----------------------------------------------------------------

    bigTimelineGroup
      .selectAll('.big-tm-textured-bg')
      .data(periodChunks)
      .enter()
      .append('rect')
      .attr('class', 'big-tm-textured-bg')
      .attr('x', (d: any) => xScale(new Date(d.startYear, 0, 0)))
      .attr('y', 0)
      .attr('height', bigTimelineHeight)
      .attr(
        'width',
        (d: any) =>
          xScale(new Date(d.endYear, 0, 0)) -
          xScale(new Date(d.startYear, 0, 0))
      )
      .attr('fill', (d, i) => {
        const red = textures.lines().lighter().size(8).stroke(textureColors[i])
        d3.select('svg').call(red)
        return red.url()
      })

    // ---------BIG TIMELINE draw the x axis-----------------------------------------------------------------
    bigTimelineGroup
      .append('g')
      .attr('class', 'big-axis')
      .attr('transform', `translate(0,${svgHeight / 2})`)
      .call(d3.axisBottom(xScale))

    // ---------BIG TIMELINE plot lines-----------------------------------------------------------------
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
      .attr('y1', 0)
      .attr('y2', (d) =>
        d.level == 1 ? bigTimelineHeight / 3 : bigTimelineHeight / 2
      )
      .attr('stroke-width', 2)
      .attr('stroke', 'linen')

    // ---------BIG TIMELINE draw labels-----------------------------------------------------------------

    const annotationData = _.chain(data)
      .map((d, i) => {
        return {
          data: {
            startYear: d.startYear,
            description: d.description,
            title: d.title,
          },
          note: {
            title: d.title,
            label: d.description,
            align: 'middle',
            orientation: 'leftright',
            wrap: 240,
            padding: 0,
            bgPadding: { top: 0, bottom: 0, left: 0, right: 0 },
          },
          x: xScale(new Date(d.startYear, 0, 0)),
          // y: yScale(d.level),
          y: d.level === 1 ? bigTimelineHeight / 3 : bigTimelineHeight / 2,
          dx: 20,
          dy: 0,
        }
      })
      .value()

    // annotations -----------------------------------------------
    const makeAnnotations = annotation()
      .type(annotationLabel)
      .annotations(annotationData)

    d3.select('svg')
      .append('g')
      .attr('class', 'annotation-group')
      .call(makeAnnotations as any)

    d3.selectAll('.label')
      .on('mouseenter', function () {
        const selection = d3.select(this)
        selection.raise()
        selection
          .select('.annotation-note-bg')
          .transition()
          .duration(300)
          .attr('fill-opacity', 1)
        selection.style('cursor', 'pointer')
      })
      .on('mouseleave', function () {
        const selection = d3.select(this)
        selection
          .select('.annotation-note-bg')
          .transition()
          .duration(300)
          .attr('fill-opacity', 0.7)
        selection.style('cursor', 'auto')
      })

    d3.selectAll('.annotation text')
      .attr('fill', 'linen')
      .attr('font-size', '10px')
      .attr('transform', 'translate(10,10)')

    d3.selectAll('.annotation-note-bg')
      .attr('fill', '#282c34')
      .attr('stroke', 'white')
      .attr('stroke-dasharray', 2)
      .attr('fill-opacity', 0.7)
      .attr('stroke', '#f9a03f')
      .attr('fill-opacity', 1)

    // d3.selectAll('.annotation-note-label').attr('display', 'none')
  }, [getXScale])

  const drawBrushableTimeline = useCallback(() => {
    const startYears = data.map((d) => d.startYear)
    // console.log(startYears);
    const min = Math.min(...startYears)
    const max = Math.max(...startYears)

    const svg = d3.select('svg')
    // ---------SMALL TIMELINE create scales-----------------------------------------------------------------

    const mini_xScale = getXScale(min, max)
    var mini_yScale = d3
      .scaleLinear()
      .domain([0, 3])
      .range([svgHeight - 50, svgHeight - 100])

    // ---------SMALL TIMELINE draw axis-----------------------------------------------------------------

    svg
      .append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + (svgHeight - 50) + ')')
      .call(d3.axisBottom(mini_xScale))

    // ---------SMALL TIMELINE draw textured bgs-----------------------------------------------------------------

    svg
      .selectAll('.textured-bg-rects')
      .data(periodChunks)
      .enter()
      .append('rect')
      .attr('class', 'textured-bg-rects')
      .attr('x', (d: any) => mini_xScale(new Date(d.startYear, 0, 0)))
      .attr('y', 350)
      .attr('height', 100)
      .attr(
        'width',
        (d: any) =>
          mini_xScale(new Date(d.endYear, 0, 0)) -
          mini_xScale(new Date(d.startYear, 0, 0))
      )
      .attr('fill', (d, i) => {
        const red = textures.lines().lighter().size(8).stroke(textureColors[i])
        svg.call(red)
        return red.url()
      })

    // ---------SMALL TIMELINE draw lines-----------------------------------------------------------------

    svg
      .selectAll('.brush-lines')
      .data(data, (d: any) => d.id)
      .enter()
      .append('line')
      .attr('x1', (d) => mini_xScale(new Date(d.startYear, 0, 0)))
      .attr('x2', (d) => mini_xScale(new Date(d.startYear, 0, 0)))
      .attr('y1', (d) => mini_yScale(d.level))
      .attr('y2', (d) => mini_yScale(d.level) + 10 * d.level)
      .attr('stroke-width', 2)
      .attr('stroke', 'linen')

    // ---------SMALL TIMELINE draw brush-----------------------------------------------------------------

    const brush = d3
      .brushX()
      .extent([
        [sidePadding, svgHeight - 150], // [x0, y0] is the top-left corner and
        [svgWidth - sidePadding, svgHeight - 10], //[x1, y1] is the bottom-right corner
      ])
      .on('brush', brushed)

    const defaultSelection = [
      mini_xScale(new Date(1950, 0, 0)),
      mini_xScale(new Date(1980, 0, 0)),
    ] // on page load what it selects

    svg.append('g').call(brush).call(brush.move, defaultSelection)

    function brushed({ selection }) {
      // the value we get from the inverse xscale is for example Sat Dec 31 1864 00:00:00
      // when the year should be 1865 should try and work out why but for now, just adding one
      const xYearMin = mini_xScale.invert(selection[0]).getFullYear() + 1
      const xYearMax = mini_xScale.invert(selection[1]).getFullYear() + 1

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

    // update backgrounds
    d3.selectAll('.big-tm-textured-bg')
      .attr('x', (d: any) => newxscale(new Date(d.startYear, 0, 0)))
      .attr('width', (d: any) => {
        const initialVal =
          newxscale(new Date(d.endYear, 0, 0)) -
          newxscale(new Date(d.startYear, 0, 0))
        return Math.max(initialVal, 100)
      })

    //update labels
    d3.selectAll('.label').attr('transform', (d: any) => {
      return `translate(${newxscale(new Date(d.data.startYear, 0, 0))}, ${d.y})`
    })
    d3.selectAll('.annotation-note-content').attr('cursor', 'pointer')
    // .on('mouseover', function (d) {
    //   d3.select(this)
    //     .select('.annotation-note-label')
    //     .attr('display', 'block')
    // })
    // .on('mouseout', function (d) {
    //   d3.select(this).select('.annotation-note-label').attr('display', 'none')
    // })
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

const Container = styled.div`
  background-color: #282c34;
  height: 100vh;
  display: grid;
  justify-items: center;
`
const Svg = styled.svg`
  margin-top: 100px;
`