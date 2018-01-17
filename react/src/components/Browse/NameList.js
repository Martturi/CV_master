import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'

class NameList extends React.Component {
  render() {
    return (
      <div>
        <ListGroup>
          <ListGroupItem tag="a" href="#" action>Maija Meikalainen</ListGroupItem>
          <ListGroupItem tag="a" href="#" action>Heikki Heikalainen</ListGroupItem>
          <ListGroupItem active tag="a" href="#" action>Mikko Mallikas</ListGroupItem>
        </ListGroup>
      </div>
    )
  }
}

export default NameList

