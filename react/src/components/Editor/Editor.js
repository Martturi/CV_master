import React from 'react'
import { connect } from 'react-redux'
import EditorButtonGroup from './EditorButtonGroup'
import InputSections from './InputSections'
import Preview from '../Preview'
import './Editor.css'
import { loadSections } from '../../actions'

const Editor = () => {
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

const mapStateToProps = (state) => {
  return {
    cvID: state.cvList[state.selectedCVIndex].cv_id,
  }
}

const mapDispatchToProps = {
  loadSections,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Editor)
