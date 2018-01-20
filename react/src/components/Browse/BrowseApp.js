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
    this.state = {
      exportDropDownOpen: false,
      cvList: ['CV 1', 'CV 2', 'CV 3'],
      selectedCV: 0,
    }
  }

  cvClicked(index) {
    this.setState({ selectedCV: index })
  }

  copyClicked() {
    const newCvName = 'copy of '.concat(this.state.cvList[this.state.selectedCV])
    const newArray = this.state.cvList
    newArray.push(newCvName)
    this.setState({ cvList: newArray })
  }

  deleteClicked() {
    const newArray = this.state.cvList
    newArray.splice(this.state.selectedCV)
    this.setState({ cvList: newArray })
  }

  exportButtonClicked() {
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
            copyClicked={() => this.copyClicked()}
            deleteClicked={() => this.deleteClicked()}
            exportClicked={() => this.exportButtonClicked()}
          />
        </div>
        <div id="namelist" className="browseSection">
          <NameList />
        </div>
        <div className="lineContainer" id="lineContainer">
          <div className="line" />
        </div>
        <div id="cvlist" className="browseSection">
          <CVList
            selectedCV={this.state.selectedCV}
            cvList={this.state.cvList}
            cvClicked={index => this.cvClicked(index)}
          />
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
