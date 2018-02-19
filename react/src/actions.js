export const changeView = (view) => {
  return {
  	type: 'CHANGE_VIEW',
  	view,
  }
}

export const updateUserList = (userList, loggedInUserIndex) => {
  return {
  	type: 'UPDATE_USERLIST',
  	userList,
  	loggedInUserIndex,
  }
}

export const updateCVList = (cvList) => {
  return {
  	type: 'UPDATE_CVLIST',
  	cvList,
  }
}

export const updateSections = (sections) => {
  return {
  	type: 'UPDATE_SECTIONS',
  	sections,
  }
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

export const selectMyCVs = (cvIndex) => {
  return {
  	type: 'SELECT_MY_CVS',
  }
}
