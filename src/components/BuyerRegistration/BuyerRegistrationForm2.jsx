import { TextField, Grid, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

function BuyerRegistrationForm2({ setCanMoveForward }) {
  const dispatch = useDispatch();

  const buyer = useSelector((store) => store.newBuyer);

  const [first_name, setFirst_name] = useState(null);
  const [last_name, setLast_name] = useState("");

  // on page load, set the local state to what has already been
  // entered in the buyer object, if that was done previously
  useEffect(() => {
    setFirst_name(buyer.first_name);
    setLast_name(buyer.last_name);
  }, []);

  // when any of the required fields change, check
  // to see if we can move forward
  useEffect(() => {
    isCompletedForm();
  }, [first_name, last_name]);

  // validate that all required fields in the form are filled out
  const isCompletedForm = () => {
    // these three fields are required; only move forward if they
    // have some content
    if (first_name !== null && last_name !== null) {
      setCanMoveForward(true);
    } else {
      setCanMoveForward(false);
    }
  };

  // add data to the redux store
  const handleData = (data, value) => {
    // check to see that the data field is not empty
    if (data !== "") {
      dispatch({
        type: "SET_NEW_BUYER",
        payload: { ...buyer, [data]: value },
      });
    }
  };

  const handleDemo = () => {
    setFirst_name("Sam");
    setLast_name("Ruffle");
  }

  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
      }}
    >
      <p onClick={handleDemo}>*</p>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TextField
          sx={{ width: "60%", maxWidth: "350px", my: 1.5 }}
          label="First name*"
          value={first_name}
          variant="outlined"
          onChange={(event) => setFirst_name(event.target.value)}
          onBlur={() => {
            handleData("first_name", first_name);
          }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TextField
          sx={{ width: "60%", maxWidth: "350px", my: 1.5 }}
          label="Last name*"
          value={last_name}
          variant="outlined"
          onChange={(event) => setLast_name(event.target.value)}
          onBlur={() => {
            handleData("last_name", last_name);
          }}
        />
      </Box>
    </Grid>
  );
}

export default BuyerRegistrationForm2;
