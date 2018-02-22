export const saveCV = async (cvID, username, sections) => {
  const response = await
    fetch(`api/cvs/${cvID}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, sections }),
    })
  if (response.status !== 200) throw Error(`error ${response}`)
  return 'Save succeeded.'
}

export const loadCV = async (cvID) => {
  const response = await fetch(`api/cvs/${cvID}`, { credentials: 'include' })
  const body = await response.json()
  if (response.status !== 200) throw Error(body.message)
  return body
}

export const loadPreview = async (sections, username) => {
  const response = await fetch('actions/preview', {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sections, username }),
  })
  const body = await response.text()
  if (response.status !== 200) throw Error(body.message)
  return body
}

export const loadUserList = async () => {
  const response1 = await fetch('api/loggedInUser', { credentials: 'include' })
  const loggedInUser = await response1.text()
  if (response1.status !== 200) throw Error(loggedInUser.message)
  const response2 = await fetch('api/users', { credentials: 'include' })
  const users = await response2.json()
  if (response2.status !== 200) throw Error(users.message)
  return { users, loggedInUser }
}

export const loadCVList = async (username) => {
  const response = await fetch(`api/users/${username}/cvs`, { credentials: 'include' })
  const cvs = await response.json()
  if (response.status !== 200) throw Error(cvs.message)
  return cvs
}

export const copyCV = async (cvID) => {
  const response = await fetch(`api/cvs/${cvID}/copy`, {
    method: 'POST',
    credentials: 'include',
  })
  const nameOfCopiedCV = await response.text()
  if (response.status !== 200) throw Error(`error ${response}`)
  return nameOfCopiedCV
}

export const deleteCV = async (cvID) => {
  const response = await fetch(`api/cvs/${cvID}`, {
    method: 'DELETE',
    credentials: 'include',
  })
  const body = await response.text() // 'Delete accepted' or 'Delete denied'
  if (response.status !== 200) throw Error(`error ${response}`)
  return body
}

export const renameCV = async (cvID, newCVName) => {
  const response = await fetch(`api/cvs/${cvID}`, {
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

export const fetchPDF = async (username, sections) => {
  const response = await fetch('api/pdf', {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sections, username }),
  })
  if (response.status !== 200) throw Error(`error ${response}`)
  return response
}
