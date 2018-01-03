import React from 'react'
import { markdown } from 'markdown'

const Preview = props =>
  <div dangerouslySetInnerHTML={{ __html: markdown.toHTML(props.text) }} />

export default Preview
