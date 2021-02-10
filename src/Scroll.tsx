import React, { useRef, useState, useEffect } from 'react'
import textures from 'textures'
import './styles.css'
import { Scrollama, Step } from 'react-scrollama';
import * as d3 from 'd3';
import ResizeObserver from "resize-observer-polyfill";
import forceBounds from "./bounds"


export function Scroll() {

const width = 700;
const height = 400;
const svgRef = useRef()


const [data, setData] = useState(0); // to track current step
const [steps, setSteps] = useState([1, 2, 3, 4]); // to track the steps
const [progress, setProgress] = useState(0);

var svg;
var circles;
var simulation;

 // dummy data
var forceNodes = [
  ...Array(100)
    .fill(1)
    .map((index) => ({ id: index })),
]


var forceData = forceNodes.map((d, i) => {
 return {
   index: i,
   x: width/2,
   y: height / 2,
 }
})


const drawCircles = (radius, number, color) => {

  simulation = d3
   .forceSimulation(forceData) //change to innerdata if want to use x and y force
   .force('collide', d3.forceCollide().radius(9).strength(1)) //collide is to prevent overlap
   //.force('bounds',forceBounds(200)) // if I add arguments  here it doesn't work so I need to do it directly in the source file
   .force('x', d3.forceX((d,i)=>i <= number?100:300).strength(0.1))
   .force('y',d3.forceY(height / 2).strength(0.1))
   .alphaDecay(.03);

   simulation.on('tick', forceTick)

   svg.selectAll(".circles")
      .data(forceData) //change to innerdata if want to use x and y force
      .join('circle')
      .attr("class", "circles")
      .attr('cx', (d: any) => d.x)
      .attr('cy', (d: any) => d.y)
      .transition().duration(1000)
      .attr("r", radius)
      .attr("stroke","black")
      .attr("stroke-width","0.1px")
      .attr('fill', (d, i) => (i <= number ? color:'#fff'))
}

useEffect(() => {

   svg = d3.select(svgRef.current).attr("width",width).attr("height",height)
   drawCircles(0,4,'#4c8eb0')
//
}, [])


function forceTick() {
  svg.selectAll(".circles").attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y)
}

const onStepEnter = ({ data }) => {

  setData(data);

  if(data == 1){

    drawCircles(7,4,'#4c8eb0')

  }

  if(data==2){

    drawCircles(7,24,'#4c8eb0')
  }

  if(data==3){

    drawCircles(7,6,'#8cd2b5')

  }

  if(data==4){


    drawCircles(7,40,'#8cd2b5')

  }
};

const onStepExit = ({ direction, data }) => {
  if (direction === 'up' && data === steps[0]) {
    setData(0);
  }
};

const onStepProgress = ({ progress }) => {
  setProgress(progress);
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
        progress
        onStepProgress={onStepProgress}
        offset={0.4}
      >
        {steps.map(value => {
          const isVisible = value === data;
          const background = '#dddada';
          const opacity = isVisible? 1:0.4;
          //isVisible? '#afdefc':'#dddada';
            //{Math.round(progress * 1000) / 10 + '%'}
          const visibility = isVisible ? 'visible' : 'hidden';
          const content = [' US is 5% of world population',
                           'but 25% of worlds prison population',
                           'Black males account for 6.5% of us pop',
                           'but 40.2% of prison pop']
          return (
            <Step data={value} key={value}>
              <div className="step" style={{ background, opacity }}>
                <p> {content[value-1]}</p>
              </div>
            </Step>
          );
        })}
      </Scrollama>
    </div>
    <div className="graphic">
      <svg ref={svgRef} />
    </div>
  </div>
</div>
)
}
