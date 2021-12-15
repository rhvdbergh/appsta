const selectedCategoryReducer = (state = 1, action) => {
  switch (action.type) {
    case 'SET_SELECTED_CATEGORY':
      return action.payload;
    case 'LOGOUT':
      return 1;
    default:
      return state;
  }
}

export default selectedCategoryReducer;