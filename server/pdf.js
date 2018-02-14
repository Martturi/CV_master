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

// getHTML requires uid to find the correct picture from CDN. The uid is given to it via servePDF.
const getHTML = (text, uid) => {
  const style = fs.readFileSync(path.resolve(__dirname, 'pdf/pdf.css'), 'utf-8')
  const template = fs.readFileSync(path.resolve(__dirname, 'pdf/preview.ejs'), 'utf-8')
  const parsedHTML = markdown.toHTML(text)
  const fullName = db.loadFullName(uid)
  return fullName.then((name) => {
    return ejs.render(template, { styles: style, text: parsedHTML, userID: uid, name })
  })
}

const servePDF = (text, response, uid) => {
  console.log(`Creating pdf ${text.substring(0, 100)}`)
  const parsedHTML = getHTML(text, uid)
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
