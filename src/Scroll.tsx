import React, { useState, useEffect } from 'react'
import textures from 'textures'
import './styles.css'
import { Scrollama, Step } from 'react-scrollama';
import * as d3 from 'd3';
import forceBounds from "./bounds"


export function Scroll() {

const width = 700;
const height = 400;

const [currentStepIndex, setCurrentStepIndex] = useState(0); // to track current step
const steps = [1, 2, 3, 4]; // to track the steps

let simulation;

 // dummy data
var forceData = [
  ...Array(100)
    .fill(1)
    .map((index) => ({
      id: index,
      index: index
    })),
]


const drawCircles = (radius, number, color) => {

  d3.select('#scroll-svg').selectAll(".circles")
     .data(forceData)
     .join('circle')
     .attr("class", "circles")
     .transition().duration(500)
     .attr("r", radius)
     .attr("stroke","black")
     .attr("stroke-width","0.1px")
     .attr('fill', (d, i) => (i <= number ? color:'#fff'))

  simulation = d3
   .forceSimulation(forceData) //change to innerdata if want to use x and y force
   .force('collide', d3.forceCollide().radius(9).strength(1)) //collide is to prevent overlap
   .force('x', d3.forceX((d,i)=>i <= number?100:350).strength(0.1))
   .force('y',d3.forceY(height / 2).strength(0.1))
   .alphaDecay(.03);

   simulation.on('tick', forceTick)

}

useEffect(() => {

   d3.select('#scroll-svg').attr("width",width).attr("height",height)
   drawCircles(0,4,'#4c8eb0')
//
}, [])


function forceTick() {
  d3.select('#scroll-svg').selectAll(".circles").attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y)
}

const onStepEnter = ({ data }) => {

  setCurrentStepIndex(data);

  const circleSize = 7;
  let amountColored;
  let color;

  switch (data) {
      case 1:
        color = '#4c8eb0'
        amountColored = 4
        break

      case 2:
        color = '#4c8eb0'
        amountColored = 24
        break

      case 3:
        color = '#8cd2b5'
        amountColored = 6
        break

      case 4:
        color = '#8cd2b5'
        amountColored = 40
        break
    }

    drawCircles(circleSize,amountColored,color)

};

const onStepExit = ({ direction, data }) => {
  if (direction === 'up' && data === steps[0]) { //if it's the first step
    setCurrentStepIndex(0);
  }
};


return (
<div className="scroll">
  <p className="intro">
   Here are some numbers that shows a prison system without boundaries and that is inherently biased.
  </p>
  <p className="pageSubtitle">Scroll ↓</p>
  <div className="graphicContainer">
    <div className="scroller">
      <Scrollama
        onStepEnter={onStepEnter}
        onStepExit={onStepExit}
        offset={0.4}
      >
        {steps.map(step => {
          const isVisible = step === currentStepIndex;
          const background = '#dddada';
          const opacity = isVisible? 1:0.4;
          const content = [' US is 5% of world population',
                           'but 25% of worlds prison population',
                           'Black males account for 6.5% of us pop',
                           'but 40.2% of prison pop']
          return (
            <Step data={step} key={step}>
              <div className="step" style={{ background, opacity }}>
                <p> {content[step-1]}</p>
              </div>
            </Step>
          );
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
