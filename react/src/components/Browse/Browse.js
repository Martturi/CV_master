import React, { Component } from 'react'
import SearchAndExport from './SearchAndExport'
import NameList from './NameList'
import CVList from './CVList'
import './Browse.css'
import '../Header.css'
import { loadCV, loadUserList, loadCVList, copyCV, deleteCV, renameCV } from '../Api'
import Preview from '../Preview'

class Browse extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUserIndex: 0,
      userList: [],
      userIDList: [],
      selectedUserIndex: 0,
      cvList: [],
      selectedCVIndex: 0,
      cvContents: '',
    }
    this.updateUserList()
  }

  myCVsToggle = () => {
    if (this.props.view === 'browse') {
      this.props.changeViewName('myCVs')
      this.setState({
        userList: [this.state.userList[this.state.currentUserIndex]],
        userIDList: [this.state.userIDList[this.state.currentUserIndex]],
        selectedUserIndex: 0,
        selectedCVIndex: 0,
      })
      this.userClicked([this.state.userList[this.state.currentUserIndex]], 0)
    } else {
      this.props.changeViewName('browse')
      this.updateUserList()
    }
  }

  updateUserList = () => {
    loadUserList()
      .then(({ users, currentUser }) => {
        const userIDs = users.map(user => user.username)
        const currentUserIndexIfExists = userIDs.indexOf(currentUser)
        const currentUserIndex = currentUserIndexIfExists !== -1 ? currentUserIndexIfExists : 0
        this.setState({
          currentUserIndex,
          userList: users,
          userIDList: userIDs,
        })
        console.log('current user', currentUser)
        this.userClicked(users, currentUserIndex)
      })
      .catch(err => console.log(err))
  }

  userClicked(userList = this.state.userList, userIndex) {
    const defaultCVIndex = 0
    this.setState({ selectedUserIndex: userIndex })
    const username = userList[userIndex].username
    loadCVList(username)
      .then((cvs) => {
        this.setState({ cvList: cvs })
        this.cvClicked(username, cvs, defaultCVIndex)
      })
      .catch(err => console.log(err))
  }

  cvClicked(username = this.state.userIDList[this.state.selectedUserIndex],
    cvList = this.state.cvList, cvIndex) {
    this.setState({ selectedCVIndex: cvIndex })
    loadCV(username, cvList[cvIndex])
      .then((cv) => {
        this.setState({ cvContents: cv })
      })
      .catch(err => console.log(err))
  }

  renameConfirmed(cvName, newCVName) {
    const username = this.state.userIDList[this.state.selectedUserIndex]
    console.log(`new cv name: ${newCVName}`)
    renameCV(username, cvName, newCVName)
      .then(() => {
        loadCVList(username)
          .then((cvs) => {
            this.setState({ cvList: cvs })
            const indexOfRenamedCV = cvs.indexOf(newCVName)
            this.cvClicked(username, cvs, indexOfRenamedCV)
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  copyClicked(cvName) {
    const username = this.state.userIDList[this.state.selectedUserIndex]
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
    const username = this.state.userIDList[this.state.selectedUserIndex]
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
        <SearchAndExport
          fetchPDF={() => this.props.fetchPDF(
            this.state.userIDList[this.state.selectedUserIndex],
            this.state.cvList[this.state.selectedCVIndex])}
          view={this.props.view}
          myCVsToggle={this.myCVsToggle}
          updateUserList={() => this.updateUserList()}
        />
        <div id="namelist" className="browse-section">
          <NameList
            userList={this.state.userList}
            selectedUserIndex={this.state.selectedUserIndex}
            userClicked={userIndex => this.userClicked(undefined, userIndex)}
          />
        </div>
        <div id="cvlist" className="browse-section">
          <CVList
            userList={this.state.userIDList}
            selectedUserIndex={this.state.selectedUserIndex}
            cvList={this.state.cvList}
            selectedCVIndex={this.state.selectedCVIndex}
            cvClicked={cvIndex => this.cvClicked(undefined, undefined, cvIndex)}
            goEdit={cvName => this.props.goEdit(
              this.state.userIDList[this.state.selectedUserIndex],
              cvName)}
            renameConfirmed={(cvName, newCVName) => this.renameConfirmed(cvName, newCVName)}
            copyClicked={cvName => this.copyClicked(cvName)}
            deleteConfirmed={cvName => this.deleteConfirmed(cvName)}
            cvCount={this.state.cvList.length}
          />
        </div>
        <div className="CVpreview">
          <Preview
            username={this.state.userIDList[this.state.selectedUserIndex]}
            text={this.state.cvContents}
          />
        </div>
      </div>

    )
  }
}

export default Browse
