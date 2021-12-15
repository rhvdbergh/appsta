const categoryReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return action.payload;
    case 'LOGOUT':
      return [];
    default:
      return state;
  }
}

export default categoryReducer;