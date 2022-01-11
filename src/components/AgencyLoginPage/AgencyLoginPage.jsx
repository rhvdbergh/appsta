import { useHistory } from 'react-router-dom';
import { Box, Button, Typography, CardMedia } from '@mui/material';

// import custom components
import LoginForm from '../LoginForm/LoginForm';

// this component is the main view for agency's to log in
function AgencyLoginPage() {
  // set up the router history to navigate
  const history = useHistory();

  return (
    <Box className="container">
      <center>
        <CardMedia
          component="img"
          sx={{ width: '250px', mt: 3 }}
          image={require('../../media/Appsta_Logo_Black_Outline_Large.png')}
          alt="appsta logo"
          onClick={() => history.push('/')}
        />
        <LoginForm isAgency="true" />
        <Box>
          <Typography variant="h6"> First time agency?</Typography>
          {/* button will navigate to the agency registration page */}
          <Button
            sx={{ color: 'primary.navbar' }}
            onClick={() => {
              history.push('/AgencyReg');
            }}
          >
            <Typography variant="h6">REGISTER NOW</Typography>
          </Button>
        </Box>
        {/* button will navigate agency to LandingPage */}
        <Button
          color="secondary"
          variant="contained"
          sx={{ m: 3 }}
          onClick={() => {
            history.push('/LandingPage');
          }}
        >
          <Typography variant="h6">Not an Agency? Click Here</Typography>
        </Button>
      </center>
    </Box>
  );
}

export default AgencyLoginPage;
