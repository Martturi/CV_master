import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, ButtonGroup, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Popover, PopoverBody } from 'reactstrap'
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
      saveStatus: '',
      languageDropdownOpen: false,
      cvLanguageObjects: [],
      closeSelected: false,
    }
  }

  componentDidMount() {
    this.loadCVLanguages()
  }

  loadCVLanguages = async () => {
    const languages = await Api.loadLanguages()
    this.setState({ cvLanguageObjects: languages })
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

  equalSections = (a, b) => {
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i += 1) {
      if (a[i].eng_text !== b[i].eng_text) {
        return false
      }
    }
    return true
  }

  close = async () => {
    const oldSections = await Api.loadCV(this.props.cvID)
    if (this.equalSections(this.props.sections, oldSections)) {
      this.closeWithoutSaving()
    } else {
      this.setState({ closeSelected: true })
    }
  }

  closeCancelled = () => {
    this.setState({ closeSelected: false })
  }

  closeWithoutSaving = async () => {
    this.props.changeView(this.props.lastView)
    const sections = await this.props.loadSections(this.props.cvID)
    this.props.updatePreview(sections, this.props.userObject)
  }

  closeWithSaving = async () => {
    await this.saveCV()
    this.closeWithoutSaving()
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
          {languageName ? languageName[0].toUpperCase() + languageName.slice(1) : ''}
        </DropdownItem>
      )
    })
    const ClosePopover = () => {
      return (
        <Popover placement="bottom" target="closebutton" isOpen={this.state.closeSelected} toggle={this.closeCancelled}>
          <PopoverBody>
            You have unsaved changes. Save before closing? <br />
            <ButtonGroup className="popover-buttongroup">
              <Button outline className="button" onClick={this.closeWithSaving}>Yes</Button>
              <Button outline className="button" onClick={this.closeWithoutSaving}>No</Button>
            </ButtonGroup>
          </PopoverBody>
        </Popover>
      )
    }

    return (
      <div className="buttonheader editor-buttonheader">
        <ButtonGroup>
          <Button outline className="button" id="closebutton" onClick={this.close}>Close</Button>
          <Button outline className="button" onClick={this.saveCV}>Save</Button>
        </ButtonGroup>
        <ButtonDropdown className="language-dropdown" isOpen={this.state.languageDropdownOpen} toggle={this.toggleLanguage}>
          <DropdownToggle caret outline className="button">
            {this.props.cvLanguageName ? this.props.cvLanguageName[0].toUpperCase() + this.props.cvLanguageName.slice(1) : ''}
          </DropdownToggle>
          <DropdownMenu>
            {languageDropdownItems}
          </DropdownMenu>
        </ButtonDropdown>
        <div id="savestatus" className="statusMessage">{this.state.saveStatus.toString()}</div>
        <Button outline className="button exportbutton" onClick={this.saveAndExport}>Download as PDF</Button>
        <ClosePopover />
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
