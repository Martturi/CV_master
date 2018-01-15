import React from 'react'
import { ListGroupItem, Collapse, Button } from 'reactstrap'

class ListGroupCollapse extends React.Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = { collapse: false }
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse })
  }

  render() {
    const field = this.props.field
    return (
      <ListGroupItem>
        <div>
          <Button outline className={'buttonClass'} size="sm" onClick={this.toggle}> {field.title} </Button>
          <Collapse isOpen={this.state.collapse}>
            <div>
              <br />
              <textarea type="text" rows="5" cols="50" id="textfield" name="textfield" />
            </div>
          </Collapse>
        </div>
      </ListGroupItem>
    )
  }
}

export default ListGroupCollapse
