import React, { Component } from 'react'
// import { Container, Row, Col } from 'reactstrap'
import MyCVsButtonGroup from './MyCVsButtonGroup'
import './MyCVsApp.css'
import CreateNewCVComponent from './CreateNewCV'
import NavBar from '../NavBar'
import '../NavBar.css'
import MyCVsList from './MyCVsList'

class MyCVsApp extends Component {

  render() {
    return (
      <div>
        <NavBar />
        <MyCVsList />
        <CreateNewCVComponent />
      </div>
    )
  }
}


export default MyCVsApp