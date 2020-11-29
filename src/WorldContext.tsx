import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'

export function WorldContext() {
  return (
    <>
      <p>
        {' '}
        - US is 5% of world pop but 25% of worlds prison population (I.e. 1 in 4
        prisoners are American, highest in the world)
      </p>
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
