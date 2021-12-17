import { TextField, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

function BuyerRegistrationForm2({ setCanMoveForward }) {
  const dispatch = useDispatch();

  const buyer = useSelector((store) => store.newBuyer);

  const [first_name, setFirst_name] = useState(null);
  const [last_name, setLast_name] = useState('');
  const [email_address , setEmail_address] = useState(null);
  const [phone_number, setPhone_number] = useState(null);
 

  // on page load, set the local state to what has already been
  // entered in the buyer object, if that was done previously
  useEffect(() => {
    setFirst_name(buyer.first_name);
    setLast_name(buyer.last_name);
    setEmail_address(buyer.email_address);
    setPhone_number(buyer.phone_number);
  }, []);

  // when any of the required fields change, check
  // to see if we can move forward
  useEffect(() => {
    isCompletedForm();
  }, [first_name, last_name, email_address, phone_number]);

  // validate that all required fields in the form are filled out
  const isCompletedForm = () => {
    // these three fields are required; only move forward if they
    // have some content
    if (
        first_name !== null &&
        last_name !== null &&
        email_address !== null &&
        phone_number !== null 
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
          label="First name*"
          value={first_name}
          variant="outlined"
          onChange={(event) => setFirst_name(event.target.value)}
          onBlur={() => {
            handleData('first_name', first_name);
          }}
        />
        <TextField
          label="Last name*"
          value={last_name}
          variant="outlined"
          onChange={(event) => setLast_name(event.target.value)}
          onBlur={() => {
            handleData('last_name', last_name);
          }}
        />
        <TextField
          label="Email*"
          variant="outlined"
          value={email_address}
          onChange={(event) => setEmail_address(event.target.value)}
          onBlur={() => {
            handleData('email_address', email_address);
          }}
        />
        <TextField
          label="Phone Number*"
          variant="outlined"
          value={phone_number}
          onChange={(event) => setPhone_number(event.target.value)}
          onBlur={() => {
            handleData('phone_number', phone_number);
          }}
        />
 
      </Stack>
    </>
  );
}

export default BuyerRegistrationForm2;
