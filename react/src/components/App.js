import React, { Component } from 'react'
import './App.css'
import Editor from './Editor/Editor'
import Browse from './Browse/Browse'
import { fetchPDF } from './Api'
import Header from './Header'


class App extends Component {
  state = {
    view: 'browse',
    lastView: 'browse',
    selectedUser: '',
    selectedCV: '',
  }

  /* componentDidMount() {
    this.openCV()
  }

  updateUID(newUid) {
    this.setState({ uid: newUid })
  } */

  // goEdit function changes the view from Browse to Edit. It gets the selectedUser and selectedCV
  // from Browse view.
  goEdit(username, cvID) {
    this.setState({ selectedUser: username, selectedCV: cvID })
    this.changeView('edit')
  }

  fetchPDF(username = this.state.selectedUser, cvID = this.state.selectedCV, sections) {
    this.setState({ selectedUser: username, selectedCV: cvID })
    fetchPDF(username, sections)
      .then(res => res.blob())
      .then((blob) => {
        const file = new File([blob], `${username}_${cvID}.pdf`, { type: 'application/pdf' })
        const a = document.createElement('a')
        a.href = URL.createObjectURL(file)
        a.download = `${username}_${cvID}.pdf`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      })
      .catch(err => console.log(err))
  }

  changeView = (page) => {
    this.setState({
      view: page,
      lastView: this.state.view,
    })
  }

  render() {
    if (this.state.view === 'browse' || this.state.view === 'myCVs') {
      return (
        <div>
          <Header />
          <Browse
            changeViewName={this.changeView}
            view={this.state.view}
            goEdit={(username, cvID) => this.goEdit(username, cvID)}
            fetchPDF={(username, cvID, sections) => this.fetchPDF(username, cvID, sections)}
          />
        </div>
      )
    }
    return (
      <div>
        <Header />
        <Editor
          view={this.state.view}
          username={this.state.selectedUser}
          cvID={this.state.selectedCV}
          goBack={() => {
            const nextView = this.state.lastView === 'browse' ? 'browse' : 'myCVs'
            this.changeView(nextView)
          }}
          fetchPDF={sections => this.fetchPDF(undefined, undefined, sections)}
        />
      </div>
    )
  }
}


export default App
