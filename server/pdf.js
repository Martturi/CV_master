const markdown = require('markdown').markdown
const pdf = require('html-pdf')
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

const header = fs.readFileSync(path.resolve(__dirname, './pdf/header.html'), 'utf-8')
const footer = fs.readFileSync(path.resolve(__dirname, './pdf/footer.html'), 'utf-8')
const config = require('./config')

const sectionToText = (section) => {
  if (!section.text) {
    return ''
  }
  const title = section.title
  // markdown: one \n = one space
  // markdown: two \n's in a row = one line break
  // markdown: three, four, five... \n's in a row = still only one line break
  // --> we have to replace 3rd, 4th, 5th... consecutive \n with <br>
  const rows = section.text.split('\n')
  // holds that: '1\n1\n\n1\n\n\n1'.split('\n') === ['1', '1', '', '1'. ''. ''. '1'].
  // so we need to find two or more consecutive empty strings:
  for (let i = rows.length - 1; i > 0; i -= 1) {
    // trimming so that spaces don't matter:
    if (rows[i].trim() === '' && rows[i - 1].trim() === '') {
      rows[i] = '<br>'
    }
  }
  // joining the modified array:
  const text = rows.join('\n')
  const titleAsMarkdown = (title ? `###${title}\n` : '')
  return `${titleAsMarkdown}${text}`
}

// getHTML requires uid to find the correct picture from CDN. The uid is given to it via servePDF.
const getHTML = ({ sections, userObject }) => {
  const style = fs.readFileSync(path.resolve(__dirname, 'pdf/pdf.css'), 'utf-8')
  const template = fs.readFileSync(path.resolve(__dirname, 'pdf/preview.ejs'), 'utf-8')
  // by default, '<br>' is escaped with '&lt;br&gt;' to prevent line break
  // let's undo it for better user control:
  const sectionsInMarkdown = sections
    .map(section => markdown.toHTML(sectionToText(section)))
    .map(html => html.replace(/&lt;br&gt;/g, '<br>'))
  const html = ejs.render(template, {
    styles: style,
    sectionsInMarkdown,
    userID: userObject.username,
    name: userObject.full_name,
  })
  return html
}

const servePDF = (response, { sections, userObject }) => {
  const options = {
    base: `${config.clientURL}`,
    header: {
      height: '20mm',
      contents: header,
    },
    footer: {
      height: '12mm',
      contents: footer,
    },
  }

  const parsedHTML = getHTML({ sections, userObject })
  pdf.create(parsedHTML, options).toStream((err, stream) => {
    response.setHeader('Content-Type', 'application/pdf')
    response.setHeader('Content-Disposition', 'attachment; filename=cv.pdf')
    stream.on('end', () => response.end())
    stream.pipe(response)
  })
}

module.exports = { getHTML, servePDF }
