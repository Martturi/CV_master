import React, { Component } from 'react'
import { connect } from 'react-redux'
import EditorButtonGroup from './EditorButtonGroup'
import InputSections from './InputSections'
import Preview from '../Preview'
import './Editor.css'
import { saveCV } from '../Api'
import { updateCV, updateSections } from '../../actions'

class Editor extends Component {
  state = {
    saveStatus: '',
  }

  componentDidMount() {
    this.openCV()
  }

  updateSection(sectionIndex, text) {
    const newContents = this.props.sections.map(obj => Object.assign({}, obj)) // deep copy
    newContents[sectionIndex].text = text
    this.props.updateSections(newContents)
  }

  openCV() {
    this.props.updateCV(this.props.cvID)
  }

  async saveCV() {
    await saveCV(this.props.cvID, this.props.sections)
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
            fetchPDF={() => this.props.fetchPDF(this.props.sections)}
            saveStatus={this.state.saveStatus}
          />
        </div>
        <div className="sections">
          <InputSections
            sections={this.props.sections}
            updateSection={(sectionIndex, text) => this.updateSection(sectionIndex, text)}
          />
        </div>
        <div className="CVpreview">
          <Preview />
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    cvID: state.cvList[state.selectedCVIndex].cv_id,
  }
}

const mapDispatchToProps = {
  updateSections,
  updateCV,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Editor)
