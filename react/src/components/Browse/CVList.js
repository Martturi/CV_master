import React from 'react'
import { ListGroup, ListGroupItem, ListGroupItemText, ListGroupItemHeading } from 'reactstrap'
import CVToolbar from './CVToolbar'
import CvNameForm from './CvNameForm'

class CVList extends React.Component {
  render() {
    const listGroupItems = this.props.cvList.map((cvObject, index) => {
      const cvName = cvObject.cv_name
      const cvID = cvObject.cv_id
      const isActive = this.props.selectedCVIndex === index
      return (
        <ListGroupItem key={cvID} active={isActive} tag="a" href="#" action onClick={() => this.props.cvClicked(index)}>
          <div className="cvinfo">
            <ListGroupItemHeading>
              <CvNameForm
                cvName={cvName}
                index={index}
                renameConfirmed={newCVName => this.props.renameConfirmed(cvID, newCVName)}
              />
            </ListGroupItemHeading>
            <ListGroupItemText className="list-item">
              {`Last updated: ${new Date(cvObject.last_updated).toLocaleString()}`}
            </ListGroupItemText>
          </div>
          <CVToolbar
            goEdit={() => this.props.goEdit(cvID)}
            renameConfirmed={newCVName => this.props.renameConfirmed(cvID, newCVName)}
            copyClicked={() => this.props.copyClicked(cvID)}
            deleteConfirmed={() => this.props.deleteConfirmed(cvID)}
            cvCount={this.props.cvCount}
            index={index}
          />
        </ListGroupItem>
      )
    })
    return (
      <div className="centered-list">
        <ListGroup>
          {listGroupItems}
        </ListGroup>
      </div>
    )
  }
}

export default CVList
