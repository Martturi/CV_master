import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadPreview } from './Api'

/* eslint react/no-danger: 0 */
class Preview extends Component {
  state = {
    html: '',
  }

  componentWillReceiveProps(props) {
    if (props.sections.length !== 0) {
      // TODO: Preview only updates when user or content is changed
      this.updatePreview(props.sections, props.userList[props.selectedUserIndex].username)
    }
  }

  // loadPreview requires username to find the correct photo from CDN for the preview
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

const mapStateToProps = (state) => {
  return {
    view: state.view,
    sections: state.sections,
    userList: state.view === 'myCVs' ? [state.userList[state.loggedInUserIndex]] : state.userList,
    selectedUserIndex: state.selectedUserIndex,
  }
}

export default connect(
  mapStateToProps,
)(Preview)

