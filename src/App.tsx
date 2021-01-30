import React from 'react'
import styled from 'styled-components'
import { RaceContext } from './RaceContext/RaceContext'
import './styles.css'
import './index.css'
import { TimeContext } from './TimeContext/TimeContext'
import { Timeline } from './Timeline/Timeline'
import { WorldContextMatrix } from './WorldContext/WorldContextTwo'
import { svgWidth } from './Timeline/variables'
import { cream } from './styles'
import { ScrollMatrix } from './ScrollMatrix'

function App() {
  return (
    <AppContainer>
      <InnerContainer>
        <Title>13th Ammendment</Title>
        <Timeline />
        {/* would be good to add in a bar chart or soemthing that compares us incarceration rate to other countries... cant seem to get data in right structure (only in pdfs) */}
        <WorldContextMatrix />
        <TimeContext />
        <RaceContext />
        <ScrollMatrix />
      </InnerContainer>
    </AppContainer>
  )
}

export default App

const AppContainer = styled.div`
  background-color: #282c34;
  min-height: 100vh;
`
const InnerContainer = styled.div`
  width: ${svgWidth}px;
  margin: auto;
  display: grid;
  justify-items: center;
`

const Title = styled.h1`
  color: ${cream};
  text-align: left;
  width: 100%;
`
