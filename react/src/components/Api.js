export const saveCV = async (uid, text) => {
  const response = await
    fetch(`api/${uid}`, {
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
  const response = await fetch(`api/${uid}`)
  const body = await response.text()
  console.log(body)
  if (response.status !== 200) throw Error(body.message)
  return body
}

export const loadCVList = async (uid) => {
  const response = await fetch(`api/cvlist/${uid}`)
  const ids = await response.text()
  if (response.status !== 200) throw Error(ids.message)
  const idArray = ids.split(',')
  if (idArray[0] === '') {
    idArray.pop()
  }
  return idArray
}

export const copyCV = async (uid) => {
  const response = await fetch(`api/copy/${uid}`)
  if (response.status !== 200) throw Error(`error ${response}`)
  return 'Copy succeeded.'
}

export const deleteCV = async (uid) => {
  const response = await fetch(`api/delete/${uid}`)
  if (response.status !== 200) throw Error(response)
}
