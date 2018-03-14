import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, ButtonGroup, Button } from 'reactstrap'
import {
  changeView,
  updateCVList,
  selectCVIndex,
  loadSections,
  updatePreview,
} from '../../actions'
import Api from '../../Api'
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
    const cvID = this.props.cvID
    const username = this.props.userObject.username
    const saveMessage = await Api.saveCV(cvID, username, this.props.sections)
    this.setState({ saveStatus: saveMessage })
    window.setTimeout(() => {
      this.setState({ saveStatus: '' })
    }, 3000)
    const newCVList = await this.props.updateCVList(username)
    const newSelectedCVIndex = newCVList.findIndex(cvObj => cvObj.cv_id === cvID)
    this.props.selectCVIndex(newSelectedCVIndex)
  }

  // The content gets saved automatically when it's downloaded.
  saveAndExport = async () => {
    await this.saveCV()
    downloadPDF(
      this.props.userObject,
      this.props.cvID,
      this.props.sections,
    )
  }

  goBack = async () => {
    this.props.changeView(this.props.lastView)
    const sections = await this.props.loadSections(this.props.cvID)
    this.props.updatePreview(sections, this.props.userObject)
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
              <DropdownItem onClick={this.saveAndExport}>Save and export as PDF</DropdownItem>
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
    userObject: state.userList[state.selectedUserIndex],
    cvID: state.cvList[state.selectedCVIndex].cv_id,
  }
}

const mapDispatchToProps = {
  changeView,
  updateCVList,
  selectCVIndex,
  loadSections,
  updatePreview,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditorButtonGroup)
