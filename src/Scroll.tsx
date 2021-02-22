import React, { useRef, useState, useEffect } from 'react'
import './styles.css'
import { Scrollama, Step } from 'react-scrollama'
import * as d3 from 'd3'
import forceBounds from './bounds'

export function Scroll() {
  const width = 700
  const height = 400

  const [currentStep, setCurrentStep] = useState(0) // to track current step
  const steps = [1, 2, 3, 4]

  let simulation

  // dummy data
  const forceData = [
    ...Array(100)
      .fill(1)
      .map((index) => ({
        id: index,
        index: index
      }))
  ]

  useEffect(() => {
    d3.select('#scroll-svg').attr('width', width).attr('height', height)
    drawCircles(0, 4, '#4c8eb0')
  }, [])

  const drawCircles = (radius, number, color) => {
    simulation = d3
      .forceSimulation(forceData) //change to innerdata if want to use x and y force
      .force('collide', d3.forceCollide().radius(11).strength(1)) //collide is to prevent overlap
      .force('bounds', forceBounds(200)) // if I add arguments  here it doesn't work so I need to do it directly in the source file

    simulation.on('tick', forceTick)

    d3.select('#scroll-svg')
      .selectAll('.circles')
      .data(forceData) //change to innerdata if want to use x and y force
      .join('circle')
      .attr('class', 'circles')
      .transition()
      .duration(1000)
      .attr('r', radius)
      .attr('stroke', 'black')
      .attr('stroke-width', '0.5px')
      .attr('fill', (d, i) => (i <= number ? color : '#fff'))
  }

  function forceTick() {
    d3.select('#scroll-svg')
      .selectAll('.circles')
      .attr('cx', (d: any) => d.x)
      .attr('cy', (d: any) => d.y)
  }

  const onStepEnter = ({ data }) => {
    setCurrentStep(data)
    let color
    let amountColor
    const circleSize = 10

    switch (data) {
      case 1:
        color = '#4c8eb0'
        amountColor = 4
        break

      case 2:
        color = '#4c8eb0'
        amountColor = 24
        break

      case 3:
        color = '#8cd2b5'
        amountColor = 6
        break

      case 4:
        color = '#8cd2b5'
        amountColor = 40
        break
    }

    drawCircles(circleSize, amountColor, color)
  }

  const onStepExit = ({ direction, exitingStep }) => {
    if (direction === 'up' && exitingStep === steps[0]) {
      setCurrentStep(0)
    }
  }

  return (
    <div className="scroll">
      <p className="intro">
        Here are some numbers that shows a prison system without boundaries and
        that is inherently biased.
      </p>
      <p className="pageSubtitle">Scroll ↓</p>
      <div className="graphicContainer">
        <div className="scroller">
          <Scrollama
            onStepEnter={onStepEnter}
            onStepExit={onStepExit}
            offset={0.4}
          >
            {steps.map((step) => {
              const isVisible = step === currentStep
              const background = '#dddada'
              const opacity = isVisible ? 1 : 0.4
              const content = [
                ' US is 5% of world population',
                'but 25% of worlds prison population',
                'Black males account for 6.5% of us pop',
                'but 40.2% of prison pop'
              ]
              return (
                <Step data={step} key={step}>
                  <div className="step" style={{ background, opacity }}>
                    <p> {content[step - 1]}</p>
                  </div>
                </Step>
              )
            })}
          </Scrollama>
        </div>
        <div className="graphic">
          <svg id="scroll-svg" />
        </div>
      </div>
    </div>
  )
}
