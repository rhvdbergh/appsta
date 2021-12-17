const agencyFeatureReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_AGENCY_FEATURES':
      return action.payload;
    case 'LOGOUT':
      return [];
    default:
      return state;
  }
};

export default agencyFeatureReducer;
