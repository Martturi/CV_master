import React from 'react'
import { Button, ListGroupItem } from 'reactstrap'

const CVComponent = (props) => {
  return (
    <div>
      <ListGroupItem tag="a" href="#" action>{props.name}</ListGroupItem>
      <Button>
        Rename
      </Button>{' '}
      <Button>
        <span className="fa fa-pencil" aria-hidden="true" />
      </Button>{' '}
      <Button>
        <span className="fa fa-files-o" aria-hidden="true" />
      </Button>{' '}
      <Button color="danger">
        <span className="fa fa-trash-o" aria-hidden="true" />
      </Button>
    </div>
  )
}


export default CVComponent
