import React from 'react'
import { ListGroupItem, Collapse, Button, Input } from 'reactstrap'

class InputSectionCollapser extends React.Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    /* First sections selection is currently hardcoded, later select
     the first element of section-array. */
    this.state = { collapse: this.props.index === 'cv' }
  }

  handleChange(event) {
    this.props.updateText(event.target.value)
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse })
  }

  render() {
    const field = this.props.field
    return (
      <ListGroupItem>
        <div>
          <Button outline className="button" size="sm" onClick={this.toggle}> {field.title} </Button>
          <Collapse isOpen={this.state.collapse}>
            <div>
              <br />
              <Input type="textarea" rows="20" cols="73" id="textfield" value={this.props.text} onChange={e => this.handleChange(e)} />
            </div>
          </Collapse>
        </div>
      </ListGroupItem>
    )
  }
}

export default InputSectionCollapser
