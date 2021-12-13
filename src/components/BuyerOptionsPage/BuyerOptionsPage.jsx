import React from "react";
import { useSelector } from 'react-redux';

function BuyerOptionsPage() {
    // get the user's info from the store
    const user = useSelector((store) => store.user);
    return (
        <>
            <h1> Buyer Options Page </h1>
            <p> Will add more over time. Placeholder for now  </p>
        </>)
}




export default BuyerOptionsPage;