import React, { useEffect } from 'react'
import styled from 'styled-components'
import * as d3 from 'd3'
import 'intersection-observer'
import scrollama from 'scrollama' // or...
import { draw100People } from './draw100People'
import { stepZero } from './step0'
import { stepOne } from './step1'
import { stepTwo } from './step2'
import { stepThree } from './step3'
import { stepFour } from './step4'
import { stepFive } from './step5'
import { stepSix } from './step6'
import { stepSeven } from './step7'
import { stepEight } from './step8'
import { stepNine } from './step9'
import { non_american } from './variables'

export const ScrollMatrix = () => {
  useEffect(() => {
    const svgWidth = 700
    const svgHeight = 500
    d3.select('#scroll-matrix')
      .attr('width', svgWidth)
      .attr('height', svgHeight)
    draw100People(0, 'world-pop', non_american)
    setUpScroll()
  }, [])

  function setUpScroll() {
    const scroller = scrollama()
    const svg = d3.select('#scroll-matrix')
    scroller
      .setup({
        step: '.step',
        debug: true, // this being true is what makes their dotted line show
        offset: 0.2, // where the dotted line shows up
        progress: true
      })
      .onStepProgress((res: any) => {
        // scrolling down behaviour
        const progressOneToHundred = Number((res.progress * 100).toFixed(0))

        switch (res.index) {
          case 0:
            stepZero(svg, progressOneToHundred)
            return
          case 1:
            stepOne(svg, progressOneToHundred)
            return
          case 2:
            stepTwo(svg, progressOneToHundred)
            return
          case 3:
            stepThree(svg, progressOneToHundred)
            return
          case 4:
            stepFour(svg, progressOneToHundred)
            return
          case 5:
            stepFive(svg, progressOneToHundred)
            return
          case 6:
            stepSix(svg, progressOneToHundred)
            return
          case 7:
            stepSeven(svg, progressOneToHundred)
            return
          case 8:
            stepEight(svg, progressOneToHundred)
            return
          case 9:
            stepNine(svg, progressOneToHundred)
            return
        }
      })
  }

  const steps = [
    'of the 7bn people in the world, america makes up 5%',
    'if their prison population was proportional to this, you would expect their prison population to be 5%',
    'but it is five times higher. 25% of the worlds prison population are american.',
    'that means that 1 in 4 prisoners are american. This is the highest incarceration rate in the world. ',
    'of americas population, afro americans make up 13% ',
    'if the prison population was proportional it would be about the same ',
    'but it is much higher (say what percentage of prison population are black - male and female) ~33%',
    'and this is even more disproportionate for black males (6.5% of pop and 40.2% of prison pop)',
    'if you are a white american you have a one in 17 chance of going to prison ',
    'if you are black your chances are one in three'
  ]
  return (
    <>
      <Intro />
      <Scroll id="scroll">
        <Article>
          {steps.map((s, i) => {
            return (
              <Box className="step" key={i}>
                <P>
                  {i} - {s}
                </P>
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
  margin: 0 auto 100px auto;
  border: 2px solid pink;
  height: 700px;
`
const P = styled.p`
  position: sticky;
  top: 200px;
  height: 100px;
  // border: 2px solid red;
  // margin-bottom: 400px;
  margin: auto;
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
