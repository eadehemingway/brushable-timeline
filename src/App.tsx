import React from 'react'
import styled from 'styled-components'
import './styles.css'
import './index.css'
import { Timeline } from './Timeline/Timeline'
import { Scrollama, Step } from 'react-scrollama';
import { Scroll } from './Scroll'


function App() {


  return (
    <Container>
      <Timeline />
      <Scroll />
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
