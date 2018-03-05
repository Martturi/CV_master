import Api from './Api'

export const changeView = (view) => {
  return {
    type: 'CHANGE_VIEW',
    view,
  }
}

export const updatePreview = (sections, username) => async (dispatch) => {
  const previewHTML = await Api.loadPreview(sections, username)
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
  dispatch({
    type: 'UPDATE_USER_LIST',
    userList: users,
    selectedUserID: loggedInUser,
    loggedInUser,
  })
  return { users, selectedUserID: loggedInUser }
}


export const selectUser = (userID) => {
  return {
    type: 'SELECT_USER',
    userID,
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

export const cvClickedCascade = (username, cvList, cvIndex) => async (dispatch) => {
  dispatch(selectCVIndex(cvIndex))
  const cvID = cvList[cvIndex].cv_id
  const sections = await loadSections(cvID)(dispatch)
  updatePreview(sections, username)(dispatch)
}

export const userClickedCascade = (userList, userID) => async (dispatch) => {
  dispatch(selectUser(userID))
  const username = userList.find(user => user.username === userID).username
  const cvList = await updateCVList(username)(dispatch)
  const defaultCVIndex = 0
  cvClickedCascade(username, cvList, defaultCVIndex)(dispatch)
}

export const userLoggedInCascade = () => async (dispatch) => {
  const { users, selectedUserID } = await updateUserList()(dispatch)
  userClickedCascade(users, selectedUserID)(dispatch)
}
