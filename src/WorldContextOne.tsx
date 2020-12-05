import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import ForceDirected from './ForceDirected'

export function WorldContextForce() {
  const svgId = 'world-context'
  const [svgRef, setSvgRef] = useState<any>()
  const svgWidth = svgRef && svgRef?.clientWidth

  const quarterSvgWidth = svgWidth / 4

  return (
    <>
      <p>
        {' '}
        - US is 5% of world pop but 25% of worlds prison population (I.e. 1 in 4
        prisoners are American, highest in the world)
      </p>
      <ForceDirected
        percentage={5}
        svgId={svgId}
        x={quarterSvgWidth}
        forceId={'world-pop'}
      />
      <ForceDirected
        percentage={25}
        svgId={svgId}
        x={quarterSvgWidth * 3}
        forceId={'world-prison-pop'}
      />
      <Svg ref={(ref) => setSvgRef(ref)} id={svgId} />
    </>
  )
}

const Svg = styled.svg`
  width: 80vw;
  height: 400px;
  border: 1px solid #f9a03f;
  margin: 30px;
`
