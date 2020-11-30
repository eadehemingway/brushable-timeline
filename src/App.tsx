import React from 'react'
import styled from 'styled-components'
import { RaceContext } from './RaceContext'
import './styles.css'
import './index.css'
import { TimeContext } from './TimeContext'
import { Timeline } from './Timeline'
import { WorldContext } from './WorldContext'

function App() {
  return (
    <Container>
      <Timeline />
      <WorldContext />
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
