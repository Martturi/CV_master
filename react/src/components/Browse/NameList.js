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
      const fullName = object.full_name
      const isActive = this.props.uid === username
      if (this.props.view === 'myCVs' && index !== this.props.loggedInUserIndex) return undefined
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
            this.props.userClickedCascade(this.props.userList, username)
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
    selectedUserIndex: state.selectedUserIndex,
    view: state.view,
    loggedInUserIndex: state.loggedInUserIndex,
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
