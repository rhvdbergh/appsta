const quotingAgenciesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_QUOTING_AGENCIES':
      return action.payload;
    case 'REFRESH_QUOTING_AGENCIES_DATA':
      return [];
    case 'LOGOUT':
      return [];
    default:
      return state;
  }
};

export default quotingAgenciesReducer;
