import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import * as d3 from 'd3'
import { cream, orange, Subheading, SubheadingWrapper, Svg } from '../styles'

export function TimeContext() {
  const svgRef = useRef()
  // const svgWidth = svgRef && svgRef?.clientWidth
  const width = 400
  const height = width
  const margin = { top: 20, left: 20, bottom: 20, right: 20 }
  const forceNodes = [
    ...Array(17)
      .fill(1)
      .map((index) => ({ id: index })),
  ]
  const forceData = forceNodes.map((d, i) => {
    const isColored = i === 0
    return {
      index: i,
      focusX: isColored ? 200 : 300,
      focusY: height / 2,
    }
  })

  useEffect(() => {
    const svg = d3.select(svgRef.current)
    // const xScale = d3.scaleBand().domain([0,1]).range([margin.left, width-margin.right]);

    const simulation = d3
      .forceSimulation(forceData) //.force(name, method)
      // .force('center',d3.forceCenter(width/2,height/2))
      .force('collide', d3.forceCollide().radius(10)) //collide is to prevent overlap
      .force(
        'x',
        d3.forceX().x((d, i) => (i == 0 ? 200 : 300))
      ) // usually I do this in the focusX / focusY properties in the dataset
      .force('y', d3.forceY().y(height / 2))
    // .force('x', d3.forceX(d=>d.focusX))
    // .force('y',d3.forceY(d=>d.focusY))
    // .alphaMin(.01)
    // .alphaDecay(.02);

    const circles = svg
      .selectAll('circle')
      .data(forceData)
      .join('circle')
      .attr('cx', (d: any) => d.x)
      .attr('cy', (d: any) => d.y)
      .attr('r', 10)
      .attr('fill', (d, i) => (i == 0 ? cream : orange))
      .attr('stroke', 'black')

    simulation
      // .nodes(forceData)
      .on('tick', forceTick)
    //the simulation engine adds the following properties to each node:
    // index: nodes index in the array
    // x: nodes x position
    // y: nodes y position
    // vx: nodes x velocity
    // vy: nodes y velocity
    console.log(forceData)

    function forceTick() {
      // console.log(simulation.alpha())
      circles.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y)
    }
  }, [forceNodes])

  return (
    <>
      <SubheadingWrapper>
        <Subheading>
          {' '}
          - 1972 was 300,000 2016 2.3 mil (could show as line graph, could do in
          parallel with timeline?) should show in relation to increase in
          population
        </Subheading>
      </SubheadingWrapper>

      <Svg ref={svgRef}></Svg>
    </>
  )
}
