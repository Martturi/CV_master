import React from 'react'
import { Container, Input } from 'reactstrap'
import ListGroupCollapse from './ListGroupCollapse'


const fields = {
  bio: {
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
  },
}

class TextFields extends React.Component {
  render() {
    return (
      <Container>
        <Input placeholder="Name" />
        <br />
        <Input placeholder="Degree" />
        <br />
        <Input placeholder="Job title" />
        <br />
        {Object.keys(fields).map(i =>
          <ListGroupCollapse field={fields[i]} />,
        )}
      </Container>
    )
  }
}
export default TextFields
