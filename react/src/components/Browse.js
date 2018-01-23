import React, { Component } from 'react'
import SearchAndExport from './SearchAndExport'
import NavBar from './NavBar'
import NameList from './NameList'
import CVList from './CVList'
import './css/Browse.css'
import './css/NavBar.css'
import { loadUserList, loadCVList } from './Api'

class Browse extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userList: [],
      selectedUserIndex: 0,
      cvList: [],
      selectedCVIndex: 0,
    }
  }

  componentDidMount() {
    this.updateUserList()
    this.render()
  }

  updateUserList() {
    const defaultUserIndex = 0
    loadUserList()
      .then((users) => {
        this.setState({ userList: users })
        this.updateCVList(users[defaultUserIndex])
      })
      .catch(err => console.log(err))
  }

  updateCVList(username = this.state.userList[this.state.selectedUserIndex]) {
    loadCVList(username)
      .then((cvs) => {
        this.setState({ cvList: cvs })
      })
      .catch(err => console.log(err))
  }

  userClicked(userIndex) {
    this.setState({ selectedUserIndex: userIndex })
    this.updateCVList(this.state.userList[userIndex])
  }

  cvClicked(cvIndex) {
    this.setState({ selectedCVIndex: cvIndex })
  }

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
          <NameList
            userList={this.state.userList}
            selectedUserIndex={this.state.selectedUserIndex}
            userClicked={userIndex => this.userClicked(userIndex)}
          />
        </div>
        <div className="lineContainer" id="lineContainer">
          <div className="line" />
        </div>
        <div id="cvlist" className="browseSection">
          <CVList
            cvList={this.state.cvList}
            selectedCVIndex={this.state.selectedCVIndex}
            cvClicked={cvIndex => this.cvClicked(cvIndex)}
          />
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
