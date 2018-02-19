const initialState = {
    selectedUser: '',
    selectedCV: '',
}

const CVreducer = (state = initialState, action) => {
    switch (action.type) {

        case 'SELECT_USER':
            return {
                ...state,
                selectedUser: action.username

            }

        case 'SELECT_CV':
            return {
                ...state,
                selectedCV: action.CV
            }

        default:
            return state
    }
}

export default CVreducer
