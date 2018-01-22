import React, { Component } from 'react'
import SearchAndExport from './SearchAndExport'
import NavBar from './NavBar'
import NameList from './NameList'
import CVList from './CVList'
import './css/Browse.css'
import './css/NavBar.css'


class Browse extends Component {

  render() {
    return (
      <div>
        <header id="navbar">
          <NavBar />
        </header>
        <div id="buttons">
          <SearchAndExport />
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
          <img src="http://via.placeholder.com/533x726" height="726" width="533" alt="First page of an example CV" />
        </div>
        <div className="lineContainer">
          <div className="line" />
        </div>
      </div>

    )
  }
}


export default Browse
