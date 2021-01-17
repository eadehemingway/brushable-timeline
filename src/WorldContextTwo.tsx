import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import _ from 'lodash'

import Matrix from './Matrix'
import { Subheading, SubheadingWrapper, Svg } from './styles'

export function WorldContextMatrix() {
  const svgId = 'world-context'
  const [svgRef, setSvgRef] = useState<any>()
  const svgWidth = svgRef && svgRef?.clientWidth

  const quarterSvgWidth = svgWidth / 4

  return (
    <>
      <SubheadingWrapper>
        <Subheading>
          {' '}
          - US is 5% of world pop but 25% of worlds prison population (I.e. 1 in
          4 prisoners are American, highest in the world)
        </Subheading>
      </SubheadingWrapper>

      <Matrix
        percentage={5}
        range={100}
        svgId={svgId}
        x1={quarterSvgWidth - 200}
        matrixId={'world-pop'}
      />
      <Matrix
        percentage={25}
        range={100}
        svgId={svgId}
        x1={quarterSvgWidth * 3 - 200}
        matrixId={'world-prison-pop'}
      />
      <Svg ref={(ref) => setSvgRef(ref)} id={svgId} />
    </>
  )
}
