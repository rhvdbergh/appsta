const agencyDashboardReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_INDIVIDUAL_AGENCY':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default agencyDashboardReducer;
  