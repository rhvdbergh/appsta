const selectedFeaturesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SELECTED_FEATURES':
      return action.payload;
    case 'LOGOUT':
      return [];
    default:
      return state;
  }
};

export default selectedFeaturesReducer;
