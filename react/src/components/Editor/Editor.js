import React from 'react'
import { connect } from 'react-redux'
import EditorButtonGroup from './EditorButtonGroup'
import InputSections from './InputSections'
import Preview from '../Preview'
import './Editor.css'
import { loadSections } from '../../actions'

const Editor = (props) => {
  return (
    <div>
      <div id="buttons">
        <EditorButtonGroup uid={props.uid} cvid={props.cvid} />
      </div>
      <div className="sections">
        <InputSections uid={props.uid} />
      </div>
      <div className="CVpreview">
        <Preview />
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    uid: ownProps.uid,
    cvid: ownProps.cvid,
  }
}

const mapDispatchToProps = {
  loadSections,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Editor)
