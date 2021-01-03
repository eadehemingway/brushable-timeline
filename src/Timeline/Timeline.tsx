import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import * as d3 from 'd3'
import '../styles.css'
import { drawTimeline } from './drawTimeline'
import { drawBrushableTimeline } from './drawBrushableTimeline'
import { getXScale } from './xScale'
import { bigTimelineHeight } from './variables'
import { getYScaleForArea } from './drawAreaGraph'

export function Timeline() {
  const [isRate, setIsRate] = useState(true)
  const [yearMin, setYearMin] = useState<number>()
  const [yearMax, setYearMax] = useState<number>()

  useEffect(() => {
    drawTimeline()
    drawBrushableTimeline(setYearMin, setYearMax)
  }, [])

  const updateTimeline = useCallback(() => {
    const newxscale = getXScale(yearMin, yearMax)
    const newYearIntoXScale = (year) => newxscale(new Date(year, 0, 0))

    // upate axis
    d3.select('.big-axis').call(d3.axisBottom(newxscale))

    // update lines
    d3.selectAll('.big-timeline-line')
      .attr('x1', (d: any) => newYearIntoXScale(d.startYear))
      .attr('x2', (d: any) => newYearIntoXScale(d.startYear))

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

    //update area graph
    const yScaleForArea = getYScaleForArea(false)

    const selected_area = d3
      .area()
      .x((d: any) => newYearIntoXScale(+d.year))
      .y0(bigTimelineHeight)
      .y1((d: any) => {
        console.log(d)

        const data = isRate ? d.rate : d.total
        return yScaleForArea(data)
      })
      .curve(d3.curveCardinal)

    d3.selectAll('.big-area').attr('d', (d: any) => selected_area(d))
  }, [yearMin, yearMax])

  useEffect(() => {
    updateTimeline()
  }, [updateTimeline])

  return (
    <Container>
      <ToggleWrapper>
        <Label htmlFor="absolute-number">total population</Label>
        <Radio
          id="absolute-number"
          type="radio"
          value="on"
          name="number-rate"
          checked={isRate}
          onClick={() => setIsRate(true)}
        />
        <Label htmlFor="incarceration-rate">incarceration rate</Label>
        <Radio
          id="incarceration-rate"
          type="radio"
          value="off"
          name="number-rate"
          checked={!isRate}
          onClick={() => setIsRate(false)}
        />
      </ToggleWrapper>
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
