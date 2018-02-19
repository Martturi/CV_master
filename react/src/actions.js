export const selectUser = username => {
    return {
        type: 'SELECT_USER',
        username
    }
}

export const selectCV = CV => {
    return {
        type: 'SELECT_CV',
        CV
    }
}
