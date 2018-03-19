import React from 'react'
import { ListGroupItem, Collapse, Button, Input, Label } from 'reactstrap'
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

  toggleCollapse = () => {
    this.setState({ collapse: !this.state.collapse })
  }

  toggleTemplate = () => {
    const newSections = JSON.parse(JSON.stringify(this.props.sections)) // deep copy
    newSections[this.props.index].showTemplate = !this.props.section.showTemplate
    this.props.updateSections(newSections)
    this.props.updatePreview(newSections, this.props.userObject)
  }

  render() {
    const TextField = () => {
      if (this.props.section.showTemplate) {
        return (<pre id="textfield">
          {this.props.section.template}
        </pre>)
      }
      return (
        <Textarea
          id="textfield"
          value={this.props.section.text}
          onChange={this.handleChange}
        />
      )
    }

    return (
      <ListGroupItem>
        <div>
          <Button outline className="button" size="sm" onClick={this.toggleCollapse}>
            {this.props.section.title}
          </Button>
          <Collapse isOpen={this.state.collapse}>
            <div className="template-toggle">
              <Label>
                <Input
                  type="checkbox"
                  key={this.props.key}
                  checked={this.props.section.showTemplate}
                  onChange={this.toggleTemplate}
                />
               Show template
              </Label>
            </div>
            <div>
              <br />
              <TextField />
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
