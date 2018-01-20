
export const saveCV = async (username, cvName, text) => {
  const response = await
    fetch(`api/cv/${username}/${cvName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    })
  if (response.status !== 200) throw Error(`error ${response}`)
  return 'Save succeeded.'
}

export const loadCV = async (username, cvName) => {
  const response = await fetch(`api/cv/${username}/${cvName}`)
  const body = await response.text()
  console.log(body)
  if (response.status !== 200) throw Error(body.message)
  return body
}

export const loadUserList = async () => {
  const response = await fetch('api/userlist')
  const usernames = await response.text()
  if (response.status !== 200) throw Error(usernames.message)
  const usernameArray = usernames.split(';')
  if (usernameArray[0] === '') {
    usernameArray.pop()
  }
  return usernameArray
}

export const loadCVList = async (username) => {
  const response = await fetch(`api/cvlist/${username}`)
  const cvs = await response.text()
  if (response.status !== 200) throw Error(cvs.message)
  const cvArray = cvs.split(';')
  if (cvArray[0] === '') {
    cvArray.pop()
  }
  return cvArray
}
