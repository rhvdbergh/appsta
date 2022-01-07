const activeProjectReducer = (state = 0, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_PROJECT':
      return action.payload;
    case 'REFRESH_DATA':
      return 0;
    case 'LOGOUT':
      return 0;
    default:
      return state;
  }
};

export default activeProjectReducer;
