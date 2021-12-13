import React from "react";
import { useSelector } from 'react-redux';

function AgencyDashboard() {
    const user = useSelector(store => store.user);

    return (
        <>
            <h1> AGENCY DASHBOARD  </h1>
            <p> Placeholder test, user is {user.username}  </p>
        </>)
}




export default AgencyDashboard;