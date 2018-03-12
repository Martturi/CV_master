import React from 'react'
import { connect } from 'react-redux'

/* eslint react/no-danger: 0 */
const Preview = (props) => {
  return (
    <div className="preview" dangerouslySetInnerHTML={{ __html: props.previewHTML[props.language] }} />
  )
}

const mapStateToProps = (state) => {
  return {
    previewHTML: state.previewHTML,
    language: state.language,
  }
}

export default connect(
  mapStateToProps,
)(Preview)
