const initialState = {
  selectedUser: '',
  selectedCV: '',
  view: 'browse',
  lastView: 'browse',
}

const CVreducer = (state = initialState, action) => {
    switch (action.type) {

        case 'SELECT_USER':
            return {
                ...state,
                selectedUser: action.username,

            }

        case 'SELECT_CV':
            return {
                ...state,
                selectedCV: action.CV,
            }

        case 'CHANGE_VIEW':
          return {
            ...state,
            lastView: state.view,
            view: action.view,
          }

        default:
            return state
    }
}

export default CVreducer
