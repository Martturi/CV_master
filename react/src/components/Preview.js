import React from 'react'
import { markdown } from 'markdown'
/* eslint react/no-danger: 0 */
const Preview = props =>
  <div dangerouslySetInnerHTML={{ __html: markdown.toHTML(props.text) }} />

export default Preview
