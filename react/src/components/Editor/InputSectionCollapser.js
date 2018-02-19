import React from 'react'
import { ListGroupItem, Collapse, Button, Input } from 'reactstrap'

class InputSectionCollapser extends React.Component {
  constructor(props) {
    super(props)
    this.state = { collapse: !props.index }
  }

  handleChange(event) {
    this.props.updateSection(event.target.value)
  }

  toggle = () => {
    this.setState({ collapse: !this.state.collapse })
  }

  render() {
    return (
      <ListGroupItem>
        <div>
          <Button outline className="button" size="sm" onClick={this.toggle}> {this.props.section.eng_title || 'No Title'} </Button>
          <Collapse isOpen={this.state.collapse}>
            <div>
              <br />
              <Input type="textarea" rows="15" cols="73" id="textfield" value={this.props.section.text} onChange={e => this.handleChange(e)} />
            </div>
          </Collapse>
        </div>
      </ListGroupItem>
    )
  }
}

export default InputSectionCollapser
