import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'

export function RaceContext() {
  return (
    <>
      <p>- (if white 1 in 17 chance of imprisonment, if black 1 in 3)</p>
      <p>- Black males account for 6.5% of us pop but 40.2% of prison pop</p>
      <Svg />
    </>
  )
}

const Svg = styled.svg`
  width: 80vw;
  height: 400px;
  border: 1px solid #f9a03f;
  margin: 30px;
`
