import React, { Component } from 'react'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'


  class Buttons extends React.Component{
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      dropdownOpen: false
    }
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  render() {
    return (
        <div id = "export">
        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>
            Export
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>Email</DropdownItem>
            <DropdownItem>Download PDF</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </div>


    )
  }
}


export default Buttons
