const markdown = require('markdown').markdown
const pdf = require('html-pdf')
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const db = require('./db')

const header = fs.readFileSync(path.resolve(__dirname, './pdf/header.html'), 'utf-8')
const footer = fs.readFileSync(path.resolve(__dirname, './pdf/footer.html'), 'utf-8')
const options = {
  base: `file://${__dirname}/../react/public/`,
  header: {
    height: '20mm',
    contents: header,
  },
  footer: {
    height: '12mm',
    contents: footer,
  },
}

const sectionsToText = (sections) => {
  let wholeText = ''
  sections.forEach((section) => {
    const title = section.eng_title
    const text = section.text
    const titleAsMarkdown = (title ? `#${title}\n` : '')
    wholeText += (text ? `${titleAsMarkdown}${text}\n` : '')
  })
  return wholeText
}

// getHTML requires uid to find the correct picture from CDN. The uid is given to it via servePDF.
const getHTML = ({ sections, username }) => {
  const text = sectionsToText(sections)
  const style = fs.readFileSync(path.resolve(__dirname, 'pdf/pdf.css'), 'utf-8')
  const template = fs.readFileSync(path.resolve(__dirname, 'pdf/preview.ejs'), 'utf-8')
  const parsedHTML = markdown.toHTML(text)
  const fullName = db.loadFullName(username)
  return fullName.then((name) => {
    return ejs.render(template, { styles: style, text: parsedHTML, userID: username, name })
  })
}

const servePDF = (response, { sections, username }) => {
  const parsedHTML = getHTML({ sections, username })
  parsedHTML.then((result) => {
    pdf.create(result, options).toStream((err, stream) => {
      response.setHeader('Content-Type', 'application/pdf')
      response.setHeader('Content-Disposition', 'attachment; filename=cv.pdf')
      stream.on('end', () => response.end())
      stream.pipe(response)
    })
  })
}

module.exports = { getHTML, servePDF }

/*
FIXME page breaks on PDF
 */
