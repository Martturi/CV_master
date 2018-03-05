import React, { Component } from 'react'
import { connect } from 'react-redux'
import Editor from './Editor/Editor'
import Browse from './Browse/Browse'
import Header from './Header'
import { userLoggedInCascade } from '../actions'
import Preview from './Preview'

class App extends Component {
  componentDidMount() {
    if (this.props.uid === undefined) {
      this.props.userLoggedInCascade()
    }
    console.log(this.props)
  }

  render() {
    const InnerComponent = () => {
      if (this.props.view === 'edit') return <Editor />
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
  userLoggedInCascade,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
