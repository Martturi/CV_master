const markdown = require('markdown').markdown
const pdf = require('html-pdf')

const servePDF = (text, response) => {
  const parsedHTML = markdown.toHTML(text)
  pdf.create(parsedHTML).toStream((err, stream) => {
    response.setHeader('Content-Type', 'application/pdf')
    response.setHeader('Content-Disposition', 'attachment; filename=cv.pdf')

    stream.on('end', () => response.end())
    stream.pipe(response)
  })
}
module.exports = servePDF
