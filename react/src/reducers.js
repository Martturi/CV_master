const initialState = {
  userList: [],
  selectedUserID: '',
  cvList: [],
  loggedInUser: '',
  sections: [],
  searchFieldContents: '',
  previewHTML: '',
}

const CVreducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_USER_LIST':
      return {
        ...state,
        userList: action.userList,
        selectedUserID: action.selectedUserID,
      }

    case 'GET_CURRENT_USER':
      return {
        ...state,
        loggedInUser: action.loggedInUser,
      }

    case 'UPDATE_CV_LIST':
      return {
        ...state,
        cvList: action.cvList,
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

    case 'SELECT_USER':
      return {
        ...state,
        selectedUser: action.userID,
      }

    case 'UPDATE_SEARCH_FIELD_CONTENTS':
      return {
        ...state,
        searchFieldContents: action.searchFieldContents,
      }

    default:
      return state
  }
}

export default CVreducer
