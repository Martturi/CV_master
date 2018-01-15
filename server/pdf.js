import { markdown } from 'markdown'

const pdf = require('html-pdf')
const options = { format: 'A4' }


const getPDF = (text) => {
  const parsedHTML = markdown.toHTML(text)
}
module.exports = getPDF
