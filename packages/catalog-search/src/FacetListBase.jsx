/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useCallback } from "react";
import PropTypes from "prop-types";

import { SearchContext } from "./SearchContext";
import {
  addToRefinementArray,
  setRefinementAction,
  deleteRefinementAction,
  removeFromRefinementArray,
} from "./data/actions";
import FacetAutoSuggest from "./FacetAutoSuggest";
import FacetDropdownBase from "./FacetDropdownBase";

const FacetListBase = ({
  attribute,
  facetValueType,
  noDisplay,
  customAttribute,
  isStyleAutoSuggest,
  ...props
}) => {
  const { refinements, dispatch } = useContext(SearchContext);
  /**
   * Handles when a facet option is toggled by either adding it to the refinements
   * reducer for the facet attribute, or removes the facet attribute if there is no
   * longer any selected options for that particular facet attribute.
   */
  const handleInputOnChange = (item) => {
    // if it is desired to load the same attribute data in multiple dropdowns then
    // customAttribute can be passed to differentiate them.
    const index = customAttribute || attribute;
    if (item.value && facetValueType === "array") {
      if (item.value.length > 0) {
        if (refinements[index]?.includes(item.label)) {
          dispatch(removeFromRefinementArray(index, item.label));
        } else {
          dispatch(addToRefinementArray(index, item.label));
        }
      } else {
        dispatch(deleteRefinementAction(index));
      }
    } else if (facetValueType === "bool") {
      // eslint-disable-next-line no-bitwise
      dispatch(setRefinementAction(index, refinements[index] ^ 1));
    } else if (facetValueType === "single-item") {
      if (refinements[index]?.includes(item.label)) {
        dispatch(deleteRefinementAction(index, item.label));
      } else {
        dispatch(setRefinementAction(index, [item.label]));
      }
    }
  };

  if (isStyleAutoSuggest) {
    return (
      <FacetAutoSuggest
        handleInputOnChange={handleInputOnChange}
        refinements={refinements}
        index={customAttribute || attribute}
        {...props}
      />
    );
  }

  return (
    <FacetDropdownBase
      attribute={attribute}
      customAttribute={customAttribute}
      handleInputOnChange={handleInputOnChange}
      refinements={refinements}
      {...props}
    />
  );
};

FacetListBase.defaultProps = {
  customAttribute: null,
};

FacetListBase.propTypes = {
  attribute: PropTypes.string.isRequired,
  facetValueType: PropTypes.oneOf(["array", "bool", "single-item"]).isRequired,
  customAttribute: PropTypes.string,
  noDisplay: PropTypes.bool,
  isStyleAutoSuggest: PropTypes.bool,
};

export default FacetListBase;
