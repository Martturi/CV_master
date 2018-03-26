import React, { Component } from 'react'
import { connect } from 'react-redux'
import Editor from './Editor/Editor'
import Browse from './Browse/Browse'
import Header from './Header'
import { updateUserList, getCurrentUser, userClickedCascade, updateCVList, loadSections, updatePreview } from '../actions'
import Preview from './Preview'
import history from '../history'

class App extends Component {
  async componentDidMount() {
    await this.props.getCurrentUser()
    const userList = await this.props.updateUserList()
    const cvList = await this.props.updateCVList(this.props.uid)
    if (userList.findIndex(u => u.username === this.props.uid) === -1) {
      history.push(`/404/userNotFound/${this.props.uid}/${this.props.cvid}`)
    } else if (this.props.cvid && cvList.findIndex(cv => cv.cv_id === this.props.cvid) === -1) {
      history.push(`/404/cvNotFound/${this.props.uid}/${this.props.cvid}`)
    } else if (this.props.view === '#edit') {
      const sections = await this.props.loadSections(this.props.cvid)
      this.props.updatePreview(sections, this.props.uid)
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
