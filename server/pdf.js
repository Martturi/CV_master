const markdown = require('markdown').markdown
const pdf = require('html-pdf')
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

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

const sectionsToText = (sectionTitles, sectionContents) => {
  let wholeText = ''
  sectionTitles.forEach((title, index) => {
    const text = sectionContents[index]
    const titleAsMarkdown = (sectionTitles[index] ? `#${title}\n` : '')
    wholeText += (text ? `${titleAsMarkdown}${text}\n` : '')
  })
  return wholeText
}

// getHTML requires uid to find the correct picture from CDN. The uid is given to it via servePDF.
const getHTML = ({ sectionTitles, sectionContents, username }) => {
  const text = sectionsToText(sectionTitles, sectionContents)
  const style = fs.readFileSync(path.resolve(__dirname, 'pdf/pdf.css'), 'utf-8')
  const template = fs.readFileSync(path.resolve(__dirname, 'pdf/preview.ejs'), 'utf-8')
  const parsedHTML = markdown.toHTML(text)
  return ejs.render(template, { styles: style, text: parsedHTML, userID: username })
}

const servePDF = (sectionContents, response, { username, sectionTitles }) => {
  const parsedHTML = getHTML({ sectionTitles, sectionContents, username })
  pdf.create(parsedHTML, options).toStream((err, stream) => {
    response.setHeader('Content-Type', 'application/pdf')
    response.setHeader('Content-Disposition', 'attachment; filename=cv.pdf')

    stream.on('end', () => response.end())
    stream.pipe(response)
  })
}

module.exports = { getHTML, servePDF }

/*
FIXME page breaks on PDF
 */
