import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, ButtonGroup, Button, Input } from 'reactstrap'
import { changeView } from '../../actions'

class SearchAndExport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dropdownOpen: false,
    }
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    })
  }

  onClick = () => {
    this.props.myCVsToggle()
  }

  render() {
    return (
      <div className="buttonheader">
        <div className="searchfield-and-button">
          <Input className="searchfield" placeholder="Search..." />
          <Button outline className="button" id="searchbutton">
            <span className="fa fa-search" aria-hidden="true" />
          </Button>
        </div>
        <Button outline className="button" active={this.props.view === 'myCVs'} id="myCVsButton" onClick={this.onClick}>My CVs</Button>
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

const mapStateToProps = (state) => {
  return {
    view: state.view,
  }
}

const mapDispatchToProps = {
  changeView,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchAndExport)

