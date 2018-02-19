const initialState = {
  view: 'browse',
  lastView: 'browse',
  userList: [],
  selectedUserIndex: 0,
  cvList: [],
  selectedCVIndex: 0,
  loggedInUserIndex: 0,
  sections: [],
}

const getCVIndex = (state, action) => {
  const indexOutOfBounds = state.selectedCVIndex >= action.cvList.length
  const newSelectedCVIndex = (
    indexOutOfBounds ? (action.cvList.length - 1) : state.selectedCVIndex
  )
  return newSelectedCVIndex
}

const CVreducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_VIEW':
      return {
        ...state,
        lastView: state.view,
        view: action.view,
      }

    case 'UPDATE_USERLIST':
      return {
        ...state,
        userList: action.userList,
        loggedInUserIndex: action.loggedInUserIndex,
      }

    case 'UPDATE_CVLIST':
      return {
        ...state,
        selectedCVIndex: getCVIndex(state, action),
        cvList: action.cvList,
      }

    case 'UPDATE_SECTIONS':
      return {
        ...state,
        sections: action.sections,
      }

    case 'SELECT_USER_INDEX':
      return {
        ...state,
        selectedUserIndex: action.userIndex,
      }

    case 'SELECT_CV_INDEX':
      return {
        ...state,
        selectedCVIndex: action.cvIndex,
      }

    default:
      return state
  }
}

export default CVreducer
