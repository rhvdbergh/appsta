import React from "react";
import OptionsList from "../OptionsList/OptionsList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function BuyerOptionsPage() {

    const dispatch = useDispatch();

    useEffect(() => { 
        dispatch({type: "GET_FEATURES"})
    },[]);

    return (
        <>
            <h1> Buyer Options Page </h1>
            <p> Will add more over time. Placeholder for now  </p>
            <OptionsList />
        </>)
}




export default BuyerOptionsPage;