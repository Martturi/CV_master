import React, { Component } from 'react'
import { connect } from 'react-redux'
import Editor from './Editor/Editor'
import Browse from './Browse/Browse'
import Header from './Header'
import { updateUserList, getCurrentUser, userClickedCascade } from '../actions'
import Preview from './Preview'

class App extends Component {
  async componentDidMount() {
    await this.props.getCurrentUser()
    await this.props.updateUserList()
    if (this.props.userList.findIndex(u => u.username === this.props.uid) === -1) {
      this.props.userClickedCascade(this.props.loggedInUser)
      alert('404, user not found.') // eslint-disable-line
    } else { this.props.userClickedCascade(this.props.uid, this.props.cvid) }
  }

  render() {
    return (
      <div>
        <Header />
        {this.props.view === 'edit'
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
    view: state.view,
    userList: state.userList,
    loggedInUser: state.loggedInUser,
  }
}

const mapDispatchToProps = {
  updateUserList,
  getCurrentUser,
  userClickedCascade,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
