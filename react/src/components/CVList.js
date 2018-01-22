import React from 'react'
import { ListGroup, ListGroupItem, ListGroupItemText, ListGroupItemHeading } from 'reactstrap'
import CVToolbar from './CVToolbar'

class CVList extends React.Component {
  constructor(props) {
    super(props)
    const testCVs = ['CV 1', 'CV 2', 'CV 3', 'CV 4', 'CV 5', 'CV 6']
    this.state = {
      cvList: testCVs,
      selectedIndex: 0
    }
  }

  deleteClicked(index) {
    const cvs = this.state.cvList
    cvs.splice(index, 1)
    this.setState({ cvList: cvs })
  }

  render() {
    const listGroupItems = this.state.cvList.map((cvName, index) => {
      const isActive = this.state.selectedIndex === index
      return (
        <ListGroupItem active={isActive} >
          <div className="cvinfo">
            <ListGroupItemHeading>{cvName}</ListGroupItemHeading>
            <ListGroupItemText className="list-item">
              Last updated: 04.01.2018
            </ListGroupItemText>
          </div>
          <CVToolbar deleteClicked={() => this.deleteClicked(index)} />
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
