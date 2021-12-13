import React from "react";
import { useSelector } from 'react-redux';

function BuyerDashboard() {
    const user = useSelector(store => store.user);

    return (
        <>
            <h1> BUYER DASHBOARD  </h1>
            <p> Placeholder test, user is {user.username}  </p>
        </>)
}




export default BuyerDashboard;