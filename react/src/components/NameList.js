import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'

class NameList extends React.Component {
  render() {
    const listGroupItems = this.props.userList.map((username, index) => {
      const isActive = this.props.selectedUserIndex === index
      return <ListGroupItem active={isActive} tag="a" href="#" action onClick={() => this.props.userClicked(index)}>{username}</ListGroupItem>
    })
    return (
      <div>
        <ListGroup>
          {listGroupItems}
        </ListGroup>
      </div>
    )
  }
}

export default NameList
