import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { data, periodChunks, incarcerations } from './data'
import * as d3 from 'd3'
import textures from 'textures'
// import { textwrap } from 'd3-textwrap'
import { annotation, annotationLabel } from 'd3-svg-annotation'
import './styles.css'
import _ from 'lodash'

export function Timeline() {

  const marginLeft = 100
  const svgWidth = 1000
  const svgHeight = 500
  const textureColors = ['#EB6A5B', '#4d5382', '#813405', '#f9a03f']
  const bigTimelineHeight = 250
  const startYears = data.map((d) => d.startYear)
  const yScaleCount = d3.scaleLinear().domain(d3.extent(incarcerations, d=> +d.total)).range([bigTimelineHeight, 0]);


  const minYearInData = Math.min(...startYears)
  const maxYearInData = Math.max(...startYears)
  // this min and max year refers to the big timeline
  const [yearMin, setYearMin] = useState<number>(1950)
  const [yearMax, setYearMax] = useState<number>(1960)

  const getXScale = useCallback(
    (min, max) =>
      d3
        .scaleTime()
        .domain([new Date(min, 0, 0), new Date(max, 0, 0)])
        .range([0, svgWidth]), //I added 10 here so the last annotation doesn't get cut off
    []
  )
  const getClosedLabelHeight = useCallback((title) => {
    const lines = title.trim().length / 30
    const lineHeight = 18
    const textHeight = lineHeight * lines
    const padding = 30
    const closedLabelHeight = textHeight + padding
    return Math.max(closedLabelHeight, 50)
  }, [])

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

    const xScale = getXScale(yearMin, yearMax)
    const yearIntoXScale = (year) => xScale(new Date(year, 0, 0))

    const yScale = d3.scaleLinear().domain([-1, 5]).range([bigTimelineHeight, 0])

    // const line = d3.line()
    //           .x((d: any)=>yearIntoXScale(+d.year))
    //           .y((d: any)=>yScaleCount(+d.total))
    //           .curve(d3.curveCardinal);

    const area = d3.area()
              .x((d: any)=>yearIntoXScale(+d.year))
              .y0(bigTimelineHeight)
              .y1((d: any)=>yScaleCount(+d.total))
              .curve(d3.curveCardinal);

    // ---------BIG TIMELINE draw textured bgs-----------------------------------------------------------------

    bigTimelineGroup
      .selectAll('.big-tm-textured-bg')
      .data(periodChunks)
      .enter()
      .append('rect')
      .attr('class', 'big-tm-textured-bg')
      .attr('x', (d: any) => yearIntoXScale(d.startYear))
      .attr('y', 0)
      .attr('height', bigTimelineHeight)
      .attr(
        'width',
        (d: any) => yearIntoXScale(d.endYear) - yearIntoXScale(d.startYear)
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

    bigTimelineGroup
      .append('g')
      .attr('class', 'big-axis-y')
      .attr('transform', `translate(${svgWidth-35},0)`)
      .call(d3.axisRight(yScaleCount).ticks(10, "s"));


    // ---------BIG TIMELINE plot lines-----------------------------------------------------------------
    bigTimelineGroup
      .append('g')
      .attr('class', 'big-timeline-line-group')
      .selectAll('line')
      .data(data, (d: any) => d.id)
      .enter()
      .append('line')
      .attr('class', 'big-timeline-line')
      .attr('x1', (d) => yearIntoXScale(d.startYear))
      .attr('x2', (d) => yearIntoXScale(d.startYear))
      .attr('y1', (d) => yScale(d.level))
      .attr('y2', (d) => yScale(d.level) + 15)
      .attr('stroke-width', 3)
      .attr('stroke', 'lightgray')

    bigTimelineGroup
      .append('g')
      .attr('class','incarcerations-group')
      .selectAll("path.area")
      .data([incarcerations])
      .join("path")
      .attr("class","area")
      .attr("d", (d: any)=> area(d))
      .attr("fill", "white")
      .attr("stroke", "white")
      .attr("stroke-opacity",1)
      .attr("fill-opacity",0.1)

    // ---------BIG TIMELINE draw labels-----------------------------------------------------------------
    drawAnnotations(yearIntoXScale, yScale)
  }, [getXScale])

  const openAnnotation = useCallback((textOrRectSelection) => {
    const labelParentGroup = d3.select(
      textOrRectSelection?.parentNode?.parentNode?.parentNode
    )
    labelParentGroup.raise()

    const backgroundRects = labelParentGroup.select('.annotation-note-bg')

    backgroundRects
      .transition()
      .duration(300)
      .attr('fill-opacity', 1)
      .attr('height', (d: any) => {
        const title = d.note.title
        const titleLength = title.trim().length
        const descriptionLength = d.note.label.trim().length

        if (!descriptionLength) return getClosedLabelHeight(title)
        const textHeight = titleLength + descriptionLength
        const rectHeight = textHeight / 2.7 + 60 // bit hacky - using the text length to try to calculate the rect height
        return Math.max(rectHeight, 50)
      })

    const descriptions = labelParentGroup.select('.annotation-note-label')
    descriptions
      .transition()
      .duration(750)
      .attr('opacity', 1)
      .attr('display', 'block')
  }, [])

  const closeAnnotation = useCallback((parentGroup) => {
    parentGroup
      .select('.annotation-note-bg')
      .transition()
      .duration(300)
      .attr('height', (d) => {
        return getClosedLabelHeight(d.note.title)
      })
      .attr('fill-opacity', 0.7)

    parentGroup.select('.annotation-note-label').transition().attr('opacity', 0)
  }, [])

  const drawBrushableTimeline = useCallback(() => {
    const svg = d3.select('svg')
    // ---------SMALL TIMELINE create scales-----------------------------------------------------------------

    const mini_xScale = getXScale(minYearInData, maxYearInData)
    const miniYearIntoXScale = (year) => mini_xScale(new Date(year, 0, 0))

    const mini_yScale = d3
      .scaleLinear()
      .domain([0, 3])
      .range([svgHeight - 50, svgHeight - 100])

    const mini_yScaleCount = d3.scaleLinear().domain(d3.extent(incarcerations, d=> +d.total)).range([svgHeight - 50, svgHeight - 150]);
    // const mini_line = d3.line()
    //           .x((d: any)=>miniYearIntoXScale(+d.year))
    //           .y((d: any)=>mini_yScaleCount(+d.total))
    //           .curve(d3.curveCardinal);

    const mini_area = d3.area()
              .x((d: any)=>miniYearIntoXScale(+d.year))
              .y0(svgHeight - 50)
              .y1((d: any)=>mini_yScaleCount(+d.total))
              .curve(d3.curveCardinal);

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
      .attr('x', (d: any) => miniYearIntoXScale(d.startYear))
      .attr('y', 350)
      .attr('height', 100)
      .attr(
        'width',
        (d: any) =>
          miniYearIntoXScale(d.endYear) - miniYearIntoXScale(d.startYear)
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
      .attr('x1', (d) => miniYearIntoXScale(d.startYear))
      .attr('x2', (d) => miniYearIntoXScale(d.startYear))
      .attr('y1', (d) => mini_yScale(d.level))
      .attr('y2', (d) => mini_yScale(d.level) + 10 * d.level)
      .attr('stroke-width', 2)
      .attr('stroke', 'lightgray')


    //

    svg
    .append('g')
    .attr('class','mini-incarcerations-group')
    .selectAll("path.miniarea")
    .data([incarcerations])
    .join("path")
    .attr("class","miniarea")
    .attr("d", (d: any)=> mini_area(d))
    .attr("fill", "white")
    .attr("stroke", "white")
    .attr("stroke-opacity",1)
    .attr("fill-opacity",0.1)

    // ---------SMALL TIMELINE draw brush-----------------------------------------------------------------

    const brush = d3
      .brushX()
      .extent([
        [0, svgHeight - 150], // [x0, y0] is the top-left corner and
        [svgWidth, svgHeight], //[x1, y1] is the bottom-right corner (the -10 makes it stop at end, not sure why 10)
      ])
      .on('brush', brushed)

    const defaultSelection = [
      miniYearIntoXScale(yearMin),
      miniYearIntoXScale(yearMax),
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

  const drawAnnotations = useCallback((yearIntoXScale, yScale) => {
    // get annotation data ======

    const annotationData = _.chain(data)
      .map((d, i) => {
        const dx = d.startYear === maxYearInData ? -250 : 20
        return {
          data: {
            startYear: d.startYear,
            description: d.description,
            title: d.title,
          },
          note: {
            title: `${d.title}. (${d.startYear})`,
            label: d.description,
            align: 'middle',
            orientation: 'leftright',
            wrap: 260,
            padding: 0,
            bgPadding: { top: 0, bottom: 0, left: 0, right: 0 },
          },
          x: yearIntoXScale(d.startYear),
          // y: yScale(d.level),
          y: yScale(d.level),
          dx: dx,
          dy: 0,
        }
      })
      .value()

    // draw annotations ======
    const makeAnnotations = annotation()
      .type(annotationLabel)
      .annotations(annotationData)

    d3.select('svg')
      .append('g')
      .attr('class', 'annotation-group')
      .call(makeAnnotations as any)

    const allAnnotationText = d3.selectAll('.annotation text')
    const wholeLabels = d3.selectAll('.label')
    const backgroundRects = d3.selectAll('.annotation-note-bg')
    const titles = d3.selectAll('.annotation-note-title')
    const descriptions = d3.selectAll('.annotation-note-label')
    const connectors = d3.selectAll('.connector')

    // annotation styles ==========
    allAnnotationText
      .attr('fill', 'lightgray')
      .attr('font-size', '10px')
      .attr('font-family', 'JosefinSans')
      .attr('transform', 'translate(15,15)')

    connectors.attr('stroke', 'lightgray')

    descriptions.attr('display', 'none').attr('opacity', 0)

    wholeLabels.style('cursor', 'pointer')

    backgroundRects
      .attr('fill', '#282c34')
      .attr('fill-opacity', 0.7)
      .attr('stroke-dasharray', (d: any) => {
        const description = d.note.label.trim()
        return description.length ? 2 : null
      })
      .attr('stroke', (d: any) => {
        const description = d.note.label.trim()
        return description.length ? '#f9a03f' : '#956025'
      })
      .attr('width', 210) // hard coding this because the wrap above seems to make the rect too big
      .attr('height', (d: any) => {
        return getClosedLabelHeight(d.note.title)
      }) // hard coding this (estimating the height of a title)
      .style('cursor', 'pointer')

    titles.style('cursor', 'pointer')

    // annotation mouse overs ========

    wholeLabels.on('mouseleave', function () {
      const parentGroup = d3.select(this)
      closeAnnotation(parentGroup)
    })

    backgroundRects.on('mouseover', function () {
      openAnnotation(this)
    })

    titles.on('mouseover', function () {
      openAnnotation(this)
    })
  }, [])
  useEffect(() => {
    drawBrushableTimeline()
    drawTimeline()
  }, [drawTimeline, drawBrushableTimeline])

  const updateTimeline = useCallback(() => {
    const newxscale = getXScale(yearMin, yearMax)
    const newYearIntoXScale = (year) => newxscale(new Date(year, 0, 0))
    // const selected_line = d3.line()
    //           .x((d: any)=>newYearIntoXScale(+d.year))
    //           .y((d: any)=>yScaleCount(+d.total))
    //           .curve(d3.curveCardinal);
    const selected_area = d3.area()
              .x((d: any)=>newYearIntoXScale(+d.year))
              .y0(bigTimelineHeight)
              .y1((d: any)=>yScaleCount(+d.total))
              .curve(d3.curveCardinal);

    // upate axis
    d3.select('.big-axis').call(d3.axisBottom(newxscale))

    // update lines
    d3.selectAll('.big-timeline-line')
      .attr('x1', (d: any) => newYearIntoXScale(d.startYear))
      .attr('x2', (d: any) => newYearIntoXScale(d.startYear))

      // update count path
      d3.selectAll('path.area')
        .attr("d", (d: any)=> selected_area(d));

    // update backgrounds
    d3.selectAll('.big-tm-textured-bg')
      .attr('x', (d: any) => newYearIntoXScale(d.startYear))
      .attr('width', (d: any) => {
        const initialVal =
          newYearIntoXScale(d.endYear) - newYearIntoXScale(d.startYear)
        return Math.max(initialVal, 100)
      })

    // update labels
    d3.selectAll('.label').attr('transform', (d: any) => {
      return `translate(${newYearIntoXScale(d.data.startYear)}, ${d.y})`
    })
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
