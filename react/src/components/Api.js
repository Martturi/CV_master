
export const saveCV = async (uid, text) => {
  const response = await
    fetch(`api/users/${uid}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    })
  if (response.status !== 200) throw Error(`error ${response}`)
  return 'Save succeeded.'
}

export const loadCV = async (uid) => {
  const response = await fetch(`api/users/${uid}`)
  const body = await response.text()
  console.log(body)
  if (response.status !== 200) throw Error(body.message)
  return body
}

export const fetchPDF = async (uid) => {
  fetch(`api/users/${uid}/pdf`)
    .then(res => res.blob())
    .then((blob) => {
      const file = new File([blob], `${uid}.pdf`, { type: 'application/pdf' })
      const a = document.createElement('a')
      a.href = URL.createObjectURL(file)
      a.download = `${uid}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    })
    .catch(err => console.log(err))
}

export const loadUserList = async () => {
  const response = await fetch('api/users')
  const usernames = await response.json()
  if (response.status !== 200) throw Error(usernames.message)
  return usernames
}
