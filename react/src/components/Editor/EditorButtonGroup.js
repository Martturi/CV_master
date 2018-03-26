import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, ButtonGroup, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Popover, PopoverBody } from 'reactstrap'
import {
  updateCVList,
  loadSections,
  updatePreview,
} from '../../actions'
import Api from '../../Api'
import { downloadPDF } from '../../utils'
import history from '../../history'


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
    const { saveMessage } = await this.saveCV(languageID)
    if (saveMessage === 'Save succeeded.') {
      const sections = await this.props.loadSections(this.props.cvID)
      this.props.updatePreview(sections, this.props.username)
    }
  }

  saveCV = async (languageID = this.props.cvLanguageID) => {
    const cvID = this.props.cvID
    const saveMessage = await Api.saveCV(cvID, this.props.username, this.props.sections, languageID)
    this.setState({ saveStatus: saveMessage })
    window.setTimeout(() => {
      this.setState({ saveStatus: '' })
    }, 3000)
    await this.props.updateCVList(this.props.username)
    return { saveMessage }
  }

  // The content gets saved automatically when it's downloaded.
  saveAndExport = async () => {
    await this.saveCV()
    downloadPDF(
      this.props.username,
      this.props.cvID,
      this.props.sections,
    )
  }

  equalSections = (a, b) => {
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i += 1) {
      if (a[i].text !== b[i].text) {
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
    history.push(`/users/${this.props.username}/${this.props.cvID}`)
    const sections = await this.props.loadSections(this.props.cvID)
    this.props.updatePreview(sections, this.props.username)
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
          <Button outline className="button" onClick={() => this.saveCV()}>Save</Button>
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

const mapStateToProps = (state, ownProps) => {
  return {
    lastView: state.lastView,
    sections: state.sections,
    username: ownProps.uid,
    cvID: ownProps.cvid,
    cvLanguageName: state.cvList.length === 0 ? 'English' :
      state.cvList.find(cv => cv.cv_id === ownProps.cvid).language_name,
    cvLanguageID: state.cvList.length === 0 ? 0 :
      state.cvList.find(cv => cv.cv_id === ownProps.cvid).language_id,
  }
}

const mapDispatchToProps = {
  updateCVList,
  loadSections,
  updatePreview,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditorButtonGroup)
