import React from 'react'
import { ListGroup, ListGroupItem, ListGroupItemHeading } from 'reactstrap'
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
      tag="a"
      action
      active={isActive}
      onClick={() => {
        const username = props.userList.find(user =>
          user.username === props.selectedUserID).username
        props.cvClickedCascade(username, props.cvList, index)
      }}
    >
      <div className="cv-name">
        <ListGroupItemHeading>
          <CvNameForm
            cvName={cvName}
            cvID={cvID}
            languageName={cvObject.language_name}
          />
        </ListGroupItemHeading>
      </div>
      <div>
        <CVToolbar
          cvID={cvID}
          index={index}
        />
        <span className="language-flag badge badge-pill badge-info">
          {cvObject.language_name}
        </span>
        <span className="last-modified-datetime">
          {new Date(cvObject.last_updated).toLocaleString()}
        </span>
      </div>
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
  }
}


const mapDispatchToProps = {
  cvClickedCascade,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CVList)
