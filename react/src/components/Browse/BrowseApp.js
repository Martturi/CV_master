import React, { Component } from 'react'
import BrowseButtons from './BrowseButtonGroup'
import NavBar from '../NavBar'
import NameList from './NameList'
import CVList from './CVList'
import ExampleCV from '../ExampleCV.png'
import './BrowseApp.css'
import '../NavBar.css'


class BrowseApp extends Component {

  render() {
    return (
      <div>
        <header id="navbar">
          <NavBar />
        </header>
        <div id="buttons">
          <BrowseButtons />
        </div>
        <div id="namelist" className="browseSection">
          <NameList />
        </div>
        <div className="lineContainer">
          <div className="line" />
        </div>
        <div id="cvlist" className="browseSection">
          <CVList />
        </div>
        <div id="CVpreview">
          <img src={ExampleCV} height="726" width="533" alt="First page of an example CV" />
        </div>
        <div className="lineContainer" id="lineContainer2">
          <div className="line" />
        </div>
      </div>

    )
  }
}


export default BrowseApp
