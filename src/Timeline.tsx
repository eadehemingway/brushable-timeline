import React, { useRef, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { data, periodChunks, incarcerations } from './data'
import * as d3 from 'd3'
import textures from 'textures'
// import { textwrap } from 'd3-textwrap'
import { annotation, annotationLabel } from 'd3-svg-annotation'
import './styles.css'
import _ from 'lodash'
import ResizeObserver from 'resize-observer-polyfill'

export function Timeline() {
  const [lineData, setLineData] = useState('rate')

  const useResizeObserver = (ref) => {
    const [dimensions, setDimensions] = useState(null)
    useEffect(() => {
      const observeTarget = ref.current
      const resizeObserver = new ResizeObserver((entries) => {
        //set resized dimensions here
        entries.forEach((entry) => {
          setDimensions(entry.contentRect)
        })
      })
      resizeObserver.observe(observeTarget)
      return () => {
        resizeObserver.unobserve(observeTarget)
      }
    }, [ref])
    return dimensions
  }

  // I need to put anything that uses svg width taken from the dimensions in a useEffect hook
  //need help to do it

  const wrapperRef = useRef()
  const dimensions = useResizeObserver(wrapperRef)

  // the next two lines should be in the useEffect hook
  // if(!dimensions) return;
  // const svgWidth = dimensions.width;
  console.log(dimensions) //null for now since it's not in a useEffect hook so it doesn't update

  const svgWidth = 1330
  //small timeline width is based on this but not big timeline, why? I can't get the big and small timelines to be the same width
  // bc one dataset was until 2015 and the other 2016, so I got rid of the 2016 data
  const svgHeight = 600
  const textureColors = ['#EB6A5B', '#4d5382', '#813405', '#f9a03f']
  const bigTimelineHeight = 300
  const startYears = data.map((d) => d.startYear)
  const yScaleCount = d3
    .scaleLinear()
    .domain(d3.extent(incarcerations, (d) => +d.total))
    .range([bigTimelineHeight, 0])

  const minYearInData = Math.min(...startYears)
  const maxYearInData = Math.max(...startYears)

  const [yearMin, setYearMin] = useState<number>(1950)
  const [yearMax, setYearMax] = useState<number>(1960)

  const getXScale = useCallback(
    (min, max) =>
      d3
        .scaleTime()
        .domain([new Date(min, 0, 0), new Date(max, 0, 0)])
        .range([0, svgWidth]),
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

    // ---------BIG TIMELINE create scales-----------------------------------------------------------------

    const xScale = getXScale(yearMin, yearMax)
    const yearIntoXScale = (year) => xScale(new Date(year, 0, 0))

    const yScale = d3
      .scaleLinear()
      .domain([-1, 5])
      .range([bigTimelineHeight, 0])

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
        const color = textures
          .lines()
          .lighter()
          .size(8)
          .stroke(textureColors[i])
        d3.select('svg').call(color)
        return color.url()
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
      .attr('transform', `translate(${svgWidth},0)`)
      .call(d3.axisLeft(yScaleCount).ticks(10, 's'))

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

    // ---------BIG TIMELINE draw area line-----------------------------------------------------------------
    const area = d3
      .area()
      .x((d: any) => yearIntoXScale(+d.year))
      .y0(bigTimelineHeight)
      .y1((d: any) => yScaleCount(+d.total))
      .curve(d3.curveCardinal)

    bigTimelineGroup
      .append('g')
      .attr('class', 'incarcerations-group')
      .selectAll('path.area')
      .data([incarcerations])
      .join('path')
      .attr('class', 'area')
      .attr('d', (d: any) => area(d))
      .attr('fill', 'white')
      .attr('stroke', 'white')
      .attr('stroke-opacity', 1)
      .attr('fill-opacity', 0.1)

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

        // console.log(d.note.title.length)

        if (!descriptionLength) return getClosedLabelHeight(title)
        const textHeight = titleLength + descriptionLength
        let rectHeight = textHeight / 2.7 + 100 // bit hacky - using the text length to try to calculate the rect height

        if (title.length >= 60) {
          rectHeight = textHeight / 2.7 + 100
        } else if (title.length >= 30) {
          rectHeight = textHeight / 2.7 + 90
        } else {
          rectHeight = textHeight / 2.7 + 80
        } // also hacky, I use the length of the title to calculate the height of the rect
        //originally I want to use the number of children (tspan) that corresponds to the number of rows the title takes up, but couldn't figure out how to select it
        //title.children().length >= 3

        return Math.max(rectHeight, 70)
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

    const yBottom = svgHeight - 50
    const yTop1 = svgHeight - 100
    const yTop2 = svgHeight - 150

    const mini_yScale = d3.scaleLinear().domain([0, 3]).range([yBottom, yTop1])

    const mini_yScaleCount = d3
      .scaleLinear()
      .domain(d3.extent(incarcerations, (d) => +d.total))
      .range([yBottom, yTop2])

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
      .attr('y', yTop2)
      .attr('height', 100)
      .attr(
        'width',
        (d: any) =>
          miniYearIntoXScale(d.endYear) - miniYearIntoXScale(d.startYear)
        // why is it when i take minus startYear out it still works but the final chunk becomes longer?
      )
      .attr('fill', (d, i) => {
        const color = textures
          .lines()
          .lighter()
          .size(8)
          .stroke(textureColors[i])
        svg.call(color)
        return color.url()
      })

    svg
      .append('g')
      .attr('class', 'period-text')
      .selectAll('text.period')
      .data(periodChunks)
      .join('text')
      .attr('class', 'period')
      .attr('x', (d: any) => miniYearIntoXScale(d.startYear))
      .attr('y', yTop2 - 15) // move up a bit
      .attr('text-anchor', 'start')
      .attr('fill', (d, i) => textureColors[i])
      .attr('font-size', '11.5px')
      .attr('font-weight', 700)
      .text((d: any) => d.name)

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

    // ---------SMALL TIMELINE draw area line -----------------------------------------------------------------
    // const mini_yScaleCount = d3
    //   .scaleLinear()
    //   .domain(d3.extent(incarcerations, (d) => +d.total))
    //   .range([yBottom, yTop2])

    const mini_area = d3
      .area()
      .x((d: any) => miniYearIntoXScale(+d.year))
      .y0(yBottom)
      .y1((d: any) => mini_yScaleCount(+d.total))
      .curve(d3.curveCardinal)

    svg
      .append('g')
      .attr('class', 'mini-incarcerations-group')
      .selectAll('path.miniarea')
      .data([incarcerations])
      .join('path')
      .attr('class', 'miniarea')
      .attr('d', (d: any) => mini_area(d))
      .attr('fill', 'white')
      .attr('stroke', 'white')
      .attr('stroke-opacity', 1)
      .attr('fill-opacity', 0.1)

    // ---------SMALL TIMELINE draw brush-----------------------------------------------------------------

    const brush = d3
      .brushX()
      .extent([
        [0, yTop2], // [x0, y0] is the top-left corner and
        [svgWidth, yBottom], //[x1, y1] is the bottom-right corner
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
            wrap: 210, //change when change font size
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
      .attr('font-size', '11px')
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

    titles.style('cursor', 'pointer').attr('font-size', '12px')

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
    const selected_area = d3
      .area()
      .x((d: any) => newYearIntoXScale(+d.year))
      .y0(bigTimelineHeight)
      .y1((d: any) => yScaleCount(+d.total))
      .curve(d3.curveCardinal)

    // upate axis
    d3.select('.big-axis').call(d3.axisBottom(newxscale))

    // update lines
    d3.selectAll('.big-timeline-line')
      .attr('x1', (d: any) => newYearIntoXScale(d.startYear))
      .attr('x2', (d: any) => newYearIntoXScale(d.startYear))

    // update count path
    d3.selectAll('path.area').attr('d', (d: any) => selected_area(d))

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
      <div ref={wrapperRef}>
        <ToggleWrapper>
          <Label htmlFor="absolute-number">total population</Label>
          <Radio
            id="absolute-number"
            type="radio"
            value="on"
            name="number-rate"
            checked={lineData === 'rate'}
            onClick={() => setLineData('rate')}
          />
          <Label htmlFor="incarceration-rate">incarceration rate</Label>
          <Radio
            id="incarceration-rate"
            type="radio"
            value="off"
            name="number-rate"
            checked={lineData === 'absolute'}
            onClick={() => setLineData('absolute')}
          />
        </ToggleWrapper>
        <Svg />
      </div>
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
  width: 80vw;
  margin: 30px;
`
const ToggleWrapper = styled.div`
  margin-top: 100px;
  margin: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const Label = styled.label`
  color: linen;
  margin: 10px;
`
const Radio = styled.input`
  cursor: pointer;
  color: red;
  background: green;
  &:checked {
    color: red;
    background: pink;
  }
`
