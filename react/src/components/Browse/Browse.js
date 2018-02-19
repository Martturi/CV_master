import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchAndExport from './SearchAndExport'
import NameList from './NameList'
import CVList from './CVList'
import './Browse.css'
import '../Header.css'
import { loadCV, loadUserList, loadCVList, copyCV, deleteCV, renameCV } from '../Api'
import Preview from '../Preview'
import { changeView } from '../../actions'

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
      sections: [],
    }
  }

  componentDidMount() {
    this.updateUserList()
  }

  myCVsToggle = () => {
    if (this.props.view === 'browse') {
      this.props.changeView('myCVs')
      this.setState({
        userList: [this.state.userList[this.state.currentUserIndex]],
        userIDList: [this.state.userIDList[this.state.currentUserIndex]],
        selectedUserIndex: 0,
        selectedCVIndex: 0,
      })
      this.userClicked([this.state.userList[this.state.currentUserIndex]], 0)
    } else {
      this.props.changeView('browse')
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
        this.cvClicked(cvs, defaultCVIndex)
      })
      .catch(err => console.log(err))
  }

  cvClicked(cvList = this.state.cvList, cvIndex) {
    const cvID = cvList[cvIndex].cv_id
    this.setState({ selectedCVIndex: cvIndex })
    loadCV(cvID)
      .then((sections) => {
        this.setState({ sections })
      })
      .catch(err => console.log(err))
  }

  renameConfirmed(cvID, newCVName) {
    const username = this.state.userIDList[this.state.selectedUserIndex]
    console.log(`new cv name: ${newCVName}`)
    renameCV(cvID, newCVName)
      .then(() => {
        loadCVList(username)
          .then((cvs) => {
            this.setState({ cvList: cvs })
            const indexOfRenamedCV = cvs.map(row => row.cv_id).indexOf(cvID)
            this.cvClicked(cvs, indexOfRenamedCV)
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  copyClicked(cvID) {
    const username = this.state.userIDList[this.state.selectedUserIndex]
    copyCV(cvID)
      .then((idOfCopiedCV) => {
        loadCVList(username)
          .then((cvs) => {
            this.setState({ cvList: cvs })
            const indexOfCopiedCV = cvs.map(row => row.cv_id).indexOf(Number(idOfCopiedCV))
            this.cvClicked(cvs, indexOfCopiedCV)
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  deleteConfirmed(cvID) {
    const username = this.state.userIDList[this.state.selectedUserIndex]
    deleteCV(cvID)
      .then(() => {
        loadCVList(username)
          .then((cvs) => {
            this.setState({ cvList: cvs })
            const indexOutOfBounds = this.state.selectedCVIndex >= cvs.length
            const newSelectedCVIndex = (
              indexOutOfBounds ? (cvs.length - 1) : this.state.selectedCVIndex
            )
            this.cvClicked(cvs, newSelectedCVIndex)
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
            this.state.cvList[this.state.selectedCVIndex].cv_id,
            this.state.sections)}
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
            cvClicked={cvIndex => this.cvClicked(undefined, cvIndex)}
            goEdit={cvID => this.props.goEdit(
              this.state.userIDList[this.state.selectedUserIndex],
              cvID)}
            renameConfirmed={(cvID, newCVName) => this.renameConfirmed(cvID, newCVName)}
            copyClicked={cvID => this.copyClicked(cvID)}
            deleteConfirmed={cvID => this.deleteConfirmed(cvID)}
            cvCount={this.state.cvList.length}
          />
        </div>
        <div className="CVpreview">
          <Preview
            username={this.state.userIDList[this.state.selectedUserIndex]}
            sections={this.state.sections}
          />
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    view: state.view,
  }
}


const mapDispatchToProps = {
  changeView,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Browse)

