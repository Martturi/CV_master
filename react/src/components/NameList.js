import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { loadUserList } from './Api'

class NameList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userList: [],
      selectedIndex: 0,
    }
  }

  componentDidMount() {
    this.updateUserList()
    this.render()
  }

  updateUserList() {
    loadUserList()
      .then((users) => {
        this.setState({ userList: users })
      })
      .catch(err => console.log(err))
  }

  render() {
    const listGroupItems = this.state.userList.map((username, index) => {
      const isActive = this.state.selectedIndex === index
      return <ListGroupItem active={isActive} tag="a" href="#" action>{username}</ListGroupItem>
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
