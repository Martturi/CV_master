import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { connect } from 'react-redux'
import {
  userClickedCascade,
} from '../../actions'

class NameList extends React.Component {
  render() {
    const listGroupItems = this.props.userList.map((object) => {
      const username = object.username
      const fullName = object.full_name
      const isActive = this.props.uid === username
      const searchingFor = this.props.searchFieldContents
      const searchAsRegExp = new RegExp(searchingFor, 'gi')
      const searchMatchesFromIndex = fullName.search(searchAsRegExp)
      if (searchMatchesFromIndex === -1) return undefined
      return (
        <ListGroupItem
          tag="a"
          href="#"
          action
          key={username}
          active={isActive}
          onClick={() => {
            this.props.userClickedCascade(username)
          }}
        >
          {fullName.substr(0, searchMatchesFromIndex)}
          <b>
            <font color="FC6054">
              {fullName.substr(searchMatchesFromIndex, searchingFor.length)}
            </font>
          </b>
          {fullName.substr(searchMatchesFromIndex + searchingFor.length)}
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
    loggedInUser: state.loggedInUser,
    searchFieldContents: state.searchFieldContents,
  }
}

const mapDispatchToProps = {
  userClickedCascade,
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NameList)
