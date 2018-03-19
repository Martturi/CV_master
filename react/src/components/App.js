import React, { Component } from 'react'
import { connect } from 'react-redux'
import Editor from './Editor/Editor'
import Browse from './Browse/Browse'
import Header from './Header'
import { updateUserList, userLoggedInCascade, userClickedCascade } from '../actions'
import Preview from './Preview'

class App extends Component {
  async componentDidMount() {
    const users = await this.props.updateUserList()
    this.props.userClickedCascade(users, this.props.uid)
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
    users: state.userList,
    uid: ownProps.match.params.uid,
    cvid: Number(ownProps.match.params.cvid),
    view: state.view,
  }
}

const mapDispatchToProps = {
  updateUserList,
  userLoggedInCascade,
  userClickedCascade,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
