import React from 'react'
import { ListGroupItem, Collapse, Button, Input } from 'reactstrap'

class ListGroupCollapse extends React.Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = { collapse: true }
  }

  handleChange(event) {
    this.props.updateText(event.target.value)
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse })
  }

  render() {
    return (
      <ListGroupItem>
        <div>
          <Button outline className="button" size="sm" onClick={this.toggle}> {this.props.title || 'No Title'} </Button>
          <Collapse isOpen={this.state.collapse}>
            <div>
              <br />
              <Input type="textarea" rows="5" cols="73" id="textfield" value={this.props.text} onChange={e => this.handleChange(e)} />
            </div>
          </Collapse>
        </div>
      </ListGroupItem>
    )
  }
}

export default ListGroupCollapse
