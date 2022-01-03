const agencyQuoteDataReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_AGENCY_QUOTE_DATA':
      return action.payload;
    case 'LOGOUT':
      return [];
    default:
      return state;
  }
};

export default agencyQuoteDataReducer;