import React from 'react'
import { ListGroup } from 'reactstrap'
import CVComponent from './CVComponent'

const CVList = () => {
  return (
    <div>
      <ListGroup>
        <CVComponent
          name={'CV 1'}
        />
        <CVComponent
          name={'CV 2'}
        />
      </ListGroup>
    </div>
  )
}

export default CVList
