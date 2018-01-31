import React from 'react'
import { ListGroup, ListGroupItem, ListGroupItemText, ListGroupItemHeading } from 'reactstrap'
import CVToolbar from './CVToolbar'

class CVList extends React.Component {
  render() {
    const listGroupItems = this.props.cvList.map((cvName, index) => {
      const isActive = this.props.selectedCVIndex === index
      return (
        <ListGroupItem key={cvName} active={isActive} tag="a" href="#" action onClick={() => this.props.cvClicked(index)}>
          <div className="cvinfo">
            <ListGroupItemHeading>{cvName}</ListGroupItemHeading>
            <ListGroupItemText className="list-item">
              Last updated: 04.01.2018
            </ListGroupItemText>
          </div>
          <CVToolbar
            goEdit={() => this.props.goEdit()}
            renameConfirmed={newCVName => this.props.renameConfirmed(cvName, newCVName)}
            copyClicked={() => this.props.copyClicked(cvName)}
            deleteConfirmed={() => this.props.deleteConfirmed(cvName)}
            cvCount={this.props.cvCount}
            index={index}
          />
        </ListGroupItem>
      )
    })
    return (
      <div className="centered-list">
        <ListGroup>
          {listGroupItems}
        </ListGroup>
      </div>
    )
  }
}

export default CVList
