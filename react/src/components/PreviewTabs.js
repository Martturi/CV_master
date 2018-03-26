import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TabContent, Button, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import classnames from 'classnames'
import Preview from './Preview'
import PDFpreview from './PDFpreview'
import { displayPDF } from '../utils'


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
              onClick={() => { this.toggle('2') }}
            >
              PDF Preview
            </NavLink>
          </NavItem>
          <Button onClick={() => {
            displayPDF(
              this.props.username,
              this.props.cvid,
              this.props.sections,
            )
          }}
          >click me</Button>
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
    cvid: state.cvList[state.selectedCVIndex],
    sections: state.sections,
  }
}

export default connect(mapStateToProps)(PreviewTabs)
