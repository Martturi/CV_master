import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchAndExport from './SearchAndExport'
import NameList from './NameList'
import CVList from './CVList'
import './Browse.css'
import '../Header.css'
import { loadUserList, copyCV, deleteCV, renameCV } from '../Api'
import Preview from '../Preview'
import { changeView, updateUserList, updateCVList, updateCV, selectUserIndex, selectCVIndex } from '../../actions'

class Browse extends Component {
  componentDidMount() {
    this.updateUserList()
  }

  updateUserList = async () => {
    const { users, loggedInUser } = await loadUserList()
    const userIDs = users.map(user => user.username)
    const loggedInUserIndexIfExists = userIDs.indexOf(loggedInUser)
    const loggedInUserIndex = loggedInUserIndexIfExists !== -1 ? loggedInUserIndexIfExists : 0
    await this.props.updateUserList(users, loggedInUserIndex)
    this.userClicked(loggedInUserIndex)
  }

  async userClicked(userIndex) {
    const defaultCVIndex = 0
    await this.props.selectUserIndex(userIndex)
    const username = this.props.username
    await this.props.updateCVList(username)
    this.cvClicked(this.props.cvList, defaultCVIndex)
  }

  cvClicked(cvList = this.props.cvList, cvIndex) {
    const cvID = cvList[cvIndex].cv_id
    this.props.selectCVIndex(cvIndex)
    this.props.updateCV(cvID)
  }

  async renameConfirmed(cvID, newCVName) {
    const username = this.props.username
    await renameCV(cvID, newCVName)
    await this.props.updateCVList(username)
    const indexOfRenamedCV = this.props.cvList.map(row => row.cv_id).indexOf(cvID)
    this.cvClicked(this.props.cvList, indexOfRenamedCV)
  }

  async copyClicked(cvID) {
    const username = this.props.username
    const idOfCopiedCV = await copyCV(cvID)
    await this.props.updateCVList(username)
    const indexOfCopiedCV = this.props.cvList.map(row => row.cv_id).indexOf(Number(idOfCopiedCV))
    this.cvClicked(this.props.cvList, indexOfCopiedCV)
  }

  async deleteConfirmed(cvID) {
    const username = this.props.username
    await deleteCV(cvID)
    await this.props.updateCVList(username)
    this.cvClicked(this.props.cvList, this.props.selectedCVIndex)
  }

  render() {
    return (
      <div>
        <SearchAndExport />
        <div id="namelist" className="browse-section">
          <NameList
            userList={this.props.userList}
            selectedUserIndex={this.props.selectedUserIndex}
            userClicked={userIndex => this.userClicked(userIndex)}
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
  return {
    ...state,
    userList: state.view === 'myCVs' ? [state.userList[state.loggedInUserIndex]] : state.userList,
    username: state.userList.length ? state.userList[state.selectedUserIndex].username : 'defaultUser',
  }
}


const mapDispatchToProps = {
  changeView,
  updateUserList,
  updateCVList,
  updateCV,
  selectUserIndex,
  selectCVIndex,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Browse)

