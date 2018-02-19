import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, ButtonGroup, Button } from 'reactstrap'
import { changeView } from '../../actions'


class EditorButtonGroup extends Component {
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

  // The content gets saved automatically when it's downloaded.
  saveAndExport = async () => {
    await this.props.saveCV()
    this.props.fetchPDF()
  }

  goBack = () => {
    this.props.changeView(this.props.lastView)
  }


  render() {
    return (
      <div className="buttonheader editor-buttonheader">
        <Button outline className="button" onClick={this.goBack}>Back</Button>
        <ButtonGroup outline="true" className="exportgroup">
          <Button outline className="button" onClick={this.props.saveCV}>Save</Button>
          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret outline className="button">
              Export
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={this.saveAndExport}>Download as PDF</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </ButtonGroup>
        <div id="savestatus" className="statusMessage">{this.props.saveStatus.toString()}</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    lastView: state.lastView,
  }
}

const mapDispatchToProps = {
  changeView,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditorButtonGroup)

