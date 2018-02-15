import React, { Component } from 'react'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, ButtonGroup, Button, Input } from 'reactstrap'

class SearchAndExport extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      dropdownOpen: false,
    }
  }

  onClick = () => {
    this.props.myCVsToggle()
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    })
  }

  render() {
    return (
      <div className="buttonheader searchheader">
        <div className="searchAndMyCVs">
          <div className="searchfield-and-button">
            <Input className="search" placeholder="Search..." />
            <Button outline className="button" id="searchbutton">
              <span className="fa fa-search" aria-hidden="true" />
            </Button>
          </div>
          <Button outline active={this.props.view === 'myCVs'} id="myCVsButton" onClick={this.onClick}>My CVs</Button>
        </div>
        <ButtonGroup className="exportgroup">
          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret outline className="button">
              Export
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={this.props.fetchPDF}>Download as PDF</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </ButtonGroup>
      </div>
    )
  }
}


export default SearchAndExport
