// define an empty object with the correct keys to populate
// for a new agency user to register

const emptyNewBuyer = {
    username: null,
    password: null,
    company_name: null,
    project_name: null,
    first_name: null,
    last_name: null,
    city: null,
    country_code: null,
    postal_code: null,
  };
  
  const newBuyerReducer = (state = emptyNewBuyer, action) => {
    switch (action.type) {
      case 'SET_NEW_BUYER':
        return action.payload;
      case 'LOGOUT':
        return emptyNewBuyer;
      default:
        return state;
    }
  };
  
  export default newBuyerReducer;
  