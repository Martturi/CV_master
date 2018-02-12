import React, { Component } from 'react'
import EditorButtonGroup from './EditorButtonGroup'
import InputSections from './InputSections'
import Preview from '../Preview'
import './Editor.css'
import { saveCV, loadCV } from '../Api'


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

  async saveCV() {
    await saveCV(this.props.username, this.props.cvName, this.state.text)
      .then((res) => {
        this.setState({ saveStatus: res })
      })
      .catch(rej => this.setState({ saveStatus: rej }))
    setTimeout(
      () => { this.setState({ saveStatus: '' }) },
      3000,
    )
  }

  render() {
    return (
      <div>
        <div id="buttons">
          <EditorButtonGroup
            saveCV={() => this.saveCV()}
            fetchPDF={() => this.props.fetchPDF()}
            saveStatus={this.state.saveStatus}
            goBack={this.props.goBack}
          />
        </div>
        <div className="sections">
          <InputSections
            text={this.state.text}
            updateText={text => this.updateText(text)}
          />
        </div>
        <div className="CVpreview">
          <Preview
            username={this.props.username}
            text={this.state.text}
          />
        </div>
      </div>

    )
  }
}


export default Editor
