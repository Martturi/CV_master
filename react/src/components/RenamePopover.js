import React, { Component } from 'react'
import { Button, Popover, PopoverBody, PopoverHeader, Input } from 'reactstrap'

class RenamePopover extends Component {
  state = {
    newName: '',
  }

  renameConfirmed() {
    this.props.renameConfirmed(this.state.newName)
    this.setState({ newName: '' })
  }

  render() {
    return (
      <Popover placement="bottom" target={`rename${this.props.index}`} isOpen={this.props.renameSelected} toggle={() => this.props.renameCancelled()}>
        <PopoverHeader>Enter a new name for the selected CV</PopoverHeader>
        <PopoverBody>
          <Input
            placeholder="New name..."
            onChange={event => this.setState({ newName: event.target.value })}
          />
          <Button outline className="button" onClick={() => this.renameConfirmed()}>Confirm</Button>
          <Button outline className="button" onClick={() => this.props.renameCancelled()}>Cancel</Button>
        </PopoverBody>
      </Popover>
    )
  }
}

export default RenamePopover
