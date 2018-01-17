import React, { Component } from 'react'
import EditorButtonGroup from './EditorButtonGroup'
import TextFields from './TextFields'
import NavBar from '../NavBar'
import ExampleCV from '../ExampleCV.png'
import './EditorApp.css'
import '../NavBar.css'


class EditorApp extends Component {

  render() {
    return (
      <div>
        <header id="navbar">
          <NavBar />
        </header>
        <div id="buttons">
          <EditorButtonGroup />
        </div>
        <div id="textfields">
          <TextFields />
        </div>
        <div className="lineContainer">
          <div className="line" />
        </div>
        <div className="CVpreview">
          <img src={ExampleCV} height="726" width="533" alt="First page of an example CV" />
        </div>
      </div>

    )
  }
}


export default EditorApp
