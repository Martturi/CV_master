import React, { Component } from 'react'
import { connect } from 'react-redux'
import EditorButtonGroup from './EditorButtonGroup'
import InputSections from './InputSections'
import Preview from '../Preview'
import './Editor.css'
import { updateCV, updateSections } from '../../actions'

class Editor extends Component {
  componentDidMount() {
    this.openCV()
  }

  openCV() {
    this.props.updateCV(this.props.cvID)
  }

  render() {
    return (
      <div>
        <div id="buttons">
          <EditorButtonGroup />
        </div>
        <div className="sections">
          <InputSections />
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
