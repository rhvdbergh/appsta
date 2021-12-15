import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import OptionsList from "../OptionsList/OptionsList";



function BuyerOptionsPage() {

    const dispatch = useDispatch();
    const features = useSelector(store => store.features);

    useEffect(() => { 
        dispatch({type: "GET_FEATURES"})
    },[]);

    return (
        <>
            <h1> Buyer Options Page </h1>
            <p> Will add more over time. Placeholder for now  </p>
            < OptionsList features={features}/>
        </>)
}




export default BuyerOptionsPage;