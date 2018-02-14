import React from 'react'
import { Container } from 'reactstrap'
import InputSectionCollapser from './InputSectionCollapser'

class InputSections extends React.Component {
  render() {
    return (
      <Container>
        {/* <Input placeholder="Name" />
        <br />
        <Input placeholder="Degree" />
        <br />
        <Input placeholder="Job title" />
        <br /> */}
        {this.props.sections.map((section, index) =>
          (<InputSectionCollapser
            key={section.section_id}
            index={index}
            section={section}
            text={this.props.text}
            updateSection={text => this.props.updateSection(index, text)}
          />),
        )}
      </Container>
    )
  }
}
export default InputSections
