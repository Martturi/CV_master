import React, { Component } from 'react'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, ButtonGroup, Button } from 'reactstrap'


class EditorButtonGroup extends Component {
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
        <Button outline className="button" onClick={this.props.goBack}>Back</Button>
        <ButtonGroup outline className="exportgroup">
          <Button outline className="button" onClick={this.props.saveCV}>Save</Button>
          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret outline className="button">
              Export
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={this.props.fetchPDF}>Download as PDF</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </ButtonGroup>
        <div id="savestatus" className="statusMessage">{this.props.saveStatus}</div>
      </div>
    )
  }
}


export default EditorButtonGroup
