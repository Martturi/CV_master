import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'

class NameList extends React.Component {
  render() {
    const fullNames = this.props.userList.map(user => user.full_name)
    const listGroupItems = fullNames.map((fullName, index) => {
      const isActive = this.props.selectedUserIndex === index
      return <ListGroupItem key={this.props.userList[index].username} active={isActive} tag="a" href="#" action onClick={() => this.props.userClicked(index)}>{fullName}</ListGroupItem>
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
