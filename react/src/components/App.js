import React, { Component } from 'react'
import './App.css'
import Editor from './Editor'
import Browse from './Browse'


class App extends Component {
  state = {
    view: 'browse',
    selectedUser: '',
    selectedCV: '',
  }

  /* componentDidMount() {
    this.openCV()
  }

  updateUID(newUid) {
    this.setState({ uid: newUid })
  } */

  // goBack changes the view back to Browse. Given as a prop to Editor.
  // TODO: goBack leads back to previously selected user, not user indexed 0.
  goBack() {
    this.setState({ view: 'browse' })
  }

  // goEdit function changes the view from Browse to Edit. It gets the selectedUser and selectedCV
  // from Browse view.
  goEdit(username, cvName) {
    this.setState({ selectedUser: username, selectedCV: cvName, view: 'edit' })
  }

  render() {
    if (this.state.view === 'browse') {
      return (
        <Browse
          goEdit={(username, cvName) => this.goEdit(username, cvName)}
        />
      )
    }
    return (
      <Editor
        goBack={() => this.goBack()}
        username={this.state.selectedUser}
        cvName={this.state.selectedCV}
      />
    )
  }
}


export default App
