import React from 'react'
import { ListGroup, ListGroupItem, ListGroupItemText, ListGroupItemHeading } from 'reactstrap'
import MyCVsButtonGroup from './MyCVsButtonGroup'

class MyCVsList extends React.Component {
  render() {
    return (
      <div className="centered-list">
        <ListGroup>
          <ListGroupItem>
            <div className="cvinfo">
            <ListGroupItemHeading>CV1</ListGroupItemHeading>
            <ListGroupItemText className="list-item">
              Last updated: 04.01.2018
            </ListGroupItemText>
          </div>
            <MyCVsButtonGroup />
          </ListGroupItem>
          <ListGroupItem>
            <div className="cvinfo">
            <ListGroupItemHeading>CV2</ListGroupItemHeading>
              <ListGroupItemText className="list-item">
                Last updated: 05.01.2018
              </ListGroupItemText>
            </div>
            <MyCVsButtonGroup />
          </ListGroupItem>
          <ListGroupItem>
            <div className="cvinfo">
            <ListGroupItemHeading>CV3</ListGroupItemHeading>
              <ListGroupItemText className="list-item">
                Last updated: 06.01.2018
              </ListGroupItemText>
            </div>
            <MyCVsButtonGroup />
          </ListGroupItem>
        </ListGroup>
      </div>
    )
  }
}

export default MyCVsList
