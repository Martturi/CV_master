import React from 'react'
import { connect } from 'react-redux'
import EditorButtonGroup from './EditorButtonGroup'
import InputSections from './InputSections'
import './Editor.css'

const Editor = () => {
  return (
    <div>
      <div id="buttons">
        <EditorButtonGroup />
      </div>
      <div className="sections">
        <InputSections />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    cvID: state.cvList[state.selectedCVIndex].cv_id,
  }
}

export default connect(
  mapStateToProps,
)(Editor)
