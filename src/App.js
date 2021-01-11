import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import Layouts from './layouts'
import Routes from './Routes'
import './css/tailwind.css'
import './css/main.css'
import './css/animate.css'
import './css/_components.css'

const Wrapper = ({children}) => {
  return <Layouts>{children}</Layouts>
}

const App = () => {
  return (
    <Router>
      <Wrapper>
        <Routes />
      </Wrapper>
    </Router>
  )
}
export default App
