import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Popover, PopoverBody, PopoverHeader } from 'reactstrap'
import {
  changeView,
  updateCVList,
  cvClickedCascade,
} from '../../actions'
import { copyCV, deleteCV } from '../Api'

class CVToolbar extends Component {
  state = {
    deleteSelected: false,
  }

  copyClicked = async () => {
    const newCVID = await copyCV(this.props.cvID)
    const username = this.props.userList[this.props.selectedUserIndex].username
    const newCVList = await this.props.updateCVList(username)
    const newIndex = newCVList.findIndex(object => object.cv_id === newCVID)
    this.props.cvClickedCascade(username, newCVList, newIndex === -1 ? 0 : newIndex)
  }

  deleteConfirmed = async () => {
    this.setState({ deleteSelected: false })
    await deleteCV(this.props.cvID)
    const username = this.props.userList[this.props.selectedUserIndex].username
    const cvList = await this.props.updateCVList(username)
    const indexOutOfBounds = this.props.index >= cvList.length
    const newIndex = indexOutOfBounds ? cvList.length - 1 : this.props.index
    this.props.cvClickedCascade(username, cvList, newIndex)
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
          <div>
            <Button outline className="button" onClick={this.deleteConfirmed}>Yes</Button>
            <Button outline className="button" onClick={this.deleteCancelled}>No</Button>
          </div>
        )
      }
      return 'You cannot delete the only CV of a user.'
    }

    const DeletePopover = () => {
      return (
        <Popover placement="bottom" target={`delete${this.props.cvID}`} isOpen={this.state.deleteSelected} toggle={this.deleteCancelled}>
          <PopoverHeader>
            <DeletePopoverHeaderContents />
          </PopoverHeader>
          <PopoverBody>
            <DeletePopoverBodyContents />
          </PopoverBody>
        </Popover>
      )
    }

    return (
      <div className="my-cvs-buttongroup">
        <Button outline className="button" onClick={() => this.props.changeView('edit')}>
          <span className="fa fa-pencil" aria-hidden="true" />
        </Button>
        <Button outline className="button" onClick={this.copyClicked}>
          <span className="fa fa-files-o" aria-hidden="true" />
        </Button>
        <Button id={`delete${this.props.cvID}`} outline className="button" onClick={this.deleteClicked}>
          <span className="fa fa-trash-o" aria-hidden="true" />
        </Button>
        <DeletePopover />
      </div>


    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
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
