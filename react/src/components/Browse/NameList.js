import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { connect } from 'react-redux'
import {
  userClickedCascade,
} from '../../actions'

class NameList extends React.Component {
  render() {
    const listGroupItems = this.props.userList.map((object, index) => {
      const username = object.username
      const isActive = this.props.selectedUserIndex === index
      if (this.props.view === 'myCVs' && index !== this.props.loggedInUserIndex) return undefined
      return (
        <ListGroupItem
          tag="a"
          href="#"
          action
          key={username}
          active={isActive}
          onClick={() => {
            this.props.userClickedCascade(this.props.userList, index)
          }}
        >
          {object.full_name}
        </ListGroupItem>
      )
    }).filter(item => item !== undefined)
    return (
      <div>
        <ListGroup>
          {listGroupItems}
        </ListGroup>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userList: state.userList,
    selectedUserIndex: state.selectedUserIndex,
    view: state.view,
    loggedInUserIndex: state.loggedInUserIndex,
  }
}

const mapDispatchToProps = {
  userClickedCascade,
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NameList)
