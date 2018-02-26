import React from 'react'
import { Button } from 'reactstrap'
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
  }

  saveAndExit = async () => {
    const newCVName = this.state.value === '' ? this.props.cvName : this.state.value
    await Api.renameCV(this.props.cvID, newCVName)
    const username = this.props.userList[this.props.selectedUserIndex].username
    const cvList = await this.props.updateCVList(username)
    const newIndex = cvList.findIndex(object => object.cv_id === this.props.cvID)
    this.props.cvClickedCascade(username, cvList, newIndex === -1 ? 0 : newIndex)
    this.setState({
      editing: false,
      value: newCVName,
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
        <Button outline className="button rename-button" id={`rename${this.props.index}`} onClick={() => this.setState({ editing: true })}>
          <span className="fa fa-pencil" aria-hidden="true" />
        </Button>
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
