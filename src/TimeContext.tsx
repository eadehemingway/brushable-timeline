import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'

export function TimeContext() {
  return (
    <>
      <p>
        {' '}
        - 1972 was 300,000 2016 2.3 mil (could show as line graph, could do in
        parallel with timeline?) should show in relation to increase in
        population
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
