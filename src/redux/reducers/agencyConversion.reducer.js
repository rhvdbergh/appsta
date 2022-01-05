// define an empty object for the conversion data we need to populate

const emptyConversionData = {
  id: null,
  agency_id: null,
  xsmall_hours: null,
  small_hours: null,
  medium_hours: null,
  large_hours: null,
  xlarge_hours: null,
  hourly_rate: null,
}

const agencyConversionReducer = (state = emptyConversionData, action) => {
  switch (action.type) {
    case 'SET_AGENCY_CONVERSION':
      return action.payload;
  }
}