import React from 'react'
import styled from 'styled-components'
import { RaceContext } from './RaceContext'
import './styles.css'
import './index.css'
import { TimeContext } from './TimeContext'
import { Timeline } from './Timeline/Timeline'
import { WorldContextMatrix } from './WorldContextTwo'
import { svgWidth } from './Timeline/variables'

function App() {
  return (
    <AppContainer>
      <InnerContainer>
        <Timeline />
        {/* would be good to add in a bar chart or soemthing that compares us incarceration rate to other countries... cant seem to get data in right structure (only in pdfs) */}
        <WorldContextMatrix />
        <TimeContext />
        <RaceContext />
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
