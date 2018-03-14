import Api from './Api'

async function downloadPDF(userObject, cvID, sections) {
  const res = await Api.fetchPDF(userObject, sections)
  const blob = await res.blob()
  const username = userObject.username
  const file = new File([blob], `${username}_${cvID}.pdf`, { type: 'application/pdf' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(file)
  a.download = `${username}_${cvID}.pdf`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

// eslint-disable-next-line import/prefer-default-export
export { downloadPDF }
