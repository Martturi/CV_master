import React from 'react'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'
import InputSectionCollapser from './InputSectionCollapser'
import { updateSections } from '../../actions'

class InputSections extends React.Component {
  updateSection(sectionIndex, text) {
    const newContents = this.props.sections.map(obj => Object.assign({}, obj)) // deep copy
    newContents[sectionIndex].text = text
    this.props.updateSections(newContents)
  }

  render() {
    return (
      <Container>
        {this.props.sections.map((section, index) =>
          (<InputSectionCollapser
            key={section.section_id}
            index={index}
            section={section}
            updateSection={text => this.updateSection(index, text)}
          />),
        )}
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    sections: state.sections,
  }
}

const mapDispatchToProps = {
  updateSections,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InputSections)
