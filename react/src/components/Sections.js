import React from 'react'
import { Container } from 'reactstrap'
import ListGroupCollapse from './ListGroupCollapse'

class Sections extends React.Component {
  render() {
    return (
      <Container>
        {/* <Input placeholder="Name" />
        <br />
        <Input placeholder="Degree" />
        <br />
        <Input placeholder="Job title" />
        <br /> */}
        {this.props.sectionTitles.map((title, index) =>
          (<ListGroupCollapse
            key={title}
            title={title}
            text={this.props.sectionContents[index]}
            updateText={text => this.props.updateText(text, index)}
          />),
        )}
      </Container>
    )
  }
}
export default Sections
