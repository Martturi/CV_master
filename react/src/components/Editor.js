import React, { Component } from 'react'
import EditorButtonGroup from './EditorButtonGroup'
import Sections from './Sections'
import Preview from './Preview'
import './css/Editor.css'
import './css/NavBar.css'
import { saveCV, loadCV } from './Api'


class Editor extends Component {
  state = {
    sectionContents: [],
    saveStatus: '',
  }

  componentDidMount() {
    this.openCV()
  }

  updateSection(text, sectionIndex) {
    const newContents = [...this.state.sectionContents]
    newContents[sectionIndex] = text
    this.setState({ sectionContents: newContents })
  }

  openCV() {
    loadCV(this.props.username, this.props.cvName)
      .then((sections) => {
        const diff = sections.length - this.props.sectionTitles.length
        for (let i = 0; i < diff; i += 1) sections.pop() // removing sections from the end
        for (let i = 0; i < -diff; i += 1) sections.push('') // adding (empty) sections to the end
        this.setState({ sectionContents: sections })
      })
      .catch(err => console.log(err))
  }

  async saveCV() {
    await saveCV(this.props.username, this.props.cvName, this.state.sectionContents)
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
          <Sections
            sectionTitles={this.props.sectionTitles}
            sectionContents={this.state.sectionContents}
            updateText={(text, sectionIndex) => this.updateSection(text, sectionIndex)}
          />
        </div>

        { /* unsure whether line is necessary, pain to implement beautifully
        <div className="lineContainer">
          <div className="line" />
        </div> */}
        <div className="CVpreview">
          <Preview
            username={this.props.username}
            sectionTitles={this.props.sectionTitles}
            sectionContents={this.state.sectionContents}
          />
        </div>
      </div>

    )
  }
}


export default Editor
