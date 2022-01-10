import { Box, Typography, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function AgencyRegistrationForm5({ setCanMoveForward }) {
  // set up the redux dispatch
  const dispatch = useDispatch();

  // fetch the new agency object being built in the redux store
  const agency = useSelector((store) => store.newAgency);

  // handle changes to the object
  const handleChange = (data, value) => {
    dispatch({
      type: "SET_NEW_AGENCY",
      payload: { ...agency, [data]: parseInt(value) },
    });
  };

  // test to see if form is completed every time agency changes
  useEffect(() => {
    isCompletedForm();
  }, [agency]);

  const isCompletedForm = () => {
    if (
      agency.xsmall_hours &&
      agency.small_hours &&
      agency.medium_hours &&
      agency.large_hours &&
      agency.xlarge_hours &&
      agency.hourly_rate
    ) {
      setCanMoveForward(true);
    } else {
      setCanMoveForward(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <Typography type="h6" sx={{ my: 2 }}>
        Appsta uses T-Shirt sizes as a project estimation system. For instance,
        a less complex task is rated as XS (extra small), and a complex task
        that will take a long time is rated as XL (extra large). Please choose
        the number of hours that your agency wants their T-Shirt sizes to
        represent. Also enter your hourly rate.
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TextField
          sx={{ width: "60%", maxWidth: "250px", m: 2 }}
          label="Hours for XS T-Shirt Size"
          variant="outlined"
          type="number"
          value={agency.xsmall_hours || ""}
          onChange={(event) => {
            handleChange("xsmall_hours", event.target.value);
          }}
        />
        <TextField
          sx={{ width: "60%", maxWidth: "250px", m: 2 }}
          label="Hours for S T-Shirt Size"
          variant="outlined"
          type="number"
          value={agency.small_hours || ""}
          onChange={(event) => {
            handleChange("small_hours", event.target.value);
          }}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TextField
          sx={{ width: "60%", maxWidth: "250px", m: 2 }}
          label="Hours for M T-Shirt Size"
          variant="outlined"
          type="number"
          value={agency.medium_hours || ""}
          onChange={(event) => {
            handleChange("medium_hours", event.target.value);
          }}
        />
        <TextField
          sx={{ width: "60%", maxWidth: "250px", m: 2 }}
          label="Hours for L T-Shirt Size"
          variant="outlined"
          type="number"
          value={agency.large_hours || ""}
          onChange={(event) => {
            handleChange("large_hours", event.target.value);
          }}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TextField
          sx={{ width: "60%", maxWidth: "250px", m: 2 }}
          label="Hours for XL T-Shirt Size"
          variant="outlined"
          type="number"
          value={agency.xlarge_hours || ""}
          onChange={(event) => {
            handleChange("xlarge_hours", event.target.value);
          }}
        />
        <TextField
          sx={{ width: "60%", maxWidth: "250px", m: 2 }}
          label="Hourly Rate (in USD)"
          variant="outlined"
          value={agency.hourly_rate || ""}
          onChange={(event) => {
            handleChange("hourly_rate", event.target.value);
          }}
        />
      </Box>
    </Box>
  );
}

export default AgencyRegistrationForm5;
