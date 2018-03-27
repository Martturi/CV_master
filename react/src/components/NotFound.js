import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { connect } from 'react-redux'
import Header from './Header'
import { getCurrentUser, userClickedCascade, update404 } from '../actions'

class NotFound extends Component {
  goBack = async () => {
    this.props.update404(false)
    const loggedInUser = await this.props.getCurrentUser()
    if (this.props.userList.findIndex(u => u.username === this.props.uid) === -1) {
      await this.props.userClickedCascade(loggedInUser)
    } else {
      this.props.userClickedCascade(this.props.uid)
    }
  }

  render() {
    return (
      <div>
        <Header />
        <h1 className="display-3">404 Not Found</h1>
        <Button outline className="button" onClick={this.goBack}>Home</Button>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    uid: ownProps.uid,
    userList: state.userList,
  }
}

const mapDispatchToProps = {
  getCurrentUser,
  userClickedCascade,
  update404,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotFound)
