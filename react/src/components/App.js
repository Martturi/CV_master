import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import Editor from './Editor/Editor'
import Browse from './Browse/Browse'
import { fetchPDF } from './Api'
import Header from './Header'
import { selectCV, selectUser, changeView } from '../actions'


class App extends Component {

  /* componentDidMount() {
    this.openCV()
  }

  updateUID(newUid) {
    this.setState({ uid: newUid })
  } */

  // goEdit function changes the view from Browse to Edit.
  goEdit(username, cvID) {
    this.props.selectUser(username)
    this.props.selectCV(cvID)
    this.changeView('edit')
  }

  fetchPDF(username = this.props.selectedUser, cvID = this.props.selectedCV, sections) {
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

  changeView = (view) => {
    this.props.changeView(view)
  }

  render() {
    if (this.props.view === 'browse' || this.props.view === 'myCVs') {
      return (
        <div>
          <Header />
          <Browse
            changeViewName={this.changeView}
            view={this.props.view}
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
          view={this.props.view}
          username={this.props.selectedUser}
          cvID={this.props.selectedCV}
          goBack={() => {
            const nextView = this.props.lastView === 'browse' ? 'browse' : 'myCVs'
            this.changeView(nextView)
          }}
          fetchPDF={sections => this.fetchPDF(undefined, undefined, sections)}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}


const mapDispatchToProps = {
  selectUser,
  selectCV,
  changeView,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)

