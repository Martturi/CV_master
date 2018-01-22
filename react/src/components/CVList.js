import React from 'react'
import { ListGroup, ListGroupItem, ListGroupItemText, ListGroupItemHeading } from 'reactstrap'
import CVToolbar from './CVToolbar'

class CVList extends React.Component {
  render() {
    const listGroupItems = this.props.cvList.map((cvName, index) => {
      const isActive = this.props.selectedCVIndex === index
      return (
        <ListGroupItem active={isActive} tag="a" href="#" action onClick={() => this.props.cvClicked(index)}>
          <div className="cvinfo">
            <ListGroupItemHeading>{cvName}</ListGroupItemHeading>
            <ListGroupItemText className="list-item">
              Last updated: 04.01.2018
            </ListGroupItemText>
          </div>
          <CVToolbar />
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
