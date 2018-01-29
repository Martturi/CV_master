
export const saveCV = async (username, cvName, text) => {
  console.log(username, cvName, text)
  const response = await
    fetch(`api/users/${username}/cvs/${cvName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    })
  console.log(response)
  if (response.status !== 200) throw Error(`error ${response}`)
  return 'Save succeeded.'
}

export const loadCV = async (username, cvName) => {
  const response = await fetch(`api/users/${username}/cvs/${cvName}`)
  const body = await response.text()
  console.log(body)
  if (response.status !== 200) throw Error(body.message)
  return body
}

export const loadUserList = async () => {
  const response = await fetch('api/users')
  const usernames = await response.json()
  if (response.status !== 200) throw Error(usernames.message)
  return usernames
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
