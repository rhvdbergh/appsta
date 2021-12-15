import React from "react";
import OptionsCard from "../OptionsCard/OptionsCard";

function OptionsList({features}) {

    return (
        <>
            <h1> OptionsList </h1>
            {features.length > 0 && features.map(feature => { 
                return <OptionsCard  key={feature.id}  feature={feature} />
             })}


        </>)
}

export default OptionsList;