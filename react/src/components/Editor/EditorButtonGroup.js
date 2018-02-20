import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, ButtonGroup, Button } from 'reactstrap'
import { changeView } from '../../actions'
import { saveCV } from '../Api'
import { downloadPDF } from '../../utils'


class EditorButtonGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dropdownOpen: false,
      saveStatus: '',
    }
  }

  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen })
  }

  saveCV = async () => {
    const saveMessage = await saveCV(this.props.cvID, this.props.sections)
    this.setState({ saveStatus: saveMessage })
  }

  // The content gets saved automatically when it's downloaded.
  saveAndExport = async () => {
    await this.saveCV()
    downloadPDF(
      this.props.userList[this.props.selectedUserIndex].username,
      this.props.cvID,
      this.props.sections)
  }

  goBack = () => {
    this.props.changeView(this.props.lastView)
  }


  render() {
    return (
      <div className="buttonheader editor-buttonheader">
        <Button outline className="button" onClick={this.goBack}>Back</Button>
        <ButtonGroup outline="true" className="exportgroup">
          <Button outline className="button" onClick={this.saveCV}>Save</Button>
          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret outline className="button">
              Export
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={this.saveAndExport}>Download as PDF</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </ButtonGroup>
        <div id="savestatus" className="statusMessage">{this.state.saveStatus.toString()}</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    lastView: state.lastView,
    sections: state.sections,
    userList: state.userList,
    selectedUserIndex: state.selectedUserIndex,
    cvList: state.cvList,
    selectedCVIndex: state.selectedCVIndex,
    cvID: state.cvList.length ? state.cvList[state.selectedCVIndex].cv_id : 0,
  }
}

const mapDispatchToProps = {
  changeView,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditorButtonGroup)

