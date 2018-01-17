import React, { Component } from 'react'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, ButtonGroup, Button, Input } from 'reactstrap'


class BrowseButtonGroup extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      dropdownOpen: false,
    }
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    })
  }


  render() {
    return (
      <div className="buttonheader">
        <Input className="search" placeholder="Search..." />
        <Button outline className="button">
          <span className="fa fa-search" aria-hidden="true" />
        </Button>
        <ButtonGroup className="exportgroup">
          <Button outline className="button">Edit</Button>
          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret outline className="button">
              Export
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Download as PDF</DropdownItem>
              <DropdownItem>Share via email</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </ButtonGroup>
      </div>


    )
  }
}


export default BrowseButtonGroup
