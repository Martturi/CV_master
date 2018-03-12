import React from 'react'
import { ListGroup, ListGroupItem, ListGroupItemText, ListGroupItemHeading } from 'reactstrap'
import { connect } from 'react-redux'
import CVToolbar from './CVToolbar'
import CvNameForm from './CvNameForm'
import {
  cvClickedCascade,
} from '../../actions'

const getListGroupItem = (props, cvObject, index) => {
  const cvName = cvObject.cv_name
  const cvID = cvObject.cv_id
  const isActive = props.cvid === cvID
  return (
    <ListGroupItem
      key={cvID}
      action
      active={isActive}
      onClick={() => {
        const username = props.userList.find(user =>
          user.username === props.selectedUserID).username
        props.cvClickedCascade(username, props.cvList, index)
      }}
    >
      <div className="cvinfo">
        <ListGroupItemHeading>
          <CvNameForm
            cvName={cvName}
            cvID={cvID}
            uid={props.selectedUserID}
          />
        </ListGroupItemHeading>
        <ListGroupItemText className="list-item">
          {new Date(cvObject.last_updated).toLocaleString()}
        </ListGroupItemText>
      </div>
      <CVToolbar
        cvID={cvID}
        uid={props.selectedUserID}
        index={index}
      />
    </ListGroupItem>
  )
}

const CVList = (props) => {
  const listGroupItems = props.cvList.map((cvObject, index) => (
    getListGroupItem(props, cvObject, index)
  ))
  return (
    <div className="centered-list">
      <ListGroup>
        {listGroupItems}
      </ListGroup>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    cvList: state.cvList,
    selectedCVIndex: state.selectedCVIndex,
    userList: state.userList,
    selectedUserID: ownProps.uid,
    cvid: ownProps.cvid,
  }
}


const mapDispatchToProps = {
  cvClickedCascade,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CVList)
