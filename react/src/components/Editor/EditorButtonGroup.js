import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, ButtonGroup, Button } from 'reactstrap'
import {
  changeView,
  updateCVList,
  selectCVIndex,
  loadSections,
  updatePreview,
  cvClickedCascade,
} from '../../actions'
import Api from '../../Api'
import { downloadPDF } from '../../utils'


class EditorButtonGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dropdownOpen: false, // this will be removed later
      saveStatus: '',
      languageDropdownOpen: false,
      cvLanguageObjects: [],
    }
  }

  componentDidMount() {
    this.loadCVLanguages()
  }

  loadCVLanguages = async () => {
    const languages = await Api.loadLanguages()
    this.setState({ cvLanguageObjects: languages })
  }

  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen })
  }

  toggleLanguage = () => {
    this.setState({ languageDropdownOpen: !this.state.languageDropdownOpen })
  }

  languageClicked = async (languageID) => {
    const { saveMessage, newCVList, newSelectedCVIndex } = await this.saveCV(languageID)
    if (saveMessage === 'Save succeeded.') {
      this.props.cvClickedCascade(
        this.props.userObject,
        newCVList,
        newSelectedCVIndex,
      )
    }
  }

  saveCV = async (languageID = this.props.cvLanguageID) => {
    const cvID = this.props.cvID
    const username = this.props.userObject.username
    const saveMessage = await Api.saveCV(cvID, username, this.props.sections, languageID)
    this.setState({ saveStatus: saveMessage })
    window.setTimeout(() => {
      this.setState({ saveStatus: '' })
    }, 3000)
    const newCVList = await this.props.updateCVList(username)
    const newSelectedCVIndex = newCVList.findIndex(cvObj => cvObj.cv_id === cvID)
    this.props.selectCVIndex(newSelectedCVIndex)
    return { saveMessage, newCVList, newSelectedCVIndex }
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
    const languageDropdownItems = this.state.cvLanguageObjects.map((languageObject) => {
      const languageName = languageObject.language_name
      const languageID = languageObject.language_id
      const isCVLanguage = languageID === this.props.cvLanguageID
      if (isCVLanguage) return false
      return (
        <DropdownItem
          key={languageID}
          onClick={() => this.languageClicked(languageID)}
          active={languageID === this.props.cvLanguageID}
        >
          {languageName}
        </DropdownItem>
      )
    })
    return (
      <div className="buttonheader editor-buttonheader">
        <Button outline className="button" onClick={this.goBack}>Back</Button>
        <ButtonDropdown isOpen={this.state.languageDropdownOpen} toggle={this.toggleLanguage}>
          <DropdownToggle caret outline className="button">
            {this.props.cvLanguageName}
          </DropdownToggle>
          <DropdownMenu>
            {languageDropdownItems}
          </DropdownMenu>
        </ButtonDropdown>
        <ButtonGroup outline="true" className="exportgroup">
          <Button outline className="button" onClick={() => this.saveCV()}>Save</Button>
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
    cvLanguageName: state.cvList[state.selectedCVIndex].language_name,
    cvLanguageID: state.cvList[state.selectedCVIndex].language_id,
  }
}

const mapDispatchToProps = {
  cvClickedCascade,
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
