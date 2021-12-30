const quotingAgenciesDetailsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_QUOTING_AGENCIES_DETAILS':
      return action.payload;
    case 'LOGOUT':
      return [];
    default:
      return state;
  }
};

export default quotingAgenciesDetailsReducer;
