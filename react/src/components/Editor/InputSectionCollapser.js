import React from 'react'
import { ListGroupItem, Collapse, Button } from 'reactstrap'
import { connect } from 'react-redux'
import Textarea from 'react-textarea-autosize'
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
    const newSections = JSON.parse(JSON.stringify(this.props.sections)) // deep copy
    newSections[this.props.index].text = newText
    this.props.updateSections(newSections)
    this.props.updatePreview(newSections, this.props.userObject)
  }

  toggle = () => {
    this.setState({ collapse: !this.state.collapse })
  }

  render() {
    return (
      <ListGroupItem>
        <div>
          <Button outline className="button" size="sm" onClick={this.toggle}>
            {this.props.section.title}
          </Button>
          <Collapse isOpen={this.state.collapse}>
            <div>
              <br />
              <Textarea
                id="textfield"
                value={this.props.section.text}
                onChange={this.handleChange}
              />
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
    userObject: state.userList[state.selectedUserIndex],
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
