export const selectUser = (username) => {
  return {
    type: 'SELECT_USER',
    username,
  }
}

export const selectCV = (CV) => {
    return {
        type: 'SELECT_CV',
        CV,
    }
}

export const changeView = (view) => {
  return {
  	type: 'CHANGE_VIEW',
  	view,
  }
}
