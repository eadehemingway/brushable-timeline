import React from 'react'
import styled from 'styled-components'
import { RaceContext } from './RaceContext'
import './styles.css'
import './index.css'
import { TimeContext } from './TimeContext'
import { Timeline } from './Timeline/Timeline'
import { WorldContextMatrix } from './WorldContextTwo'
import { Scrollama, Step } from 'react-scrollama';
import { Scroll } from './Scroll'


function App() {


  return (
    <Container>
      <Timeline />
      {/* would be good to add in a bar chart or soemthing that compares us incarceration rate to other countries... cant seem to get data in right structure (only in pdfs) */}

      <Scroll />

      <WorldContextMatrix />
      <TimeContext />
      <RaceContext />
    </Container>
  )
}

export default App

const Container = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: grid;
  justify-items: center;
`
