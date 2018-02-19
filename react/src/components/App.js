import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import Editor from './Editor/Editor'
import Browse from './Browse/Browse'
import Header from './Header'


class App extends Component {
  render() {
    if (this.props.view === 'browse' || this.props.view === 'myCVs') {
      return (
        <div>
          <Header />
          <Browse />
        </div>
      )
    }
    return (
      <div>
        <Header />
        <Editor />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    view: state.view,
  }
}

export default connect(
  mapStateToProps,
)(App)

