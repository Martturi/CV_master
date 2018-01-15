import React from 'react'
import { ListGroup, ListGroupItem, ListGroupItemText, ListGroupItemHeading } from 'reactstrap'
import MyCVsButtonGroup from './MyCVsButtonGroup'

class MyCVsList extends React.Component {
  render() {
    return (
      <div className="centered-list">
        <ListGroup>
          <ListGroupItem>
            <ListGroupItemText className="list-item">
              CV1 <br />
              Last updated: 04.01.2018</ListGroupItemText>
            <MyCVsButtonGroup />
          </ListGroupItem>
          <ListGroupItem>
            <ListGroupItemHeading className="list-heading">CV2</ListGroupItemHeading>
            <ListGroupItemText className="list-item">Last updated: 05.01.2018</ListGroupItemText>
            <MyCVsButtonGroup />
          </ListGroupItem>
          <ListGroupItem>
            <ListGroupItemHeading className="list-heading">CV3</ListGroupItemHeading>
            <ListGroupItemText className="list-item">Last updated: 06.01.2018</ListGroupItemText>
            <MyCVsButtonGroup />
          </ListGroupItem>
        </ListGroup>
      </div>
    )
  }
}

export default MyCVsList

