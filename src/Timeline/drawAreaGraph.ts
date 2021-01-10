import { getXScale } from './xScale'
import * as d3 from 'd3'
import { incarcerations } from '../data'
import {
         bigTimelineHeight,
         svgWidth,
         miniYBottom,
         miniYTop } from './variables'



export const drawAreaGraph = (type, minX, maxX) => {
  const xScale = getXScale(minX, maxX)

  const yearIntoXScale = (year) => xScale(new Date(year, 0, 0))
  const isMini = type === 'mini'
  const bottom = isMini ? miniYBottom : bigTimelineHeight

  const yScaleForArea = getYScaleForArea(isMini)

  const area = d3
    .area()
    .x((d: any) => yearIntoXScale(+d.year))
    .y0(bottom)
    .y1((d: any) => yScaleForArea(d.total))
    .curve(d3.curveCardinal)

  d3.select(`.${type}-timeline`)
    .append('g')
    .attr('class', 'incarcerations-group')
    .selectAll(`${type}-area`)
    .data([incarcerations])
    .join('path')
    .attr('class', `${type}-area`)
    .attr('d', (d: any) => area(d))
    .attr('fill', 'white')
    .attr('stroke', 'white')
    .attr('stroke-opacity', 1)
    .attr('fill-opacity', 0.1)

    // ---------BIG TIMELINE draw the y axis-----------------------------------------------------------------

    // if(type=='big'){
    //   d3.select(`.${type}-timeline`)
    //     .append('g')
    //     .attr('class', 'big-axis-y')
    //     .attr('transform', `translate(${svgWidth},0)`)
    //     .transition().duration(1000)
    //     .call(d3.axisLeft(yScaleForArea).ticks(10, "s"));
    // }

    if(type=='big'){
      d3.select(".big-axis-y")
        .call(d3.axisLeft(yScaleForArea).ticks(10, "s"));
    }

}


// const yScaleCount = d3.scaleLinear().domain(d3.extent(incarcerations, d=> +d.total)).range([bigTimelineHeight, 0]);


export function getYScaleForArea(isMini, isRate = true) {
  const bottom = isMini ? miniYBottom : bigTimelineHeight
  const top = isMini ? miniYTop : 0

  const rateExtent = [0,1];
  const popExtent = [0,2400000];

  return d3
    .scaleLinear()
    .domain(isRate ? rateExtent : popExtent)
    .range([bottom, top])
}
