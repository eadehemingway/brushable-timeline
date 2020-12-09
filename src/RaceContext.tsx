import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import Matrix from './Matrix'

export function RaceContext() {
  const svgId = 'race-context'
  const [svgRef, setSvgRef] = useState<any>()
  const svgWidth = svgRef && svgRef?.clientWidth
  const quarterSvgWidth = svgWidth / 4

  return (
    <>
      <p>- (if white 1 in 17 chance of imprisonment, if black 1 in 3)</p>
      <p>- Black males account for 6.5% of us pop but 40.2% of prison pop</p>
      <Matrix
        percentage={1}
        range = {17}
        svgId={svgId}
        x1={quarterSvgWidth - 200}
        matrixId={'race-white'}
      />
      <Matrix
        percentage={1}
        range = {3}
        svgId={svgId}
        x1={quarterSvgWidth * 3 - 200}
        matrixId={'race-black'}
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
