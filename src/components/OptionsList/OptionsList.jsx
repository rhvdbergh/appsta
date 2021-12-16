import React from 'react';
import OptionsCard from '../OptionsCard/OptionsCard';
import { useSelector } from 'react-redux';

function OptionsList({ features, listType }) {
  // get the selected category from the redux store
  const selectedCategory = useSelector((store) => store.selectedCategory);

  return (
    <>
      <h1> OptionsList </h1>
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
