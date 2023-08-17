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
  index,
}) => {
  const [optionSelected, setOptionSelected] = useState(title);
  const handleChange = (item) => {
    handleInputOnChange(item);
    if (item.label === optionSelected) {
      setOptionSelected("Please select a value");
    }
  };
  return (
    <>
      {isChip &&
        refinements[index]?.length > 0 &&
        refinements[index].map((name) => (
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
        className="form-auto-suggest"
        floatingLabel={label}
        aria-label="form autosuggest"
        errorMessageText="Error, no selected value"
        value={optionSelected}
        onSelected={(value) => {
          setOptionSelected(value);
        }}
      >
        {items.map((item) => (
          <FormAutosuggestOption
            className={
              refinements[index]?.includes(item.label) && "font-weight-bold"
            }
            onClick={() => handleChange(item)}
          >
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
  index: PropTypes.string,
};

export default FacetAutoSuggest;
