import React, { Component } from 'react'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, ButtonGroup, Button, Input } from 'reactstrap'


class BrowseButtons extends Component {
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
      <div id="browsegroup">
        <Input className="search" placeholder="Search..." />
        <Button outline className="buttonClass">
          <span className="fa fa-search" aria-hidden="true" />
        </Button>
        <ButtonGroup id="exportgroup">
          <Button outline className="buttonClass">Edit</Button>
          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret outline className="buttonClass">
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


export default BrowseButtons
