import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, ButtonGroup, Button, Input,
  InputGroupAddon, InputGroup } from 'reactstrap'
import {
  changeView,
  userClickedCascade,
  updateSearchFieldContents,
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

  goToHome = () => {
    const currentUserName = this.props.userList.find(user =>
      user.username === this.props.uid).username
    this.props.updateSearchFieldContents(currentUserName)
    if (this.props.uid !== this.props.loggedInUser) {
      this.props.userClickedCascade(this.props.userList, this.props.loggedInUser)
    }
  }

  clearSearchFieldContents = () => {
    this.props.updateSearchFieldContents('')
  }

  render() {
    return (
      <div className="buttonheader">
        <div className="searchfield-and-button">
          <Button outline className="button" id="homebutton" onClick={this.goToHome}>
            <i className="fa fa-home" />
          </Button>
          <InputGroup className="searchfield pl-1">
            <Input
              placeholder="Search..."
              value={this.props.searchFieldContents}
              onChange={e => this.props.updateSearchFieldContents(e.target.value)}
            />
            <InputGroupAddon addonType="append">
              <Button
                onClick={this.clearSearchFieldContents}
                className="button"
                id="clearbutton"
              >
                <i className="fa fa-times-circle" />
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </div>
        <ButtonGroup className="exportgroup">
          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret outline className="button">
              Export
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem
                onClick={() => {
                  downloadPDF(
                    this.props.username,
                    this.props.cvid,
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

const mapStateToProps = (state, ownProps) => {
  return {
    view: state.view,
    loggedInUser: state.loggedInUser,
    userList: state.userList,
    cvList: state.cvList,
    sections: state.sections,
    searchFieldContents: state.searchFieldContents,
    cvid: ownProps.cvid,
    username: ownProps.uid,
  }
}

const mapDispatchToProps = {
  changeView,
  userClickedCascade,
  updateSearchFieldContents,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchAndExport)
