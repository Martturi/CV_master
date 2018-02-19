const initialState = {
  view: 'browse',
  lastView: 'browse',
  userList: [],
  selectedUserIndex: 0,
  cvList: [],
  selectedCVIndex: 0,
  loggedInUserIndex: 0,
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
          const indexOutOfBounds = state.selectedCVIndex >= action.cvList.length
          const newSelectedCVIndex = (
            indexOutOfBounds ? (action.cvList.length - 1) : state.selectedCVIndex
          )
          return {
            ...state,
            selectedCVIndex: newSelectedCVIndex,
            cvList: action.cvList,
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

        case 'SELECT_MY_CVS':
          return {
            ...state,
            userList: [state.userList[state.loggedInUserIndex]],
            selectedUserIndex: 0,
            selectedCVIndex: 0,
          }

        default:
            return state
    }
}

export default CVreducer
