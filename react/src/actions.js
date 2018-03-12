import Api from './Api'

export const changeView = (view) => {
  return {
    type: 'CHANGE_VIEW',
    view,
  }
}

export const updatePreview = (sections, userObject) => async (dispatch) => {
  const previewHTML = await Api.loadPreview(sections, userObject)
  dispatch({
    type: 'UPDATE_PREVIEW',
    previewHTML,
  })
}

export const loadSections = cvID => async (dispatch) => {
  const sections = await Api.loadCV(cvID)
  dispatch({
    type: 'UPDATE_SECTIONS',
    sections,
  })
  return sections
}

export const updateSections = (sections) => {
  return {
    type: 'UPDATE_SECTIONS',
    sections,
  }
}

export const updateCVList = username => async (dispatch) => {
  const cvList = await Api.loadCVList(username)
  dispatch({
    type: 'UPDATE_CV_LIST',
    cvList,
  })
  return cvList
}

export const updateUserList = () => async (dispatch) => {
  const { users, loggedInUser } = await Api.loadUserList()
  const loggedInUserIndexIfExists = users.findIndex(object => object.username === loggedInUser)
  const loggedInUserIndex = loggedInUserIndexIfExists !== -1 ? loggedInUserIndexIfExists : 0
  const selectedUserIndex = loggedInUserIndex
  dispatch({
    type: 'UPDATE_USER_LIST',
    userList: users,
    selectedUserIndex,
    loggedInUserIndex,
  })
  return { users, selectedUserIndex }
}


export const selectUserIndex = (userIndex) => {
  return {
    type: 'SELECT_USER_INDEX',
    userIndex,
  }
}

export const selectCVIndex = (cvIndex) => {
  return {
    type: 'SELECT_CV_INDEX',
    cvIndex,
  }
}

export const updateSearchFieldContents = (newContents) => {
  return {
    type: 'UPDATE_SEARCH_FIELD_CONTENTS',
    searchFieldContents: newContents,
  }
}

export const updateLanguage = (newLanguage) => {
  return {
    type: 'UPDATE_LANGUAGE',
    language: newLanguage,
  }
}

export const cvClickedCascade = (userObject, cvList, cvIndex) => async (dispatch) => {
  dispatch(selectCVIndex(cvIndex))
  const cvID = cvList[cvIndex].cv_id
  const sections = await loadSections(cvID)(dispatch)
  updatePreview(sections, userObject)(dispatch)
}

export const userClickedCascade = (userList, userIndex) => async (dispatch) => {
  dispatch(selectUserIndex(userIndex))
  const userObject = userList[userIndex]
  const cvList = await updateCVList(userObject.username)(dispatch)
  const defaultCVIndex = 0
  cvClickedCascade(userObject, cvList, defaultCVIndex)(dispatch)
}

export const userLoggedInCascade = () => async (dispatch) => {
  const { users, selectedUserIndex } = await updateUserList()(dispatch)
  userClickedCascade(users, selectedUserIndex)(dispatch)
}
