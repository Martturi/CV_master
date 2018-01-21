import React, { Component } from 'react'
import './App.css'
import CVEditor from './CVEditor'
import { saveCV, loadCV, loadUserList, loadCVList, renameCV } from './Api'
import Preview from './Preview'
import BrowseApp from '../Browse/BrowseApp'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      browserView: true,
      // browser configurations:
      exportDropDownOpen: false,
      userList: [],
      selectedUser: -1,
      cvList: [],
      selectedCV: -1,
      deleteSelected: false,
      renameSelected: false,
      renameFieldContents: '',
      // editor configurations:
      text: '',
      saveStatus: '',
    }
  }

  componentDidMount() {
    // this.openCV()
    this.updateUserList()
    this.render()
  }

  // browser methods ->
  updateUserList() {
    loadUserList()
      .then((res) => {
        this.setState({ userList: res, selectedUser: 0 })
        this.userClicked(0)
      })
      .catch(err => console.log(err))
  }

  userClicked(index) {
    this.setState({ selectedUser: index, cvList: [], selectedCV: -1, text: '' })
    loadCVList(this.state.userList[index])
      .then((res) => {
        this.setState({ cvList: res, selectedCV: 0 })
        this.openCV()
      })
      .catch(err => console.log(err))
  }

  cvClicked(index) {
    this.setState({ selectedCV: index, text: '' })
    this.openCV()
  }

  editClicked() {
    this.setState({ browserView: false })
    this.openCV()
  }

  copyClicked() {
    // making absolutely sure we have the correct contents in this.state.text before copying:
    loadCV(this.state.userList[this.state.selectedUser], this.state.cvList[this.state.selectedCV])
      .then((res) => {
        const newCVName = 'copy of '.concat(this.state.cvList[this.state.selectedCV])
        saveCV(this.state.userList[this.state.selectedUser], newCVName, res)
        loadCVList(this.state.userList[this.state.selectedUser])
          .then((res2) => {
            this.setState({ cvList: res2, text: res, selectedCV: res2.indexOf(newCVName) })
            this.openCV()
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  deleteClicked() {
    this.setState({ deleteSelected: true })
  }

  deleteConfirmed() {
    const cvs = this.state.cvList
    cvs.splice(this.state.selectedCV, 1)
    this.setState({ cvList: cvs, deleteSelected: false })
    if (this.state.selectedCV === this.state.cvList.length) {
      const newSelectedCV = this.state.cvList.length - 1
      this.setState({ selectedCV: newSelectedCV })
    }
  }

  deleteCancelled() {
    this.setState({ deleteSelected: false })
  }

  renameClicked() {
    this.setState({ renameSelected: true })
  }

  renameFieldEdited(newContents) {
    this.setState({ renameFieldContents: newContents })
  }

  renameConfirmed() {
    const newName = this.state.renameFieldContents
    renameCV(this.state.userList[this.state.selectedUser], this.state.cvList[this.state.selectedCV],
      newName)
      .then(() => {
        loadCVList(this.state.userList[this.state.selectedUser])
          .then((res) => {
            this.setState({ cvList: res, selectedCV: res.indexOf(newName) })
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
    const cvs = this.state.cvList
    cvs[this.state.selectedCV] = this.state.renameFieldContents
    this.setState({ cvList: cvs, renameSelected: false, renameFieldContents: '' })
  }

  renameCancelled() {
    this.setState({ renameSelected: false, renameFieldContents: '' })
  }

  exportClicked() {
    this.setState({ exportDropDownOpen: !this.state.exportDropDownOpen })
  }

  // editor methods ->
  updateUID(newUid) {
    this.setState({ uid: newUid })
  }

  updateText(text) {
    this.setState({ text })
  }

  openCV() {
    loadCV(this.state.userList[this.state.selectedUser], this.state.cvList[this.state.selectedCV])
      .then((res) => {
        this.setState({ text: res })
      })
      .catch(err => console.log(err))
  }

  saveCV() {
    saveCV(this.state.userList[this.state.selectedUser], this.state.cvList[this.state.selectedCV],
      this.state.text)
      .then(res => this.setState({ saveStatus: res }))
      .catch(rej => this.setState({ saveStatus: rej }))
    setTimeout(
      () => { this.setState({ saveStatus: '' }) },
      3000,
    )
  }

  fetchPDF() {
    const username = this.state.userList[this.state.selectedUser]
    const cvName = this.state.cvList[this.state.selectedCV]
    fetch(`api/pdf/${username}/${cvName}`)
      .then(res => res.blob())
      .then((blob) => {
        const file = new File([blob], `${username} - ${cvName}.pdf`, { type: 'application/pdf' })
        const a = document.createElement('a')
        a.href = URL.createObjectURL(file)
        a.download = `${username} - ${cvName}.pdf`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      })
      .catch(err => console.log(err))
  }

  render() {
    if (this.state.browserView) {
      return (
        <BrowseApp
          exportDropDownOpen={this.state.exportDropDownOpen}
          userList={this.state.userList}
          selectedUser={this.state.selectedUser}
          allCVs={this.state.allCVs}
          cvList={this.state.cvList}
          selectedCV={this.state.selectedCV}
          deleteSelected={this.state.deleteSelected}
          renameSelected={this.state.renameSelected}
          renameFieldContents={this.state.renameFieldContents}
          cvCount={this.state.cvList.length}
          editClicked={() => this.editClicked()}
          copyClicked={() => this.copyClicked()}
          deleteClicked={() => this.deleteClicked()}
          deleteConfirmed={() => this.deleteConfirmed()}
          deleteCancelled={() => this.deleteCancelled()}
          renameClicked={() => this.renameClicked()}
          renameConfirmed={() => this.renameConfirmed()}
          renameCancelled={() => this.renameCancelled()}
          exportClicked={() => this.exportClicked()}
          userClicked={index => this.userClicked(index)}
          cvClicked={index => this.cvClicked(index)}
          renameFieldEdited={event => this.renameFieldEdited(event.target.value)}
          downloadAsPDFClicked={() => this.fetchPDF()}
        />
      )
    }
    return (
      <div>
        <button onClick={() => this.setState({ browserView: true })}>Back</button>
        <CVEditor
          text={this.state.text}
          saveStatus={this.state.saveStatus}
          updateText={text => this.updateText(text)}
          saveCV={() => this.saveCV()}
          fetchPDF={() => this.fetchPDF()}
        />
        <Preview
          text={this.state.text}
        />
      </div>
    )
  }
}

export default App
