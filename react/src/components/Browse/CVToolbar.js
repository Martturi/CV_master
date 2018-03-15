import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Popover, PopoverBody, ButtonGroup, UncontrolledTooltip } from 'reactstrap'
import {
  changeView,
  updateCVList,
  cvClickedCascade,
} from '../../actions'
import Api from '../../Api'

class CVToolbar extends Component {
  state = {
    deleteSelected: false,
  }

  copyClicked = async () => {
    const newCVID = await Api.copyCV(this.props.cvID)
    const userObject = this.props.userList[this.props.selectedUserIndex]
    const newCVList = await this.props.updateCVList(userObject.username)
    const newIndex = newCVList.findIndex(object => object.cv_id === newCVID)
    this.props.cvClickedCascade(userObject, newCVList, newIndex === -1 ? 0 : newIndex)
  }

  deleteConfirmed = async () => {
    this.setState({ deleteSelected: false })
    await Api.deleteCV(this.props.cvID)
    const userObject = this.props.userList[this.props.selectedUserIndex]
    const cvList = await this.props.updateCVList(userObject.username)
    const indexOutOfBounds = this.props.index >= cvList.length
    const newIndex = indexOutOfBounds ? cvList.length - 1 : this.props.index
    this.props.cvClickedCascade(userObject, cvList, newIndex)
  }

  deleteClicked = () => {
    this.setState({ deleteSelected: true })
  }

  deleteCancelled = () => {
    this.setState({ deleteSelected: false })
  }

  render() {
    const DeletePopoverHeaderContents = () => {
      if (this.props.cvList.length >= 2) {
        return 'Are you sure you want to delete this CV?'
      }
      return 'Deleting denied.'
    }

    const DeletePopoverBodyContents = () => {
      if (this.props.cvList.length >= 2) {
        return (
          <ButtonGroup className="popover-buttongroup">
            <Button outline className="button" onClick={this.deleteConfirmed}>Yes</Button>
            <Button outline className="button" onClick={this.deleteCancelled}>No</Button>
          </ButtonGroup>
        )
      }
      return 'You cannot delete the only CV of a user.'
    }

    const DeletePopover = () => {
      return (
        <Popover placement="bottom" target={`delete${this.props.cvID}`} isOpen={this.state.deleteSelected} toggle={this.deleteCancelled}>
          <PopoverBody>
            <DeletePopoverHeaderContents /><br />
            <DeletePopoverBodyContents />
          </PopoverBody>
        </Popover>
      )
    }

    return (
      <ButtonGroup>
        <Button outline id={`edit${this.props.cvID}`} className="button" onClick={() => this.props.changeView('edit')}>
          <span className="fa fa-pencil" aria-hidden="true" />
        </Button>
        <UncontrolledTooltip className="tooltip-top" delay={{ show: 600, hide: 0 }} placement="top" target={`edit${this.props.cvID}`}>
            Edit
        </UncontrolledTooltip>
        <Button outline id={`copy${this.props.cvID}`} className="button" onClick={this.copyClicked}>
          <span className="fa fa-files-o" aria-hidden="true" />
        </Button>
        <UncontrolledTooltip className="tooltip-top" delay={{ show: 600, hide: 0 }} placement="top" target={`copy${this.props.cvID}`}>
            Copy
        </UncontrolledTooltip>
        <Button id={`delete${this.props.cvID}`} outline className="button" onClick={this.deleteClicked}>
          <span className="fa fa-trash-o" aria-hidden="true" />
        </Button>
        <UncontrolledTooltip className="tooltip-top" delay={{ show: 600, hide: 0 }} placement="top" target={`delete${this.props.cvID}`}>
            Delete
        </UncontrolledTooltip>
        <DeletePopover />
      </ButtonGroup>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userList: state.userList,
    cvList: state.cvList,
    selectedUserIndex: state.selectedUserIndex,
  }
}

const mapDispatchToProps = {
  changeView,
  updateCVList,
  cvClickedCascade,
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CVToolbar)
