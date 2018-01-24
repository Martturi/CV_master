import React, { Component } from 'react'
import SearchAndExport from './SearchAndExport'
import NavBar from './NavBar'
import NameList from './NameList'
import CVList from './CVList'
import './css/Browse.css'
import './css/NavBar.css'
import { loadCVPreview, loadUserList, loadCVList, copyCV, deleteCV } from './Api'
import Preview from './Preview'

class Browse extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userList: [],
      selectedUserIndex: 0,
      cvList: [],
      selectedCVIndex: 0,
      cvContents: '',
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
        this.userClicked(users, defaultUserIndex)
      })
      .catch(err => console.log(err))
  }

  userClicked(userList = this.state.userList, userIndex) {
    const defaultCVIndex = 0
    this.setState({ selectedUserIndex: userIndex })
    const username = userList[userIndex]
    loadCVList(username)
      .then((cvs) => {
        this.setState({ cvList: cvs })
        this.cvClicked(username, cvs, defaultCVIndex)
      })
      .catch(err => console.log(err))
  }

  cvClicked(username = this.state.userList[this.state.selectedUserIndex],
    cvList = this.state.cvList, cvIndex) {
    this.setState({ selectedCVIndex: cvIndex })
    loadCVPreview(username, cvList[cvIndex])
      .then((cv) => {
        this.setState({ cvContents: cv })
      })
      .catch(err => console.log(err))
  }


  copyClicked(cvName) {
    const username = this.state.userList[this.state.selectedUserIndex]
    copyCV(username, cvName)
      .then((nameOfCopiedCV) => {
        loadCVList(username)
          .then((cvs) => {
            this.setState({ cvList: cvs })
            const indexOfCopiedCV = cvs.indexOf(nameOfCopiedCV)
            this.cvClicked(username, cvs, indexOfCopiedCV)
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  deleteConfirmed(cvName) {
    const username = this.state.userList[this.state.selectedUserIndex]
    deleteCV(username, cvName)
      .then(() => {
        loadCVList(username)
          .then((cvs) => {
            this.setState({ cvList: cvs })
            const indexOutOfBounds = this.state.selectedCVIndex >= cvs.length
            const newSelectedCVIndex = (
              indexOutOfBounds ? (cvs.length - 1) : this.state.selectedCVIndex
            )
            this.cvClicked(username, cvs, newSelectedCVIndex)
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
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
            userClicked={userIndex => this.userClicked(undefined, userIndex)}
          />
        </div>
        <div className="lineContainer" id="lineContainer">
          <div className="line" />
        </div>
        <div id="cvlist" className="browseSection">
          <CVList
            cvList={this.state.cvList}
            selectedCVIndex={this.state.selectedCVIndex}
            cvClicked={cvIndex => this.cvClicked(undefined, undefined, cvIndex)}
            goEdit={this.props.goEdit}
            copyClicked={cvName => this.copyClicked(cvName)}
            deleteConfirmed={cvName => this.deleteConfirmed(cvName)}
            cvCount={this.state.cvList.length}
          />
        </div>
        <div className="CVpreview">
          <Preview text={this.state.cvContents} />
        </div>
        <div className="lineContainer">
          <div className="line" />
        </div>
      </div>

    )
  }
}

export default Browse
