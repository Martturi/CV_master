import React, { Component } from 'react'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, ButtonGroup, Button } from 'reactstrap'


class Buttons extends Component {
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
      <ButtonGroup outline id="buttongroup">
        <Button outline className={'buttonClass'}>Save</Button>
        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret outline className={'buttonClass'}>
            Export
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>Download as PDF</DropdownItem>
            <DropdownItem>Share via email</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </ButtonGroup>


    )
  }
}


export default Buttons
