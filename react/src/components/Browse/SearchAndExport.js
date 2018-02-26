import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, ButtonGroup, Button, Input } from 'reactstrap'
import {
  changeView,
  userClickedCascade,
} from '../../actions'
import { downloadPDF } from '../../utils'

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

  myCVsToggle = async () => {
    if (this.props.view === 'browse') {
      if (this.props.selectedUserIndex !== this.props.loggedInUserIndex) {
        this.props.userClickedCascade(this.props.userList, this.props.loggedInUserIndex)
      }
      this.props.changeView('myCVs')
    } else {
      this.props.changeView('browse')
    }
    await this.props.selectCVIndex(0)
    // this.props.updateCV(this.props.cvList[this.props.selectedCVIndex].cv_id)
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
        <Button outline className="button" active={this.props.view === 'myCVs'} id="myCVsButton" onClick={this.myCVsToggle}>My CVs</Button>
        <ButtonGroup className="exportgroup">
          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret outline className="button">
              Export
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem
                onClick={() => {
                  downloadPDF(
                    this.props.userList[this.props.selectedUserIndex].username,
                    this.props.cvList[this.props.selectedCVIndex].cv_id,
                    this.props.sections,
                  )
                }}
              >
                Download as PDF
              </DropdownItem>
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
    selectedUserIndex: state.selectedUserIndex,
    loggedInUserIndex: state.loggedInUserIndex,
    userList: state.userList,
    cvList: state.cvList,
    selectedCVIndex: state.selectedCVIndex,
    sections: state.sections,
  }
}

const mapDispatchToProps = {
  changeView,
  userClickedCascade,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchAndExport)
