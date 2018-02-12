
export const saveCV = async (username, cvName, text) => {
  const response = await
    fetch(`api/users/${username}/cvs/${cvName}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    })
  if (response.status !== 200) throw Error(`error ${response}`)
  return 'Save succeeded.'
}

export const loadCV = async (username, cvName) => {
  const response = await fetch(`api/users/${username}/cvs/${cvName}`, { credentials: 'include' })
  const body = await response.text()
  console.log(`loaded: ${body.substring(0, 50)}`)
  if (response.status !== 200) throw Error(body.message)
  return body
}

export const loadPreview = async (text, username) => {
  const response = await fetch('actions/preview', {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text, username }),
  })
  const body = await response.text()
  console.log(`preview: ${body.substring(0, 50)}`)
  if (response.status !== 200) throw Error(body.message)
  return body
}

export const loadUserList = async () => {
  const response = await fetch('api/users', { credentials: 'include' })
  const users = await response.json()
  if (response.status !== 200) throw Error(users.message)
  return users
}

export const loadCVList = async (username) => {
  const response = await fetch(`api/users/${username}/cvs`, { credentials: 'include' })
  const cvs = await response.json()
  if (response.status !== 200) throw Error(cvs.message)
  return cvs
}

export const copyCV = async (username, cvName) => {
  const response = await fetch(`api/users/${username}/cvs/${cvName}/copy`, {
    method: 'POST',
    credentials: 'include',
  })
  const nameOfCopiedCV = await response.text()
  if (response.status !== 200) throw Error(`error ${response}`)
  return nameOfCopiedCV
}

export const deleteCV = async (username, cvName) => {
  const response = await fetch(`api/users/${username}/cvs/${cvName}`, {
    method: 'DELETE',
    credentials: 'include',
  })
  const body = await response.text() // 'Delete accepted' or 'Delete denied'
  if (response.status !== 200) throw Error(`error ${response}`)
  return body
}

export const renameCV = async (username, cvName, newCVName) => {
  const response = await fetch(`api/users/${username}/cvs/${cvName}/`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ newCVName }),
  })
  const body = await response.text()
  if (response.status !== 200) throw Error(body.message)
  return body
}

export const fetchPDF = async (username, cvName) => {
  const response = await fetch(`api/users/${username}/cvs/${cvName}/pdf`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/pdf',
    },
  })
  if (response.status !== 200) throw Error(`error ${response}`)
  return response
}
