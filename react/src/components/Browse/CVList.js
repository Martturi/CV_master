import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'

class CVList extends React.Component {
  render() {
    return (
      <div>
        <ListGroup>
          <ListGroupItem tag="a" href="#" action>CV1</ListGroupItem>
          <ListGroupItem active tag="a" href="#" action>CV2</ListGroupItem>
          <ListGroupItem tag="a" href="#" action>CV3</ListGroupItem>
        </ListGroup>
      </div>
    )
  }
}

export default CVList

