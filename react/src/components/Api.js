
export const saveCV = async (uid, text) => {
  const response = await
    fetch(`api/cv/${uid}`, {
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
  const response = await fetch(`api/cv/${uid}`)
  const body = await response.text()
  console.log(body)
  if (response.status !== 200) throw Error(body.message)
  return body
}

export const loadUserList = async () => {
  const response = await fetch('api/userlist')
  const usernames = await response.json()
  if (response.status !== 200) throw Error(usernames.message)
  return usernames
}

export const loadCVList = async (username) => {
  const response = await fetch(`api/cvlist/${username}`)
  const cvs = await response.json()
  if (response.status !== 200) throw Error(cvs.message)
  return cvs
}

// loadCV will later be replaced with this function:
export const loadCVPreview = async (username, cvName) => {
  const response = await fetch(`api/cv/${username}/${cvName}`)
  const body = await response.text()
  console.log(body)
  if (response.status !== 200) throw Error(body.message)
  return body
}
