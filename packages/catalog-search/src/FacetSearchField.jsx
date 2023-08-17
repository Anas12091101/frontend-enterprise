import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";
import { SearchField, Chip } from "@edx/paragon";
import { Close } from "@edx/paragon/icons";

const FacetSearchField = ({
  title,
  items,
  searchForItems,
  typeaheadOptions,
  refinements,
  index,
  handleInputOnChange,
  isChip,
}) => {
  const ref = useRef();
  const [inputValue, setInputValue] = useState(
    refinements[index]?.length > 0 ? refinements[index].at(-1) : ""
  );
  const [itemsFocus, setItemsFocus] = useState(false);

  // OnChange is triggering after render even without changing the value in search field.
  // Using useEffect to handle infinite rendering.
  useEffect(() => {
    handleSearch(inputValue);
  }, [inputValue]);

  const handleSearch = debounce((value) => {
    // when user is erasing the input and input is empty we need to reset the filtering
    if (value.length >= typeaheadOptions.minLength || value.length === 0) {
      searchForItems(value);
    }
  }, 200);

  const handleClickOutside = (e) => {
    if (!ref.current.contains(e.target)) {
      setItemsFocus(false);
    }
  };

  const handleClickInside = () => setItemsFocus(true);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <div ref={ref} onClick={handleClickInside}>
      {isChip &&
        refinements[index]?.length > 0 &&
        refinements[index].map((name) => (
          <Chip
            iconAfter={Close}
            onIconAfterClick={() =>
              handleInputOnChange({ label: name, value: [name] })
            }
          >
            {name}
          </Chip>
        ))}
      <SearchField
        key={index}
        placeholder={
          refinements[index]?.length > 0 ? refinements[index].at(-1) : title
        }
        value={inputValue}
        onChange={(value) => setInputValue(value)}
        onSubmit={() => {}}
      />
      {itemsFocus && <div className="facet-search-list">{items}</div>}
    </div>
  );
};

FacetSearchField.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  searchForItems: PropTypes.func.isRequired,
  typeaheadOptions: PropTypes.shape({
    placeholder: PropTypes.string.isRequired,
    ariaLabel: PropTypes.string.isRequired,
    minLength: PropTypes.number.isRequired,
  }).isRequired,
  refinements: PropTypes.shape({
    name: PropTypes.array,
    current_jobs: PropTypes.array,
    industry_names: PropTypes.array,
  }),
  index: PropTypes.string,
  handleInputOnChange: PropTypes.func.isRequired,
  isChip: PropTypes.bool,
};

export default FacetSearchField;
