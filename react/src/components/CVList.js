import React from 'react'
import { ListGroup, ListGroupItem, ListGroupItemText, ListGroupItemHeading } from 'reactstrap'
import CVToolbar from './CVToolbar'
import { loadCVList } from './Api'

class CVList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cvList: [],
      selectedIndex: 0,
    }
  }

  componentDidMount() {
    this.updateCVList()
    this.render()
  }

  updateCVList() {
    const testUsername = 'Heikki Heikalainen'
    loadCVList(testUsername)
      .then((cvs) => {
        this.setState({ cvList: cvs })
      })
      .catch(err => console.log(err))
  }

  render() {
    const listGroupItems = this.state.cvList.map((cvName, index) => {
      const isActive = this.state.selectedIndex === index
      return (
        <ListGroupItem active={isActive}>
          <div className="cvinfo">
            <ListGroupItemHeading>{cvName}</ListGroupItemHeading>
            <ListGroupItemText className="list-item">
              Last updated: 04.01.2018
            </ListGroupItemText>
          </div>
          <CVToolbar />
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
