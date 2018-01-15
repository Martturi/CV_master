import React, { Component } from 'react'
import { Button } from 'reactstrap'
import './App.css'
import CVEditor from './App/CVEditor'
import { saveCV, loadCV, loadCVList, copyCV, deleteCV } from './Api'
import Preview from './App/Preview'
import MyCVsApp from './MyCVs/MyCVsApp'

class App extends Component {
  state = {
    uid: '0',
    text: '',
    saveStatus: '',
    view: 'my cvs',
    cvList: [],
    myCVsStatus: '',
    showingCreateButton: true,
  }

  componentDidMount() {
    this.updateCVList()
    this.render()
  }

  updateCVList() {
    loadCVList(this.state.uid)
      .then((res) => {
        this.setState({
          cvList: res,
        })
      })
      .catch(err => console.log(err))
  }

  editClicked(cvName) {
    this.updateUID(cvName)
    this.openCV()
    this.updateView('editor')
  }

  copyClicked(cvName) {
    copyCV(cvName)
      .then((res) => {
        this.setState({ myCVsStatus: res })
        this.updateCVList()
      })
      .catch(rej => this.setState({ myCVsStatus: rej }))
    setTimeout(
      () => { this.setState({ myCVsStatus: '' }) },
      3000,
    )
  }

  deleteClicked(cvName) {
    deleteCV(cvName)
      .then((res) => {
        this.setState({ myCVsStatus: res })
        this.updateCVList()
      })
      .catch(rej => this.setState({ myCVsStatus: rej }))
    setTimeout(
      () => { this.setState({ myCVsStatus: '' }) },
      3000,
    )
  }

  createClicked() {
    this.setState({ showingCreateButton: false })
  }

  saveClicked() {
    this.setState({ showingCreateButton: true })
  }

  updateUID(newUid) {
    this.setState({ uid: newUid })
  }

  updateText(text) {
    this.setState({ text })
  }

  updateView(view) {
    if (view === 'editor') {
      this.setState({ cvList: [] })
    } else if (view === 'my cvs') {
      this.updateText('')
      this.updateCVList()
    }
    this.setState({ view })
  }

  openCV() {
    loadCV(this.state.uid)
      .then((res) => {
        this.setState({ text: res })
      })
      .catch(err => console.log(err))
  }

  saveCV() {
    saveCV(this.state.uid, this.state.text)
      .then(res => this.setState({ saveStatus: res }))
      .catch(rej => this.setState({ saveStatus: rej }))
    setTimeout(
      () => { this.setState({ saveStatus: '' }) },
      3000,
    )
  }

  render() {
    if (this.state.view === 'editor') {
      return (
        <div>
          <Button color="danger" onClick={() => this.updateView('my cvs')}>back to CV list</Button>
          <CVEditor
            text={this.state.text}
            saveStatus={this.state.saveStatus}
            updateText={text => this.updateText(text)}
            saveCV={() => this.saveCV()}
          />
          <Preview
            text={this.state.text}
          />
          {/* <EditorApp /> */}
        </div>
      )
    } else if (this.state.view === 'my cvs') {
      return (
        <div>
          <MyCVsApp
            editClicked={cvName => this.editClicked(cvName)}
            copyClicked={cvName => this.copyClicked(cvName)}
            deleteClicked={cvName => this.deleteClicked(cvName)}
            cvArray={this.state.cvList}
            showingCreateButton={this.state.showingCreateButton}
            createClicked={() => this.createClicked()}
            saveClicked={() => this.saveClicked()}
            cancelClicked={() => this.saveClicked()}
          />
        </div>
      )
    }
    return (
      <div>
        something weird happened
      </div>
    )
  }
}

export default App
