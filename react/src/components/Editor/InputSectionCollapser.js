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
    const newSections = JSON.parse(JSON.stringify(this.props.sections)) // deep copy
    console.log(newSections[this.props.index][`${this.props.language}_text`])
    newSections[this.props.index][`${this.props.language}_text`] = newText
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
            {(this.props.language === 'eng') ? (
              this.props.section.eng_title || 'INTRODUCTION'
            ) : (
              this.props.section.fin_title || 'ESITTELY'
            )}
          </Button>
          <Collapse isOpen={this.state.collapse}>
            <div>
              <br />
              <Input
                type="textarea"
                rows="15"
                cols="73"
                id="textfield"
                value={this.props.language === 'eng' ? this.props.section.eng_text : this.props.section.fin_text}
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
    language: state.language,
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
