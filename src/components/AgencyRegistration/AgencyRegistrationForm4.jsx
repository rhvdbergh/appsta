import { TextField } from '@mui/material';
import Stack from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

function AgencyRegistrationForm4({ setCanMoveForward }) {
  const dispatch = useDispatch();

  const agency = useSelector((store) => store.newAgency);

  // define the state variables the component will be altering
  const [team_size, setTeam_size] = useState(null);
  const [minority_owned, setMinority_owned] = useState(null);
  const [woman_owned, setWoman_owned] = useState(null);
  const [veteran_owned, setVeteran_owned] = useState(null);
  const [lgbt_owned, setLgbt_owned] = useState(null);

  // on page load, set local state to what has already been entered
  // in the agency object, if anything
  useEffect(() => {
    setTeam_size(agency.team_size);
    setMinority_owned(agency.minority_owned);
    setWoman_owned(agency.woman_owned);
    setVeteran_owned(agency.veteran_owned);
    setLgbt_owned(agency.lgbt_owned);
  }, []);

  // when any required fields change, check to see if we can move forward
  useEffect(() => {
    isCompletedForm();
  }, [team_size, minority_owned, woman_owned, veteran_owned, lgbt_owned]);

  // validate that required fields in the form are filled out
  const isCompletedForm = () => {
    if (
      team_size !== null
      // minority_owned !== null &&
      // woman_owned !== null &&
      // veteran_owned !== null
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
        type: 'SET_NEW_AGENCY',
        payload: { ...agency, [data]: value },
      });
    }
  };

  return (
    <>
      <Stack>
        <TextField
          label="Team Size (0-9999)*"
          variant="outlined"
          value={team_size}
          onChange={(event) => setTeam_size(event.target.value)}
          onBlur={() => {
            handleData('team_size', team_size);
          }}
        />

        <FormControl component="fieldset">
          <FormGroup row aria-label="minority-owned">
            <FormControlLabel
              control={<Checkbox />}
              label="Minority Owned"
              onChange={(event) => setMinority_owned(event.target.checked)}
              onBlur={() => {
                handleData('minority_owned', minority_owned);
              }}
            />
          </FormGroup>

          <FormGroup row aria-label="women-owned">
            <FormControlLabel
              control={<Checkbox />}
              label="Women Owned"
              onChange={(event) => setWoman_owned(event.target.checked)}
              onBlur={() => {
                handleData('woman_owned', woman_owned);
              }}
            />
          </FormGroup>

          <FormGroup row aria-label="veteran-owned">
            <FormControlLabel
              control={<Checkbox />}
              label="Veteran Owned"
              onChange={(event) => setVeteran_owned(event.target.checked)}
              onBlur={() => {
                handleData('veteran_owned', veteran_owned);
              }}
            />
          </FormGroup>

          <FormGroup row aria-label="lgbt-owned">
            <FormControlLabel
              control={<Checkbox />}
              label="LGBT Owned"
              onChange={(event) => setLgbt_owned(event.target.checked)}
              onBlur={() => {
                handleData('lgbt_owned', lgbt_owned);
              }}
            />
          </FormGroup>
        </FormControl>
      </Stack>
    </>
  );
}

export default AgencyRegistrationForm4;
