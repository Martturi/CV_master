import React, { Component } from 'react'
import { Button } from 'reactstrap'


class EditButtonGroup extends Component {

  render() {
    return (
      <div className="my-cvs-buttongroup">
        <Button outline className="button" id="rename">Rename</Button>
        <Button outline className="button">
          <span className="fa fa-pencil" aria-hidden="true" />
        </Button>
        <Button outline className="button">
          <span className="fa fa-files-o" aria-hidden="true" />
        </Button>
        <Button outline className="button">
          <span className="fa fa-trash-o" aria-hidden="true" />
        </Button>
      </div>


    )
  }
}


export default EditButtonGroup
