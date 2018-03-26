import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { connect } from 'react-redux'
import Header from './Header'
import { getCurrentUser, userClickedCascade } from '../actions'

class NotFound extends Component {
  goBack = async () => {
    const loggedInUser = await this.props.getCurrentUser()
    if (this.props.error === 'userNotFound') {
      await this.props.userClickedCascade(loggedInUser)
    } else if (this.props.error === 'cvNotFound') {
      this.props.userClickedCascade(this.props.uid)
    } else {
      this.props.userClickedCascade(this.props.uid, this.props.cvid)
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
    error: ownProps.match.params.error,
    cvid: Number(ownProps.match.params.cvid),
    uid: ownProps.match.params.uid,
  }
}

const mapDispatchToProps = {
  getCurrentUser,
  userClickedCascade,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotFound)

