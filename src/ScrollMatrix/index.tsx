import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import * as d3 from 'd3'
import 'intersection-observer'
import scrollama from 'scrollama' // or...
import { manBodyD } from '../assets/man-icon'

export const ScrollMatrix = () => {
  const data = d3.range(100)
  useEffect(() => {
    drawPeople()
    setUpScroll()
  }, [])

  function drawPeople() {
    const dotsPerRow = 20
    const iconWidth = 20
    const iconHeight = 40
    const leftBoxPadding = 40
    const topBoxPadding = 40

    const svgWidth = 700
    const svgHeight = 500
    const svg = d3
      .select('#scroll-matrix')
      .attr('width', svgWidth)
      .attr('height', svgHeight)

    svg
      .selectAll('path')
      .data(data)
      .enter()
      .append('path')
      .attr('d', manBodyD)
      .attr('id', (d, i) => `body-${i + 1}`)
      .attr('transform', (d, i) => {
        const x = leftBoxPadding + getX2Coordinate(i, dotsPerRow, iconWidth)

        const y = getY2Coordinate(i, dotsPerRow, iconHeight) + topBoxPadding
        return 'translate(' + x + ',' + y + ') scale(0.3)'
      })
      .attr('fill', 'lightsteelblue')

    svg
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('id', (d, i) => `head-${i + 1}`)
      .attr(
        'cx',
        (d, i) => leftBoxPadding + getX2Coordinate(i, dotsPerRow, iconWidth) + 5
      )
      .attr(
        'cy',
        (d, i) => getY2Coordinate(i, dotsPerRow, iconHeight) + topBoxPadding
      )
      .attr('r', 2.5)
      .attr('fill', 'lightsteelblue')
  }

  function getY2Coordinate(index, dotsPerRow, height) {
    const placeInCol = Math.floor(index / dotsPerRow)
    const padding = 5
    return placeInCol * (padding + height)
  }

  function getX2Coordinate(index, dotsPerRow, width) {
    const placeInRow = index % dotsPerRow
    const padding = 5
    return placeInRow * (width + padding)
  }

  function setUpScroll() {
    const scroller = scrollama()
    scroller
      .setup({
        step: '.step',
        debug: true, // this being true is what makes their dotted line show
        offset: 0.2, // where the dotted line shows up
        progress: true,
      })
      .onStepProgress((res: any) => {
        // make them go coral as you scroll down.
        const progressOneToHundred = Number((res.progress * 100).toFixed(0))
        const svg = d3.select('#scroll-matrix')

        if (res.index === 0) {
          d3.range(progressOneToHundred + 1).forEach((n) => {
            if (n < 6) {
              svg.select(`#head-${n}`).attr('fill', 'coral')
              svg.select(`#body-${n}`).attr('fill', 'coral')
            }
          })
        }

        if (res.index === 1) {
          d3.range(progressOneToHundred + 1).forEach((n) => {
            if (n < 26) {
              svg.select(`#head-${n}`).attr('fill', 'coral')
              svg.select(`#body-${n}`).attr('fill', 'coral')
            }
          })
        }

        // return to blue when you scroll back up
        const blueIcons = d3.range(Number(progressOneToHundred) + 1, 101)

        blueIcons.forEach((n) => {
          if ((res.index === 1 && n < 6) || res.index === 0) {
            svg.select(`#head-${n}`).attr('fill', 'lightsteelblue')
            svg.select(`#body-${n}`).attr('fill', 'lightsteelblue')
          }
        })
      })
  }

  const steps = [
    `US is 5% of world pop so you might expect them to make up 5% of the worlds prison population.`,
    `but they make up 25% of worlds prison population meaning 1 in 4 prisoners are American, highest incarceration rate in the world. `,
  ]
  return (
    <>
      <Intro />
      <Scroll id="scroll">
        <Article>
          {steps.map((s, i) => {
            return (
              <Box className="step" key={i}>
                <P>{s}</P>
              </Box>
            )
          })}
        </Article>
        <Svg id="scroll-matrix" />
      </Scroll>
      <Outro />
    </>
  )
}

const Scroll = styled.div`
  position: relative;
  border-top: 2px dashed #000;
  border-bottom: 2px dashed #000;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
`
const Outro = styled.div`
  height: 1200px;
`
const Box = styled.div`
  margin: 0 auto 700px auto;
  border: 2px solid pink;
`
const P = styled.p`
  position: sticky;
  top: 200px;
  height: 100px;
  border: 2px solid red;
  margin-bottom: 400px;
`
const Article = styled.div`
  padding: 50px;
  margin: 0 50px;
  width: 200px;
  border-right: 2px solid linen;
  color: linen;
`
const Intro = styled.div`
  max-width: 40rem;
  margin: 1rem auto;
  text-align: center;
  margin-bottom: 100px;
`
const Svg = styled.svg`
  position: sticky;
  top: 200px;
  height: 500px;
`
