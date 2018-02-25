import { fetchPDF } from './components/Api'

async function downloadPDF(username, cvID, sections) {
  const res = await fetchPDF(username, sections)
  const blob = await res.blob()
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
