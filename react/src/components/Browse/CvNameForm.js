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

  buttonOnClick = (event) => {
    event.stopPropagation()
    this.setState({ editing: true })
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
<<<<<<< HEAD
    const userObject = this.props.userList[this.props.selectedUserIndex]
    const username = userObject.username
=======
    const username = this.props.userList.find(user =>
      user.username === this.props.uid).username
>>>>>>> 21e1f5b... Fix bugs and refactor more.
    const cvList = await this.props.updateCVList(username)
    const newIndex = cvList.findIndex(object => object.cv_id === this.props.cvID)
    this.props.cvClickedCascade(username, cvList, newIndex === -1 ? 0 : newIndex)
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
          autoFocus //eslint-disable-line
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
<<<<<<< HEAD
        <Button
          outline
          className="button rename-button"
          id={`rename${this.props.cvID}`}
          onClick={() => this.setState({ editing: true })}
        >
=======
        <Button outline className="button rename-button" id={`rename${this.props.index}`} onClick={this.buttonOnClick}>
>>>>>>> 21e1f5b... Fix bugs and refactor more.
          <span className="fa fa-pencil" aria-hidden="true" />
        </Button>
        <UncontrolledTooltip className="tooltip-right" delay={{ show: 600, hide: 0 }} placement="right" target={`rename${this.props.cvID}`}>
          Rename
        </UncontrolledTooltip>
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    cvName: ownProps.cvName,
    userList: state.userList,
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
