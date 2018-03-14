import React, { Component } from 'react'
import { connect } from 'react-redux'
import Editor from './Editor/Editor'
import Browse from './Browse/Browse'
import Header from './Header'
import { userLoggedInCascade } from '../actions'
import Preview from './Preview'

class App extends Component {
  componentDidMount() {
    this.props.userLoggedInCascade()
  }

  render() {
    const InnerComponent = () => {
      if (this.props.view === 'edit') return <Editor />
      return <Browse />
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

const mapStateToProps = (state) => {
  return {
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
