import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'

const NameList = (props) => {
  const listGroupItems = props.userList.map((username, index) => {
    if (index === props.selectedUser) {
      return (
        <ListGroupItem active key={username} tag="a" href="#" action onClick={() => props.userClicked(index)}>{username}</ListGroupItem>
      )
    }
    return (
      <ListGroupItem key={username} tag="a" href="#" action onClick={() => props.userClicked(index)}>{username}</ListGroupItem>
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

export default NameList
