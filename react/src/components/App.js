import React, { Component } from 'react'
import './App.css'
import { loadCV } from './Api'
import Editor from './Editor'
import Browse from './Browse'


class App extends Component {
  state = {
    browserView: false,
    uid: '0',
    text: '',
  }

  componentDidMount() {
    this.openCV()
    this.render()
  }

  updateUID(newUid) {
    this.setState({ uid: newUid })
  }

  updateText(text) {
    this.setState({ text })
  }

  goBack() {
    this.setState({ browserView: true })
  }

  goEdit() {
    this.setState({ browserView: false })
  }

  openCV() {
    loadCV(this.state.uid)
      .then((res) => {
        this.setState({ text: res })
      })
      .catch(err => console.log(err))
  }

  render() {
    if (this.state.browserView) {
      return (
        <Browse
          goEdit={() => this.goEdit()}
        />
      )
    }
    return (
      <Editor
        goBack={() => this.goBack()}
      />
    )
  }
}


export default App
