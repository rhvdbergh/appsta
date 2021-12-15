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
            <h1> Start Building your Project! </h1>
            <p> Select the features to include in your project.  Your estimate will be based on selected features. </p>
            < OptionsList features={features}/>
        </>)
}




export default BuyerOptionsPage;