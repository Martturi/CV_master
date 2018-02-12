import React from 'react'
import { Container } from 'reactstrap'
import InputSectionCollapser from './InputSectionCollapser'


const fields = {
  cv: {
    title: 'CV',
  },
  /* bio: {
    title: 'Bio',
  },
  workExperience: {
    title: 'Work Experience',
  },
  prevEmployment: {
    title: 'Previous Employment',
  },
  education: {
    title: 'Education',
  },
  certificates: {
    title: 'Certificates',
  },
  languageSkills: {
    title: 'Language Skills',
  },
  awards: {
    title: 'Awards',
  },
  publications: {
    title: 'Publications',
  },
  conferences: {
    title: 'Conferences',
  },
  other: {
    title: 'Other Activities',
  },
  essentialSkills: {
    title: 'Essential Skills',
  }, */
}

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
        {Object.keys(fields).map(i =>
          (<InputSectionCollapser
            index={i}
            key={i}
            field={fields[i]}
            text={this.props.text}
            updateText={text => this.props.updateText(text)}
          />),
        )}
      </Container>
    )
  }
}
export default InputSections
