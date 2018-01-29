import React, { Component } from 'react'
import EditorButtonGroup from './EditorButtonGroup'
import Sections from './Sections'
import NavBar from './NavBar'
import Preview from './Preview'
import './Editor.css'
import './NavBar.css'
import { saveCV, loadCV } from './Api'


class Editor extends Component {
  state = {
    uid: '0',
    text: '',
    saveStatus: '',
  }

  componentDidMount() {
    this.openCV()
    this.render()
  }

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
    fetch(`api/users/${this.state.uid}/pdf`)
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
    return (
      <div>
        <header id="navbar">
          <NavBar />
        </header>
        <div id="buttons">
          <EditorButtonGroup
            saveCV={() => this.saveCV()}
            fetchPDF={() => this.fetchPDF()}
            saveStatus={this.state.saveStatus}
            goBack={this.props.goBack}
          />
        </div>
        <div className="sections">
          <Sections
            text={this.state.text}
            updateText={text => this.updateText(text)}
          />
        </div>

        { /* unsure whether line is necessary, pain to implement beautifully
        <div className="lineContainer">
          <div className="line" />
        </div> */}
        <div className="CVpreview">
          <Preview
            text={this.state.text}
          />
        </div>
      </div>

    )
  }
}


export default Editor
