import React, { useRef, useState, useEffect } from 'react'
import './styles.css'
import { Scrollama, Step } from 'react-scrollama';
import * as d3 from 'd3';
import ResizeObserver from "resize-observer-polyfill";


export function Scroll() {



const width = 700;
const height = 400;
const svgRef = useRef()

const forceNodes = [
  ...Array(100)
    .fill(1)
    .map((index) => ({ id: index })),
]
const forceData = forceNodes.map((d, i) => {
  const isColored = i <5
  return {
    index: i,
    x: isColored ? 200 : 400,
    y: height / 2,
  }
})


const [data, setData] = useState(0);
const [nodeData, setNodeData] = useState(forceData)
const [steps, setSteps] = useState([10, 20, 30]);
const [progress, setProgress] = useState(0);

var svg;
var circles;
var simulation;


useEffect(() => {

   setNodeData(forceData);
   svg = d3.select(svgRef.current).attr("width",width).attr("height",height)

   circles = svg.selectAll(".circles")
      .data(nodeData)
      .join('circle')
      .attr('cx', (d: any) => d.x)
      .attr('cy', (d: any) => d.y)
      .attr("class", "circles")
      .attr("r", 10)
      .attr("stroke","black")
      .attr("stroke-width","0.1px")
      .attr('fill', (d, i) => (i == 0 ? 'linen' : 'coral'))


   simulation = d3
    .forceSimulation(nodeData) //.force(name, method)
    .force('collide', d3.forceCollide().radius(10)) //collide is to prevent overlap
    .force('x', d3.forceX(d=>d.x))
    .force('y',d3.forceY(d=>d.y))

      simulation.on('tick', forceTick)


//
}, []) //at first I placed nodeData here but whenever I use setNodeData I get an error
// what is the best way to update the force data?




function forceTick() {
  svg.selectAll(".circles").attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y)
}


const onStepEnter = ({ data }) => {
  setData(data);


  if(data == 10){

  }

  if(data==20){


        const forceData2 = forceNodes.map((d, i) => {
          const isColored = i <25
          return {
            index: i,
            x: isColored ? 200 : 400,
            y: height / 2,
          }
        })

        simulation = d3.forceSimulation(forceData2);
        simulation //.force(name, method)
         .force('collide', d3.forceCollide().radius(10)) //collide is to prevent overlap
         .force('x', d3.forceX(d=>d.x))
         .force('y',d3.forceY(d=>d.y))

        circles
        .data(forceData2)
        .join('circle')
        .attr("class", "circles")
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y)
        .attr("r", 10)
        .attr("stroke","black")
        .attr("stroke-width","0.5px");
  }

  if(data==30){

    // circles
    // .data(forceData2)
    // .join('circle',
    // update => update
    // .attr("fill", "red"),
    //     enter => enter
    //         .attr("fill", "green")
    //         .attr("r", 20)) //only either update or enter is read, whichever one comes first, why?
    // .attr("class", "circles")
    // .attr('cx', (d: any) => d.x)
    // .attr('cy', (d: any) => d.y)
    // .attr("r", 10)
    // .attr("stroke","black")
    // .attr("stroke-width","0.5px");

    const forceNodes3 = [
      ...Array(28)
        .fill(1)
        .map((index) => ({ id: index })),
    ]
    const forceData3 = forceNodes3.map((d, i) => {
      const isColored = i === 0
      return {
        index: i,
        x: isColored ? 200 : 300,
        y: height / 2,
      }
    })

    simulation = d3.forceSimulation(forceData3);
    simulation //.force(name, method)
     .force('collide', d3.forceCollide().radius(20)) //collide is to prevent overlap
     .force('x', d3.forceX(d=>d.x))
     .force('y',d3.forceY(d=>d.y))

      circles = svg.selectAll(".circles").data(forceData3);
      circles.exit().transition().duration(600).attr("r", 0).remove();
      circles.transition().duration(600)
              .attr("fill","red")
              .attr("r", 10)
              .attr("opacity", 1);

      circles.enter().append("circle").attr("class", "circles")
          .attr("fill","green")
          .attr("r", 20)
          .attr("opacity", 1);

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
<div>
  <p className="intro">
    Art party irony synth, scenester man bun jean shorts tacos copper mug try-hard whatever. Bitters small batch vegan fanny pack, meditation occupy locavore pickled raclette deep v cornhole marfa butcher fixie ennui. Snackwave iPhone prism bushwick chia.
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
        debug
      >
        {steps.map(value => {
          const isVisible = value === data;
          const background = isVisible
            ? `rgba(44,127,184, ${progress})`
            : 'white';
          const visibility = isVisible ? 'visible' : 'hidden';
          return (
            <Step data={value} key={value}>
              <div className="step" style={{ background }}>
                <p>step value: {value}</p>
                <p style={{ visibility }}>
                  {Math.round(progress * 1000) / 10 + '%'}
                </p>
              </div>
            </Step>
          );
        })}
      </Scrollama>
    </div>
    <div className="graphic">
      <p>{data}</p>
      <svg ref={svgRef} />
    </div>
  </div>
</div>
)
}
