import React from 'react'
import { ListGroup, ListGroupItem, ListGroupItemText, ListGroupItemHeading } from 'reactstrap'
import CVToolbar from './CVToolbar'

class CVList extends React.Component {
  render() {
    return (
      <div className="centered-list">
        <ListGroup>
          <ListGroupItem active>
            <div className="cvinfo">
              <ListGroupItemHeading>CV1</ListGroupItemHeading>
              <ListGroupItemText className="list-item">
                Last updated: 04.01.2018
              </ListGroupItemText>
            </div>
            <CVToolbar />
          </ListGroupItem>
          <ListGroupItem>
            <div className="cvinfo">
              <ListGroupItemHeading>CV2</ListGroupItemHeading>
              <ListGroupItemText className="list-item">
                Last updated: 05.01.2018
              </ListGroupItemText>
            </div>
            <CVToolbar />
          </ListGroupItem>
          <ListGroupItem>
            <div className="cvinfo">
              <ListGroupItemHeading>CV3</ListGroupItemHeading>
              <ListGroupItemText className="list-item">
                Last updated: 06.01.2018
              </ListGroupItemText>
            </div>
            <CVToolbar />
          </ListGroupItem>
          <ListGroupItem>
            <div className="cvinfo">
              <ListGroupItemHeading>CV4</ListGroupItemHeading>
              <ListGroupItemText className="list-item">
                Last updated: 06.01.2018
              </ListGroupItemText>
            </div>
            <CVToolbar />
          </ListGroupItem>
          <ListGroupItem>
            <div className="cvinfo">
              <ListGroupItemHeading>CV5</ListGroupItemHeading>
              <ListGroupItemText className="list-item">
                Last updated: 06.01.2018
              </ListGroupItemText>
            </div>
            <CVToolbar />
          </ListGroupItem>
          <ListGroupItem>
            <div className="cvinfo">
              <ListGroupItemHeading>CV6</ListGroupItemHeading>
              <ListGroupItemText className="list-item">
                Last updated: 06.01.2018
              </ListGroupItemText>
            </div>
            <CVToolbar />
          </ListGroupItem>
        </ListGroup>
      </div>
    )
  }
}

export default CVList
