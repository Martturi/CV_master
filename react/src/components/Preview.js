import React, { Component } from 'react'
import { loadPreview } from './Api'

/* eslint react/no-danger: 0 */
class Preview extends Component {
  state = {
    html: '',
  }

  componentWillReceiveProps(props) {
    const oldArray = this.props.sectionContents
    const newArray = props.sectionContents
    const hasSameContents = newArray.every((value, index) => value === oldArray[index])
    if (!hasSameContents) {
      this.updatePreview(newArray)
    }
  }

  // loadPreview requires username to find the correct photo from CDN for the preview
  // The username is given as props from both Browse and Editor components
  updatePreview(sectionContents) {
    loadPreview(this.props.sectionTitles, sectionContents, this.props.username).then((resolve) => {
      this.setState({ html: resolve })
    })
  }

  render() {
    return (
      <div className="preview" dangerouslySetInnerHTML={{ __html: this.state.html }} />
    )
  }
}

export default Preview
