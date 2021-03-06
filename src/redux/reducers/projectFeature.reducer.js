const projectFeatureReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_PROJECT_FEATURES':
      return action.payload;
    case 'REFRESH_DATA':
      return [];
    case 'LOGOUT':
      return [];
    default:
      return state;
  }
};

export default projectFeatureReducer;
