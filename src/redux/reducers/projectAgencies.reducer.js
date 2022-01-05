const projectAgenciesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_PROJECT_AGENCIES':
      return action.payload;
    case 'LOGOUT':
      return [];
    default:
      return state;
  }
};

export default projectAgenciesReducer;
