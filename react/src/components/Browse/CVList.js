import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'

const CVList = () => {
  return (
    <div>
      <ListGroup>
        <ListGroupItem tag="a" href="#" action>CV 1</ListGroupItem>
        <ListGroupItem tag="a" href="#" action>CV 2</ListGroupItem>
        <ListGroupItem tag="a" href="#" action>CV 3</ListGroupItem>
      </ListGroup>
    </div>
  )
}

export default CVList
