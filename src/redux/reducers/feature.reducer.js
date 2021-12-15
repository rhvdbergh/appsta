


const featureReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_FEATURES':
            return action.payload;
        case 'LOGOUT':
            return [];
        default:
            return state;
    }
}

export default featureReducer;