import React from 'react'
import { Button, UncontrolledTooltip } from 'reactstrap'
import { connect } from 'react-redux'
import {
  updateCVList,
  cvClickedCascade,
} from '../../actions'
import Api from '../../Api'

class CvNameForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.cvName,
      editing: false,
    }
  }

  onClick = (event) => {
    event.stopPropagation()
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value })
  }

  keyPressed = (event) => {
    if (event.key === 'Enter') {
      this.saveAndExit()
    }
    if (event.key === 'Escape') {
      this.Exit()
    }
  }

  saveAndExit = async () => {
    const newCVName = this.state.value === '' ? this.props.cvName : this.state.value
    await Api.renameCV(this.props.cvID, newCVName)
    const userObject = this.props.userList[this.props.selectedUserIndex]
    const username = userObject.username
    const cvList = await this.props.updateCVList(username)
    const newIndex = cvList.findIndex(object => object.cv_id === this.props.cvID)
    this.props.cvClickedCascade(userObject, cvList, newIndex === -1 ? 0 : newIndex)
    this.setState({
      editing: false,
      value: newCVName,
    })
  }

  Exit = async () => {
    this.setState({
      editing: false,
      value: this.props.cvName,
    })
  }

  render() {
    if (this.state.editing) {
      return (
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          onBlur={this.saveAndExit}
          onClick={this.onClick}
          onKeyUp={this.keyPressed}
        />
      )
    }
    return (
      <div>
        {this.props.cvName}
        <Button
          outline
          className="button rename-button"
          id={`rename${this.props.cvID}`}
          onClick={() => this.setState({ editing: true })}
        >
          <span className="fa fa-pencil" aria-hidden="true" />
        </Button>
        <UncontrolledTooltip className="tooltip-right" delay={{ show: 600, hide: 0 }} placement="right" target={`rename${this.props.cvID}`}>
          Rename
        </UncontrolledTooltip>
        <div className="language-flag">
          {this.props.languageName}
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    userList: state.userList,
    selectedUserIndex: state.selectedUserIndex,
  }
}

const mapDispatchToProps = {
  updateCVList,
  cvClickedCascade,
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CvNameForm)
