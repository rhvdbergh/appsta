const featureReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_FEATURES':
      return action.payload;
    default:
      return state;
  }
};

export default featureReducer;
