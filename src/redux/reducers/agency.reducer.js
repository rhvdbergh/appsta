// define an empty object with the correct keys to populate
// for a new agency user to register

const emptyNewAgency = {
  username: null,
  password: null,
  agency_name: null,
  agency_blurb: null,
  postal_code: null,
  city: null,
  state_province: null,
  country_code: null,
  team_size: null,
  minority_owned: null,
  woman_owned: null,
  veteran_owned: null,
  staffing_location: null,
  contact_first_name: null,
  contact_last_name: null,
  phone_number: null,
  logo_url: null,
};

const newAgencyReducer = (state = emptyNewAgency, action) => {
  switch (action.type) {
    case 'SET_NEW_AGENCY':
      return action.payload;
    case 'LOGOUT':
      return emptyNewAgency;
    default:
      return state;
  }
};

export default newAgencyReducer;
