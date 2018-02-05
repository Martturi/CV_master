import React, { Component } from 'react'
import { loadPreview } from './Api'

/* eslint react/no-danger: 0 */
class Preview extends Component {
  state = {
    html: '',
  }

  componentWillReceiveProps(props) {
    if (this.props.text !== props.text) {
      this.updatePreview(props.text)
    }
  }

  // loadPreview requires username to find the correct photo from CDN for the preview
  // The username is given as props from both Browse and Editor components
  updatePreview(text = this.props.text, username = this.props.username) {
    loadPreview(text, username).then((resolve) => {
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
