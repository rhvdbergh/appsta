import { TextField, Stack } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

function BuyerRegistrationForm3({ setCanMoveForward }) {
  const dispatch = useDispatch();

  const buyer = useSelector((store) => store.newBuyer);

  const [project_name, setProject_name] = useState(null);
  const [company_name, setCompany_name] = useState(null);
  const [city, setCity] = useState(null);
  const [postal_code, setPostal_code] = useState(null);

  // on page load, set the local state to what has been previously 
  // entered in the buyer object if the new agency user is returning
  useEffect(() => {
    setProject_name(buyer.project_name);
    setCompany_name(buyer.company_name);
    setCity(buyer.city);
    setPostal_code(buyer.postal_code);
  }, []);

  // when any required fields change, check to see if the user can proceed
  useEffect(() => {
    isCompletedForm();
  }, [city, postal_code, project_name, company_name]);

  // validate that required form fields are filled out
  const isCompletedForm = () => {
    // only move forward if the required fields of city and postal code have non-null, non-empty content
    if (
      city !== null &&
      postal_code !== null &&
      company_name !== null &&
      project_name !== null
    ) {
      setCanMoveForward(true);
    } else {
      setCanMoveForward(false);
    }
  };

  // add data to the redux store
  const handleData = (data, value) => {
    // check to see that the data field is not empty
    if (data !== '') {
      dispatch({
        type: 'SET_NEW_BUYER',
        payload: { ...buyer, [data]: value },
      });
    }
  };

  return (
    <>
      <Stack>

        <TextField
          label="Company Name*"
          value={company_name}
          variant="outlined"
          onChange={(event) => setCompany_name(event.target.value)}
          onBlur={() => {
            handleData('company_name', company_name);
          }} />
        <TextField
          label="Project Name*"
          value={project_name}
          variant="outlined"
          onChange={(event) => setProject_name(event.target.value)}
          onBlur={() => {
            handleData('project_name', project_name);
          }}
        />

        <TextField
          label="City*"
          value={city}
          variant="outlined"
          onChange={(event) => setCity(event.target.value)}
          onBlur={() => {
            handleData('city', city);
          }}
        />
        <TextField
          label="Zip Code*"
          value={postal_code}
          variant="outlined"
          onChange={(event) => setPostal_code(event.target.value)}
          onBlur={() => {
            handleData('postal_code', postal_code);
          }}
        />
      </Stack>

    </>
  )
}

export default BuyerRegistrationForm3;