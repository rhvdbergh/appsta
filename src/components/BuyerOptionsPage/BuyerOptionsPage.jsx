import React from "react";
import Navbar from '../Navbar/Navbar';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';

function BuyerOptionsPage() {
    const selectedCategory = useSelector((store) => store.selectedCategory);
    const submitQuote = () => {
      console.log('Quote Submitted');
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <Navbar pageType = {'buyer'} fxn = {submitQuote} />
            <Box>
                <h1> Buyer Options Page </h1>
                <p> Selected Category ID is: {selectedCategory}</p>
            </Box>
        </Box>
    )
}




export default BuyerOptionsPage;