import React, { Component } from 'react'
import './App.css'
import Editor from './Editor'
import Browse from './Browse'
import { fetchPDF } from './Api'
import NavBar from './NavBar'

const sectionTitles = [
  '',
  'WORK EXPERIENCE',
  'PREVIOUS EMPLOYMENT',
  'EDUCATION',
  'CERTIFICATES',
  'LANGUAGE SKILLS',
  'AWARDS',
  'PUBLICATIONS',
  'CONFERENCES',
  'OTHER ACTIVITIES',
  'ESSENTIAL SKILLS',
]

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
  goEdit(username, cvName) {
    this.setState({ selectedUser: username, selectedCV: cvName })
    this.changeView('edit')
  }

  fetchPDF(username, cvName) {
    this.setState({ selectedUser: username, selectedCV: cvName })
    fetchPDF(username, cvName, sectionTitles)
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
          <header id="navbar">
            <NavBar view={this.state.view} changeViewName={this.changeView} />
          </header>
          <Browse
            sectionTitles={sectionTitles}
            view={this.state.view}
            goEdit={(username, cvName) => this.goEdit(username, cvName)}
            fetchPDF={(username, cvName) => this.fetchPDF(username, cvName)}
          />
        </div>
      )
    }
    return (
      <div>
        <header id="navbar">
          <NavBar view={this.state.view} changeViewName={this.changeView} />
        </header>
        <Editor
          sectionTitles={sectionTitles}
          view={this.state.view}
          username={this.state.selectedUser}
          cvName={this.state.selectedCV}
          goBack={() => {
            const nextView = this.state.lastView === 'browse' ? 'browse' : 'myCVs'
            this.changeView(nextView)
          }}
          fetchPDF={() => this.fetchPDF(this.state.selectedUser, this.state.selectedCV)}

        />
      </div>
    )
  }
}


export default App
