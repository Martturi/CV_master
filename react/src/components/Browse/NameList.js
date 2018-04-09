import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { connect } from 'react-redux'
import {
  userClickedCascade,
} from '../../actions'

const NameListItem = ({ object, uid, searchFieldContents, userItems, userClicked }) => {
  const username = object.username
  const fullName = object.full_name
  const isActive = uid === username
  const searchingFor = searchFieldContents
  const searchAsRegExp = new RegExp(searchingFor, 'gi')
  const searchMatchesFromIndex = fullName.search(searchAsRegExp)
  if (searchMatchesFromIndex === -1) return undefined
  return (
    <div ref={(ref) => { userItems.set(username, ref) }}>
      <ListGroupItem
        tag="a"
        href="#"
        action
        active={isActive}
        onClick={() => {
          userClicked(username)
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
    </div>
  )
}

class NameList extends React.Component {
  componentDidMount = () => {
    const activeUserItem = this.userItems.get(this.props.uid)
    console.log(this.userItems)
    console.log(this.userItems.size)
    console.log(activeUserItem)
    if (activeUserItem !== undefined) {
      activeUserItem.scrollIntoView()
    }
  }
  userItems = new Map()
  render() {
    return (
      <div>
        <ListGroup>
          {this.props.userList.map(object =>
            (<NameListItem
              key={object.username}
              object={object}
              uid={this.props.uid}
              searchFieldContents={this.props.searchFieldContents}
              userItems={this.userItems}
              userClicked={this.props.userClickedCascade}
            />),
          )}
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
