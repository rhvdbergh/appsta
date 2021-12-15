import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OptionsList from "../OptionsList/OptionsList";
import Navbar from '../Navbar/Navbar';
import Box from '@mui/material/Box';

function BuyerOptionsPage() {
    const selectedCategory = useSelector((store) => store.selectedCategory);
    const submitQuote = () => {
        console.log('Quote Submitted');
    }

    const dispatch = useDispatch();
    const features = useSelector(store => store.features);

    useEffect(() => {
        dispatch({ type: "GET_FEATURES" })
    }, []);

    return (

        <>
            

            <Box sx={{ display: 'flex' }}>
                <Navbar btn1text={'SUBMIT QUOTE'} fxn1={submitQuote} />
                <Box>
                  <h1> Start Building your Project! </h1>
                  <p> Select the features to include in your project.  Your estimate will be based on selected features. </p>
                  < OptionsList features={features} />
                    <p> Selected Category ID is: {selectedCategory}</p>
                </Box>
            </Box>
        </>)
}


export default BuyerOptionsPage;