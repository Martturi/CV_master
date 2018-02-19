import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchAndExport from './SearchAndExport'
import NameList from './NameList'
import CVList from './CVList'
import './Browse.css'
import '../Header.css'
import { loadCV, loadUserList, loadCVList, copyCV, deleteCV, renameCV } from '../Api'
import Preview from '../Preview'
import { changeView, updateUserList, updateCVList, updateSections, selectUserIndex, selectCVIndex, selectMyCVs } from '../../actions'

class Browse extends Component {
  /* constructor(props) {
    super(props)
    this.state = {
      sections: [],
    }
  } */

  componentDidMount() {
    this.updateUserList()
  }

  myCVsToggle = () => {
    if (this.props.view === 'browse') {
      this.props.changeView('myCVs')
      this.props.selectMyCVs()
      this.userClicked([this.props.userList[this.props.loggedInUserIndex]], 0)
    } else {
      this.props.changeView('browse')
      this.updateUserList()
    }
  }

  updateUserList = () => {
    loadUserList()
      .then(({ users, loggedInUser }) => {
        const userIDs = users.map(user => user.username)
        const loggedInUserIndexIfExists = userIDs.indexOf(loggedInUser)
        const loggedInUserIndex = loggedInUserIndexIfExists !== -1 ? loggedInUserIndexIfExists : 0
        this.props.updateUserList(users, loggedInUserIndex)
        console.log('logged in user', loggedInUser)
        this.userClicked(users, loggedInUserIndex)
      })
      .catch(err => console.log(err))
  }

  userClicked(userList = this.props.userList, userIndex) {
    console.log('clicked user ', userList[userIndex])
    const defaultCVIndex = 0
    this.props.selectUserIndex(userIndex)
    const username = userList[userIndex].username
    loadCVList(username)
      .then((cvs) => {
        this.props.updateCVList(cvs)
        this.cvClicked(cvs, defaultCVIndex)
      })
      .catch(err => console.log(err))
  }

  cvClicked(cvList = this.props.cvList, cvIndex) {
    const cvID = cvList[cvIndex].cv_id
    this.props.selectCVIndex(cvIndex)
    loadCV(cvID)
      .then((sections) => {
        this.props.updateSections(sections)
      })
      .catch(err => console.log(err))
  }

  renameConfirmed(cvID, newCVName) {
    const username = this.props.userList[this.props.selectedUserIndex].username
    console.log(`new cv name: ${newCVName}`)
    renameCV(cvID, newCVName)
      .then(() => {
        loadCVList(username)
          .then((cvs) => {
            this.props.updateCVList(cvs)
            const indexOfRenamedCV = cvs.map(row => row.cv_id).indexOf(cvID)
            this.cvClicked(cvs, indexOfRenamedCV)
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  copyClicked(cvID) {
    const username = this.props.userList[this.props.selectedUserIndex].username
    copyCV(cvID)
      .then((idOfCopiedCV) => {
        loadCVList(username)
          .then((cvs) => {
            this.props.updateCVList(cvs)
            const indexOfCopiedCV = cvs.map(row => row.cv_id).indexOf(Number(idOfCopiedCV))
            this.cvClicked(cvs, indexOfCopiedCV)
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  deleteConfirmed(cvID) {
    const username = this.props.userList[this.props.selectedUserIndex].username
    deleteCV(cvID)
      .then(() => {
        loadCVList(username)
          .then((cvs) => {
            this.props.updateCVList(cvs)
            this.cvClicked(cvs, this.props.selectedCVIndex)
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
            this.props.userList[this.props.selectedUserIndex].username,
            this.props.cvList[this.props.selectedCVIndex].cv_id,
            this.props.sections)}
          myCVsToggle={this.myCVsToggle}
          updateUserList={() => this.updateUserList()}
        />
        <div id="namelist" className="browse-section">
          <NameList
            userList={this.props.userList}
            selectedUserIndex={this.props.selectedUserIndex}
            userClicked={userIndex => this.userClicked(undefined, userIndex)}
          />
        </div>
        <div id="cvlist" className="browse-section">
          <CVList
            cvList={this.props.cvList}
            selectedCVIndex={this.props.selectedCVIndex}
            cvClicked={cvIndex => this.cvClicked(undefined, cvIndex)}
            renameConfirmed={(cvID, newCVName) => this.renameConfirmed(cvID, newCVName)}
            copyClicked={cvID => this.copyClicked(cvID)}
            deleteConfirmed={cvID => this.deleteConfirmed(cvID)}
            cvCount={this.props.cvList.length}
          />
        </div>
        <div className="CVpreview">
          <Preview />
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return state
}


const mapDispatchToProps = {
  changeView,
  updateUserList,
  updateCVList,
  updateSections,
  selectUserIndex,
  selectCVIndex,
  selectMyCVs,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Browse)

