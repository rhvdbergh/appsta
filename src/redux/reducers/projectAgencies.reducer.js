const projectAgenciesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_PROJECT_AGENCIES':
      return action.payload;
    case 'REFRESH_DATA':
      return [];
    case 'LOGOUT':
      return [];
    default:
      return state;
  }
};

export default projectAgenciesReducer;
