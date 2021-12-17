import { Box } from '@mui/material';

INSERT INTO "agencies" (user_id, agency_name, agency_blurb, postal_code, city, team_size, minority_owned, woman_owned, veteran_owned, staffing_location, contact_first_name, contact_last_name, phone_number, logo_url)
VALUES (2, 'Awesome Agency', 'Awesome Agency does awesome things!', '02860', 'Providence', 59, true, false, false, 'Onshore Talent Only', 'Ridwan', 'Ali', '123-456-7890', 'https://images.unsplash.com/photo-1622630732278-ca6d08c52b6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1447&q=80'),
(3, 'Jazzy Agency', 'We like jazzing things up', '70118', 'New Orleans', 14, false, false, true, 'Talent Offshore, Leadership Onshore', 'Alicia', 'Harvey', '987-654-3210', 'https://images.unsplash.com/photo-1523875194681-bedd468c58bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80');


// dummy data for display
// will actually come from server via redux
const agencies = [];

function BuyerCompareQuotes() {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <p>This is the Buyer Compare Quotes page</p>
      </Box>
    </>
  );
}

export default BuyerCompareQuotes;
