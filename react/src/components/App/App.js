import React, { Component } from 'react'
import './App.css'
import CVEditor from './CVEditor'
import SearchField from './SearchField'
import { saveCV, loadCV } from './Api'
import Preview from './Preview'
import BrowseApp from '../Browse/BrowseApp'

class App extends Component {
  constructor(props) {
    super(props)
    const testCVs = ['CV 1', 'CV 2', 'CV 3']
    const testUsers = ['Maija Meikäläinen', 'Heikki Heikäläinen', 'Mikko Mallikas']
    const testUser = 0
    this.state = {
      browserView: true,
      // browser configurations:
      exportDropDownOpen: false,
      userList: testUsers,
      selectedUser: testUser,
      allCVs: testUsers.map(() => testCVs.slice()), // slice() copies array. only for testing
      cvList: testCVs,
      selectedCV: 0,
      deleteSelected: false,
      renameSelected: false,
      renameFieldContents: '',
      // editor configurations:
      uid: '0',
      text: '',
      saveStatus: '',
    }
  }

  componentDidMount() {
    this.openCV()
    this.render()
  }

  // browser methods ->
  updateAllCVs() {
    const cvs = this.state.allCVs
    cvs[this.state.selectedUser] = this.state.cvList
    this.setState({ allCVs: cvs })
  }

  userClicked(index) {
    this.setState({
      selectedUser: index,
      cvList: this.state.allCVs[index],
      selectedCV: 0,
    })
  }

  cvClicked(index) {
    this.setState({ selectedCV: index })
  }

  editClicked() {
    this.setState({ browserView: false })
  }

  copyClicked() {
    const newCvName = 'copy of '.concat(this.state.cvList[this.state.selectedCV])
    const cvs = this.state.cvList
    cvs.push(newCvName)
    this.setState({ cvList: cvs })
    this.updateAllCVs()
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
    this.updateAllCVs()
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
    const cvs = this.state.cvList
    cvs[this.state.selectedCV] = this.state.renameFieldContents
    this.setState({ cvList: cvs, renameSelected: false, renameFieldContents: '' })
    this.updateAllCVs()
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

  fetchPDF() {
    fetch(`api/${this.state.uid}/pdf`)
      .then(res => res.blob())
      .then((blob) => {
        const file = new File([blob], `${this.state.uid}.pdf`, { type: 'application/pdf' })
        const a = document.createElement('a')
        a.href = URL.createObjectURL(file)
        a.download = `${this.state.uid}.pdf`
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
        <SearchField
          uid={this.state.uid}
          updateUID={uid => this.updateUID(uid)}
          openCV={() => this.openCV()}
        />
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
