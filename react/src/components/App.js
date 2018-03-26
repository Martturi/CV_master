import React, { Component } from 'react'
import { connect } from 'react-redux'
import Editor from './Editor/Editor'
import Browse from './Browse/Browse'
import Header from './Header'
import { updateUserList, getCurrentUser, userClickedCascade, updateCVList, loadSections, updatePreview } from '../actions'
import Preview from './Preview'

class App extends Component {
  async componentDidMount() {
    const loggedInUser = await this.props.getCurrentUser()
    const userList = await this.props.updateUserList()
    if (userList.findIndex(u => u.username === this.props.uid) === -1) {
      this.props.userClickedCascade(loggedInUser)
      alert('404, user not found.') // eslint-disable-line
    } else if (this.props.view === '#edit') {
      const cvList = await this.props.updateCVList(this.props.uid)
      if (cvList.findIndex(cv => cv.cv_id === this.props.cvid) === -1) {
        this.props.userClickedCascade(this.props.uid)
        alert('404, CV not found.') // eslint-disable-line
      } else {
        const sections = await this.props.loadSections(this.props.cvid)
        this.props.updatePreview(sections, this.props.uid)
      }
    } else { this.props.userClickedCascade(this.props.uid, this.props.cvid) }
  }

  render() {
    return (
      <div>
        <Header />
        {this.props.view === '#edit'
          ? <Editor uid={this.props.uid} cvid={this.props.cvid} />
          : <Browse uid={this.props.uid} cvid={this.props.cvid} />}
        <div className="CVpreview">
          <Preview />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    uid: ownProps.match.params.uid,
    cvid: Number(ownProps.match.params.cvid),
    userList: state.userList,
    loggedInUser: state.loggedInUser,
    view: ownProps.location.hash,
  }
}

const mapDispatchToProps = {
  updateUserList,
  getCurrentUser,
  userClickedCascade,
  updateCVList,
  loadSections,
  updatePreview,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
