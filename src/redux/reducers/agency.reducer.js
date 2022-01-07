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
  minority_owned: false,
  woman_owned: false,
  veteran_owned: false,
  lgbt_owned: false,
  staffing_location: null,
  contact_first_name: null,
  contact_last_name: null,
  phone_number: null,
  logo_url: null,
  xsmall_hours: null,
  small_hours: null,
  medium_hours: null,
  large_hours: null,
  xlarge_hours: null,
  hourly_rate: null,
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
