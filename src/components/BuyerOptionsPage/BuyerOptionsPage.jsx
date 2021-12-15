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
            <Navbar btn1text = {'SUBMIT QUOTE'} fxn1 = {submitQuote} />
            <Box>
                <h1> Buyer Options Page </h1>
                <p> Selected Category ID is: {selectedCategory}</p>
            </Box>
        </Box>
    )
}




export default BuyerOptionsPage;