import { useHistory } from 'react-router-dom';
import { Box, Button, Typography, CardMedia } from '@mui/material';

// import custom components
import LoginForm from '../LoginForm/LoginForm';

// this is the main page for people landing on the site
// it's at path /
function LandingPage() {
  // set up the history hook to navigate
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
        {/* Component to log in buyers (and also admin, agency will work) */}
        <LoginForm />
        {/* Button below starts the buyer's selection process */}
        <Typography variant="h5" sx={{ m: 2 }}>
          New to Appsta?
          <Button
            sx={{ color: 'primary.navbar' }}
            onClick={() => {
              history.push('/BuyerOptions');
            }}
          >
            <Typography variant="h6">GET STARTED</Typography>
          </Button>
        </Typography>
        <br />
        <Button
          color="secondary"
          variant="contained"
          onClick={() => {
            history.push('/AgencyLogin');
          }}
        >
          <Typography variant="h6">Agency Login</Typography>
        </Button>
      </center>
    </Box>
  );
}

export default LandingPage;
