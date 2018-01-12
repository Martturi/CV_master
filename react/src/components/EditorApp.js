import React, { Component } from 'react'
import Buttons from './ButtonGroup'
import TextField from './TextField'
import './EditorApp.css'


  class EditorApp extends React.Component{

  render() {
    return (
      <div>
      <div id = "buttons">
        <Buttons/>
      </div>
      <div id = "textfield">
        <TextField/>
      </div>
    </div>

    )
  }
}


export default EditorApp
