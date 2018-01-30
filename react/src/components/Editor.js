import React, { Component } from 'react'
import EditorButtonGroup from './EditorButtonGroup'
import Sections from './Sections'
import NavBar from './NavBar'
import Preview from './Preview'
import './css/Editor.css'
import './css/NavBar.css'
import { saveCV, loadCV } from './Api'


class Editor extends Component {
  state = {
    text: '',
    saveStatus: '',
  }

  componentDidMount() {
    this.openCV()
  }

  updateText(text) {
    this.setState({ text })
  }

  openCV() {
    loadCV(this.props.username, this.props.cvName)
      .then((res) => {
        this.setState({ text: res })
      })
      .catch(err => console.log(err))
  }

  saveCV() {
    saveCV(this.props.username, this.props.cvName, this.state.text)
      .then(res => this.setState({ saveStatus: res }))
      .catch(rej => this.setState({ saveStatus: rej }))
    setTimeout(
      () => { this.setState({ saveStatus: '' }) },
      3000,
    )
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
            fetchPDF={() => this.props.fetchPDF()}
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
