import React, { Component } from 'react'
import { connect } from 'react-redux'
import Editor from './Editor/Editor'
import Browse from './Browse/Browse'
import Header from './Header'
import { updateUserList, userLoggedInCascade, userClickedCascade } from '../actions'
import Preview from './Preview'

class App extends Component {
  async componentDidMount() {
    if (this.props.uid === undefined) {
      this.props.userLoggedInCascade()
    } else {
      const users = await this.props.updateUserList()
      this.props.userClickedCascade(users, this.props.uid)
    }
  }

  render() {
    const InnerComponent = () => {
      if (this.props.view === 'edit') return <Editor uid={this.props.uid} cvid={this.props.cvid} />
      return <Browse uid={this.props.uid} cvid={this.props.cvid} />
    }
    return (
      <div>
        <Header />
        <InnerComponent />
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
    cvid: ownProps.match.params.cvid,
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
