import React, { Component } from 'react'
import './App.css'
import CVEditor from './CVEditor'
import { saveCV, loadCV, loadUserList, loadCVList, renameCV, deleteCV } from './Api'
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
    this.updateUserList()
    this.render()
  }

  // browser methods ->
  updateUserList() {
    const defaultUserIndex = 0
    const defaultCVIndex = 0
    loadUserList()
      .then((users) => {
        loadCVList(users[defaultUserIndex])
          .then((cvs) => {
            loadCV(users[defaultUserIndex], cvs[defaultCVIndex])
              .then((cv) => {
                this.setState({
                  userList: users,
                  cvList: cvs,
                  text: cv,
                  selectedUser: defaultUserIndex,
                  selectedCV: defaultCVIndex,
                })
              })
              .catch(err => console.log(err))
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  userClicked(index) {
    this.setState({ selectedUser: index })
    const defaultCVIndex = 0
    const user = this.state.userList[index]
    loadCVList(user)
      .then((cvs) => {
        this.setState({ cvList: cvs, selectedCV: defaultCVIndex })
        loadCV(user, cvs[defaultCVIndex])
          .then((cv) => {
            this.setState({ text: cv })
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  cvClicked(index) {
    this.setState({ selectedCV: index })
    loadCV(this.state.userList[this.state.selectedUser], this.state.cvList[index])
      .then((cv) => {
        this.setState({ text: cv })
      })
      .catch(err => console.log(err))
  }

  editClicked() {
    loadCV(this.state.userList[this.state.selectedUser], this.state.cvList[this.state.selectedCV])
      .then((cv) => {
        this.setState({ browserView: false, text: cv })
      })
      .catch(err => console.log(err))
  }

  copyClicked() {
    // making absolutely sure we have the correct contents in this.state.text before copying:
    const username = this.state.userList[this.state.selectedUser]
    const cvName = this.state.cvList[this.state.selectedCV]
    loadCV(username, cvName)
      .then((cv) => {
        const newCVName = 'copy of '.concat(cvName)
        saveCV(username, newCVName, cv)
          .then(() => {
            loadCVList(username)
              .then((cvs) => {
                this.setState({ text: cv, cvList: cvs, selectedCV: cvs.indexOf(newCVName) })
              })
              .catch(err => console.log(err))
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  deleteClicked() {
    this.setState({ deleteSelected: true })
  }

  deleteConfirmed() {
    this.setState({ deleteSelected: false })
    const username = this.state.userList[this.state.selectedUser]
    const selectedCV = this.state.selectedCV
    const lastCVSelected = selectedCV === (this.state.cvList.length - 1)
    deleteCV(username, this.state.cvList[this.state.selectedCV])
      .then(() => {
        loadCVList(username)
          .then((cvs) => {
            const newSelectedCV = lastCVSelected ? (selectedCV - 1) : selectedCV
            loadCV(username, newSelectedCV)
              .then((cv) => {
                this.setState({
                  cvList: cvs,
                  selectedCV: newSelectedCV,
                  text: cv,
                })
              })
              .catch(err => console.log(err))
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  deleteCancelled() {
    this.setState({ deleteSelected: false })
  }

  renameClicked() {
    const cvName = this.state.cvList[this.state.selectedCV]
    this.setState({ renameSelected: true, renameFieldContents: cvName })
  }

  renameFieldEdited(newContents) {
    this.setState({ renameFieldContents: newContents })
  }

  renameConfirmed() {
    this.setState({ renameSelected: false })
    const username = this.state.userList[this.state.selectedUser]
    const newName = this.state.renameFieldContents
    renameCV(username, this.state.cvList[this.state.selectedCV], newName)
      .then(() => {
        loadCVList(this.state.userList[this.state.selectedUser])
          .then((res) => {
            this.setState({ cvList: res, selectedCV: res.indexOf(newName) })
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  renameCancelled() {
    this.setState({ renameSelected: false })
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
          text={this.state.text}
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
