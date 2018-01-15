import React, { Component } from 'react'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, ButtonGroup, Button, Input } from 'reactstrap'


class MyCVsButtonGroup extends Component {
  
  render() {
    return (
      <div id="my-cvs-buttongroup">
        <Button outline className="button">
          <span className="fa fa-pencil" aria-hidden="true" />
        </Button>
        <Button outline className="button">
          <span className="fa fa-files-o" aria-hidden="true" />
        </Button>
        <Button outline className="button">
          <span className="fa fa-trash-o" aria-hidden="true" />
        </Button>
      </div>


    )
  }
}


export default MyCVsButtonGroup
