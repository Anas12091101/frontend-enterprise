import { Chip, FormAutosuggest, FormAutosuggestOption } from "@edx/paragon";
import { Close } from "@edx/paragon/icons";
import { useState } from "react";
import PropTypes from "prop-types";

const FacetAutoSuggest = ({
  title,
  label,
  items,
  handleInputOnChange,
  isChip,
  refinements,
}) => {
  const [selected, setSelected] = useState(title);
  const handleChange = (item) => {
    handleInputOnChange(item);
    if (item.label === selected) {
      setSelected("Please select a value");
    }
  };
  return (
    <>
      {isChip &&
        refinements.name?.length > 0 &&
        refinements.name.map((name) => (
          <Chip
            iconAfter={Close}
            onIconAfterClick={() =>
              handleChange({ label: name, value: [name] })
            }
          >
            {name}
          </Chip>
        ))}
      <FormAutosuggest
        floatingLabel={label}
        aria-label="form autosuggest"
        errorMessageText="Error, no selected value"
        value={selected}
        onSelected={(value) => {
          setSelected(value);
        }}
      >
        {items.map((item) => (
          <FormAutosuggestOption onClick={() => handleChange(item)}>
            {item.label}
          </FormAutosuggestOption>
        ))}
      </FormAutosuggest>
    </>
  );
};

FacetAutoSuggest.propTypes = {
  title: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  items: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  handleInputOnChange: PropTypes.func.isRequired,
  isChip: PropTypes.bool,
  refinements: PropTypes.shape({
    name: PropTypes.array,
    current_jobs: PropTypes.array,
    industry_names: PropTypes.array,
  }),
};

export default FacetAutoSuggest;
