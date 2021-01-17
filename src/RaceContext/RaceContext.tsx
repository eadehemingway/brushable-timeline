import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import Matrix from '../VisualisationTemplates/Matrix'
import { Subheading, SubheadingWrapper, Svg } from '../styles'

export function RaceContext() {
  const svgId = 'race-context'
  const [svgRef, setSvgRef] = useState<any>()
  const svgWidth = svgRef && svgRef?.clientWidth
  const quarterSvgWidth = svgWidth / 4

  return (
    <>
      <SubheadingWrapper>
        <Subheading>
          - (if white 1 in 17 chance of imprisonment, if black 1 in 3)
        </Subheading>
        <Subheading>
          - Black males account for 6.5% of us pop but 40.2% of prison pop
        </Subheading>
      </SubheadingWrapper>
      <Matrix
        percentage={1}
        range={17}
        svgId={svgId}
        x1={quarterSvgWidth - 200}
        matrixId={'race-white'}
      />
      <Matrix
        percentage={1}
        range={3}
        svgId={svgId}
        x1={quarterSvgWidth * 3 - 200}
        matrixId={'race-black'}
      />
      <Svg ref={(ref) => setSvgRef(ref)} id={svgId} />
    </>
  )
}
