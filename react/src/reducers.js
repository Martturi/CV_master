const initialState = {
  view: 'browse',
  lastView: 'browse',
  userList: [],
  selectedUserIndex: 0,
  cvList: [],
  selectedCVIndex: 0,
  loggedInUserIndex: 0,
  sections: [],
  previewHTML: '',
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

    case 'UPDATE_USER_LIST':
      return {
        ...state,
        userList: action.userList,
        loggedInUserIndex: action.loggedInUserIndex,
        selectedUserIndex: action.selectedUserIndex,
      }

    case 'UPDATE_CV_LIST':
      return {
        ...state,
        cvList: action.cvList,
        selectedCVIndex: getCVIndex(state, action),
      }

    case 'UPDATE_SECTIONS':
      return {
        ...state,
        sections: action.sections,
      }

    case 'UPDATE_PREVIEW':
      return {
        ...state,
        previewHTML: action.previewHTML,
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
