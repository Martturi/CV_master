import React, { Component } from 'react'
import { Button } from 'reactstrap'
import './MyCVsApp.css'
import NavBar from '../NavBar'
import '../NavBar.css'
import MyCVsList from './MyCVsList'

class MyCVsApp extends Component {

  render() {
    return (
      <div>
        <NavBar />
        <MyCVsList />
        <Button outline className="button" id="create-cv-button">Create new CV</Button>
      </div>
    )
  }
}


export default MyCVsApp
