import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Input, InputGroupAddon, InputGroup } from 'reactstrap'
import {
  changeView,
  userClickedCascade,
  updateSearchFieldContents,
} from '../../actions'
import { downloadPDF } from '../../utils'

class SearchAndExport extends Component {
  goToHome = () => {
    const currentUserName = this.props.userList[this.props.loggedInUserIndex].full_name
    this.props.updateSearchFieldContents(currentUserName)
    if (this.props.selectedUserIndex !== this.props.loggedInUserIndex) {
      this.props.userClickedCascade(this.props.userList, this.props.loggedInUserIndex)
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
        <Button
          outline
          className="button exportbutton"
          onClick={() => {
            downloadPDF(
              this.props.userList[this.props.selectedUserIndex],
              this.props.cvList[this.props.selectedCVIndex].cv_id,
              this.props.sections,
              this.props.language,
            )
          }}
        >
          Download as PDF
        </Button>
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
    searchFieldContents: state.searchFieldContents,
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
