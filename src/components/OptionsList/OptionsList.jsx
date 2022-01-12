import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';

// import custom components
import OptionsCard from '../OptionsCard/OptionsCard';

// this component is the parent container of the list
// of features that can be selected or
// changed, depending on context
// the listType defines how the parent component
// wants the list to function
function OptionsList({ features, listType, quoteData }) {
  // get the selected category from the redux store
  const selectedCategory = useSelector((store) => store.selectedCategory);

  return (
    <>
      <Typography variant="h6"></Typography>
      {/* only display this if there are features to display */}
      {features.length > 0 &&
        features
          // only display the features of the currently selected category, so filter
          .filter((feature) => feature.category_id === selectedCategory)
          .map((feature) => {
            return (
              <OptionsCard
                key={feature.id}
                feature={feature}
                quoteData={quoteData}
                listType={listType}
              />
            );
          })}
      {/* provide feedback to the user if the category has no features selected */}
      {features.filter((feature) => feature.category_id === selectedCategory)
        .length === 0 && (
        <Typography variant="h6" sx={{ m: 4 }}>
          No features selected for this category.
        </Typography>
      )}
    </>
  );
}

export default OptionsList;
