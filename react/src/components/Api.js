
export const saveCV = async (username, cvName, sectionContents) => {
  const response = await
    fetch(`api/users/${username}/cvs/${cvName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sectionContents }),
    })
  if (response.status !== 200) throw Error(`error ${response}`)
  return 'Save succeeded.'
}

export const loadCV = async (username, cvName) => {
  const response = await fetch(`api/users/${username}/cvs/${cvName}`)
  const body = await response.json()
  if (response.status !== 200) throw Error(body.message)
  return body
}

export const loadPreview = async (sectionTitles, sectionContents, username) => {
  const response = await fetch('actions/preview', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sectionTitles, sectionContents, username }),
  })
  const body = await response.text()
  if (response.status !== 200) throw Error(body.message)
  return body
}

export const loadUserList = async () => {
  const response = await fetch('api/users')
  const users = await response.json()
  if (response.status !== 200) throw Error(users.message)
  return users
}

export const loadCVList = async (username) => {
  const response = await fetch(`api/users/${username}/cvs`)
  const cvs = await response.json()
  if (response.status !== 200) throw Error(cvs.message)
  return cvs
}

export const copyCV = async (username, cvName) => {
  const response = await fetch(`api/users/${username}/cvs/${cvName}/copy`, {
    method: 'POST',
  })
  const nameOfCopiedCV = await response.text()
  if (response.status !== 200) throw Error(`error ${response}`)
  return nameOfCopiedCV
}

export const deleteCV = async (username, cvName) => {
  const response = await fetch(`api/users/${username}/cvs/${cvName}`, {
    method: 'DELETE',
  })
  const body = await response.text() // 'Delete accepted' or 'Delete denied'
  if (response.status !== 200) throw Error(`error ${response}`)
  return body
}

export const renameCV = async (username, cvName, newCVName) => {
  const response = await fetch(`api/users/${username}/cvs/${cvName}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ newCVName }),
  })
  const body = await response.text()
  if (response.status !== 200) throw Error(body.message)
  return body
}

export const fetchPDF = async (username, cvName, sectionTitles) => {
  const response = await fetch(`api/users/${username}/cvs/${cvName}/pdf`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sectionTitles }),
  })
  if (response.status !== 200) throw Error(`error ${response}`)
  return response
}
