import React, { Component } from 'react'
import { connect } from 'react-redux'
import EditorButtonGroup from './EditorButtonGroup'
import InputSections from './InputSections'
import Preview from '../Preview'
import './Editor.css'
import { saveCV, loadCV } from '../Api'

class Editor extends Component {
  state = {
    sections: [],
    saveStatus: '',
  }

  componentDidMount() {
    this.openCV()
  }

  updateSection(sectionIndex, text) {
    const newContents = this.state.sections.map(obj => Object.assign({}, obj)) // deep copy
    newContents[sectionIndex].text = text
    this.setState({ sections: newContents })
  }

  openCV() {
    loadCV(this.props.cvList[this.props.selectedCVIndex].cv_id)
      .then((sections) => {
        this.setState({ sections })
      })
      .catch(err => console.log(err))
  }

  async saveCV() {
    await saveCV(this.props.cvList[this.props.selectedCVIndex].cv_id, this.state.sections)
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
            fetchPDF={() => this.props.fetchPDF(this.state.sections)}
            saveStatus={this.state.saveStatus}
          />
        </div>
        <div className="sections">
          <InputSections
            sections={this.state.sections}
            updateSection={(sectionIndex, text) => this.updateSection(sectionIndex, text)}
          />
        </div>
        <div className="CVpreview">
          <Preview
            username={this.props.userList[this.props.selectedUserIndex].username}
            sections={this.state.sections}
          />
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(
  mapStateToProps,
)(Editor)
