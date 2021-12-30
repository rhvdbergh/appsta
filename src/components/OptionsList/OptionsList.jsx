import React from 'react';
import OptionsCard from '../OptionsCard/OptionsCard';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';

function OptionsList({ features, listType }) {
  // get the selected category from the redux store
  const selectedCategory = useSelector((store) => store.selectedCategory);

  return (
    <>
      <Typography variant="h6"> 
        OptionsList 
      </Typography>
      {features.length > 0 &&
        features
          // only display the features of the currently selected category, so filter
          .filter((feature) => feature.category_id === selectedCategory)
          .map((feature) => {
            return <OptionsCard key={feature.id} feature={feature} listType={listType} />;
          })}
    </>
  );
}

export default OptionsList;
