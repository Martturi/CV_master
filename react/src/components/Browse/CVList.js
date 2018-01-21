import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'

const CVList = (props) => {
  const listGroupItems = props.cvList.map((cvName, index) => {
    if (index === props.selectedCV) {
      return (
        <ListGroupItem active key={cvName} tag="a" href="#" action onClick={() => props.cvClicked(index)}>{cvName}</ListGroupItem>
      )
    }
    return (
      <ListGroupItem key={cvName} tag="a" href="#" action onClick={() => props.cvClicked(index)}>{cvName}</ListGroupItem>
    )
  })
  return (
    <div>
      <ListGroup>
        {listGroupItems}
      </ListGroup>
    </div>
  )
}

export default CVList
