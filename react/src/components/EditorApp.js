import React, { Component } from 'react'
import Buttons from './ButtonGroup'
import TextFields from './TextFields'
import NavBar from './NavBar'
import ExampleCV from './ExampleCV.png'
import './EditorApp.css'


class EditorApp extends Component {

  render() {
    return (
      <div>
        <header id="navbar">
          <NavBar />
        </header>
        <div id="buttons">
          <Buttons />
        </div>
        <div id="textfields">
          <TextFields />
        </div>
        <div id="CVpreview">
          <img src={ExampleCV} height="726" width="533" alt="First page of an example CV" />
        </div>
      </div>

    )
  }
}


export default EditorApp
