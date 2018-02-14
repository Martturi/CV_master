import React, { Component } from 'react'
import { loadPreview } from './Api'

/* eslint react/no-danger: 0 */
class Preview extends Component {
  state = {
    html: '',
  }

  componentWillReceiveProps(props) {
    // making sure we don't update preview before getting sections:
    if (!props.sections.length) return
    // update only if contents or username has changed:
    const oldArray = this.props.sections
    const newArray = props.sections
    const hasSameLength = newArray.length === oldArray.length
    const hasSameTitles = hasSameLength &&
        newArray.every((obj, index) => obj.eng_title === oldArray[index].eng_title)
    const hasSameContents = hasSameTitles &&
        newArray.every((obj, index) => obj.text === oldArray[index].text)
    const hasSameUser = props.username === this.props.username // for the image to update
    if (!(hasSameContents && hasSameUser)) {
      this.updatePreview(newArray, props.username)
    }
  }

  // loadPreview requires username to find the correct photo from CDN for the preview
  // The username is given as props from both Browse and Editor components
  updatePreview(sections, username) {
    loadPreview(sections, username).then((resolve) => {
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
