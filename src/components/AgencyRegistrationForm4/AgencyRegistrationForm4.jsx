import { TextField } from "@mui/material";
import Stack from "@mui/material/Grid"
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

  // on page load, set local state to what has already been entered
  // in the agency object, if anything
  useEffect(() => {
    setTeam_size(agency.team_size);
    setMinority_owned(agency.minority_owned);
    setWoman_owned(agency.woman_owned);
    setVeteran_owned(agency.veteran_owned)
  }, []);

  // when any required fields change, check to see if we can move forward
  useEffect(() => {
    isCompletedForm();
  }, [team_size, minority_owned, woman_owned, veteran_owned]);

  // validate that required fields in the form are filled out
  const isCompletedForm = () => {

    
  }

    return (
        <>

            <Stack>
                <TextField id="outlined-basic" label="Team Size*" variant="outlined" />

                <FormControl component="fieldset">

                    <FormGroup row aria-label="minority-owned">
                        <FormControlLabel value=" " control={<Checkbox />} label="Minority Owned" />
                    </FormGroup>

                    <FormGroup row aria-label="women-owned">
                        <FormControlLabel value=" " control={<Checkbox />} label="Women Owned" />
                    </FormGroup>

                    <FormGroup row aria-label="veteran-owned">
                        <FormControlLabel value=" " control={<Checkbox />} label="Veteran Owned" />
                    </FormGroup>

                </FormControl>
            </Stack>
        </>

    )
}

export default AgencyRegistrationForm4;