import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TabContent, Button, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import classnames from 'classnames'
import Preview from './Preview'
import PDFpreview from './PDFpreview'
import { displayPDF, downloadPDF } from '../utils'


class PreviewTabs extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      activeTab: '1',
    }
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      })
    }
  }

  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1') }}
            >
              Live Preview
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => {
                this.toggle('2')
                displayPDF(
                  this.props.username,
                  this.props.selectedCV,
                  this.props.sections,
                )
              }}
            >
              PDF Preview
            </NavLink>
          </NavItem>
          <Button
            outline
            className="button exportbutton"
            onClick={() => {
              console.log(this.props.cvid)
              downloadPDF(
                this.props.username,
                this.props.selectedCV,
                this.props.sections,
              )
            }}
          >
            Download as PDF
          </Button>
        </Nav>

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Preview />
          </TabPane>
          <TabPane tabId="2">
            <PDFpreview />
          </TabPane>
        </TabContent>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.selectedUser,
    selectedCV: state.cvList[state.selectedCVIndex],
    sections: state.sections,
  }
}

export default connect(mapStateToProps)(PreviewTabs)
