import React from 'react'
import { ListGroupItem, Collapse, Button, Input } from 'reactstrap'
import { connect } from 'react-redux'
import {
  updateSections,
  updatePreview,
} from '../../actions'

class InputSectionCollapser extends React.Component {
  constructor(props) {
    super(props)
    this.state = { collapse: !props.index }
  }

  handleChange = (event) => {
    const newText = event.target.value
    const newSections = this.props.sections.map(obj => Object.assign({}, obj)) // deep copy
    newSections[this.props.index].text = newText
    this.props.updateSections(newSections)
    this.props.updatePreview(newSections, this.props.username)
  }

  toggle = () => {
    this.setState({ collapse: !this.state.collapse })
  }

  render() {
    return (
      <ListGroupItem>
        <div>
          <Button outline className="button" size="sm" onClick={this.toggle}> {this.props.section.eng_title || 'INTRODUCTION'} </Button>
          <Collapse isOpen={this.state.collapse}>
            <div>
              <br />
              <Input type="textarea" rows="15" cols="73" id="textfield" value={this.props.section.text} onChange={this.handleChange} />
            </div>
          </Collapse>
        </div>
      </ListGroupItem>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    sections: state.sections,
    username: state.userList[state.selectedUserIndex].username,
  }
}

const mapDispatchToProps = {
  updateSections,
  updatePreview,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InputSectionCollapser)
