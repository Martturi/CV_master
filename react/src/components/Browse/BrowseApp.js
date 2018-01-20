import React, { Component } from 'react'
import BrowseButtonGroup from './BrowseButtonGroup'
import NavBar from '../NavBar'
import NameList from './NameList'
import CVList from './CVList'
import ExampleCV from '../ExampleCV.png'
import './BrowseApp.css'
import '../NavBar.css'

class BrowseApp extends Component {
  constructor(props) {
    super(props)
    this.state = { exportDropDownOpen: false }
  }

  toggleExportButton() {
    this.setState({ exportDropDownOpen: !this.state.exportDropDownOpen })
  }

  render() {
    return (
      <div>
        <header id="navbar">
          <NavBar />
        </header>
        <div id="buttons">
          <BrowseButtonGroup
            dropdownOpen={this.state.exportDropDownOpen}
            toggle={() => this.toggleExportButton()}
          />
        </div>
        <div id="namelist" className="browseSection">
          <NameList />
        </div>
        <div className="lineContainer" id="lineContainer">
          <div className="line" />
        </div>
        <div id="cvlist" className="browseSection">
          <CVList />
        </div>
        <div className="CVpreview">
          <img src={ExampleCV} height="726" width="533" alt="First page of an example CV" />
        </div>
        <div className="lineContainer">
          <div className="line" />
        </div>
      </div>
    )
  }
}

export default BrowseApp
