import React from "react";
import Navbar from '../Navbar/Navbar';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';

function BuyerOptionsPage() {
    const selectedCategory = useSelector((store) => store.selectedCategory);

    return (
        <Box sx={{ display: 'flex' }}>
            <Navbar />
            <Box>
                <h1> Buyer Options Page </h1>
                <p> Selected Category ID is: {selectedCategory}</p>
            </Box>
        </Box>
    )
}




export default BuyerOptionsPage;