import React from 'react'
import { ListGroup, ListGroupItem, ListGroupItemText } from 'reactstrap'
import MyCVsButtonGroup from './MyCVsButtonGroup'

class MyCVsList extends React.Component {
  render() {
    return (
      <div className="centered-list">
        <ListGroup>
          <ListGroupItem>
            <ListGroupItemText className="list-item">
              <h5>CV1</h5>
              Last updated: 04.01.2018</ListGroupItemText>
            <MyCVsButtonGroup />
          </ListGroupItem>
          <ListGroupItem>
            <ListGroupItemText className="list-item">
              <h5>CV2</h5>
              Last updated: 05.01.2018</ListGroupItemText>
            <MyCVsButtonGroup />
          </ListGroupItem>
          <ListGroupItem>
            <ListGroupItemText className="list-item">
              <h5>CV3</h5>
              Last updated: 06.01.2018</ListGroupItemText>
            <MyCVsButtonGroup />
          </ListGroupItem>
        </ListGroup>
      </div>
    )
  }
}

export default MyCVsList

