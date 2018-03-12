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
          <InputGroup className="searchfield">
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
              this.props.username,
              this.props.cvid,
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
