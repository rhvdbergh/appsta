const agencyQuoteDataReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_AGENCY_QUOTE_DATA':
      return [...state, action.payload];
    case 'LOGOUT':
      return [];
    default:
      return state;
  }
};

export default agencyQuoteDataReducer;