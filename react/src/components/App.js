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
  // TODO: goBack should lead back to previously selected user, not user indexed 0.
  goBack() {
    this.setState({ view: 'browse' })
  }

  // goEdit function changes the view from Browse to Edit. It gets the selectedUser and selectedCV
  // from Browse view.
  goEdit(username, cvName) {
    this.setState({ selectedUser: username, selectedCV: cvName, view: 'edit' })
  }

  fetchPDF(username, cvName) {
    this.setState({ selectedUser: username, selectedCV: cvName })
    fetch(`api/users/${username}/cvs/${cvName}/pdf`)
      .then(res => res.blob())
      .then((blob) => {
        const file = new File([blob], `${username}_${cvName}.pdf`, { type: 'application/pdf' })
        const a = document.createElement('a')
        a.href = URL.createObjectURL(file)
        a.download = `${username}_${cvName}.pdf`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      })
      .catch(err => console.log(err))
  }

  render() {
    if (this.state.view === 'browse') {
      return (
        <Browse
          goEdit={(username, cvName) => this.goEdit(username, cvName)}
          fetchPDF={(username, cvName) => this.fetchPDF(username, cvName)}
        />
      )
    }
    return (
      <Editor
        username={this.state.selectedUser}
        cvName={this.state.selectedCV}
        goBack={() => this.goBack()}
        fetchPDF={() => this.fetchPDF(this.state.selectedUser, this.state.selectedCV)}
      />
    )
  }
}


export default App
