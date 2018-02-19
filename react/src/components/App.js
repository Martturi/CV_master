import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import Editor from './Editor/Editor'
import Browse from './Browse/Browse'
import { fetchPDF } from './Api'
import Header from './Header'
import { changeView } from '../actions'


class App extends Component {

  fetchPDF(username = this.props.username, cvID = this.props.cvID, sections) {
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
            fetchPDF={(username, cvID, sections) => this.fetchPDF(username, cvID, sections)}
          />
        </div>
      )
    }
    return (
      <div>
        <Header />
        <Editor
          fetchPDF={sections => this.fetchPDF(undefined, undefined, sections)}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    username: state.userList.length ? state.userList[state.selectedUserIndex].username : 'defaultUser',
    cvID: state.cvList.length ? state.cvList[state.selectedCVIndex].cv_id : 0,
  }
}


const mapDispatchToProps = {
  changeView,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)

