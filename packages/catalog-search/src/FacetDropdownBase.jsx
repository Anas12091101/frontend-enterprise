import FacetItem from "./FacetItem";
import TypeaheadFacetDropdown from "./TypeaheadFacetDropdown";
import FacetDropdown from "./FacetDropdown";
import { NO_OPTIONS_FOUND, STYLE_VARIANTS } from "./data/constants";
import { useCallback } from "react";
import PropTypes from "prop-types";

const FacetDropdownBase = ({
  title,
  items,
  doRefinement,
  refinements,
  customAttribute,
  attribute,
  showBadge,
  variant,
  handleInputOnChange,
  typeaheadOptions,
  searchForItems,
  isBold,
  isCheckedField,
}) => {
  const renderItems = useCallback(() => {
    if (!items?.length) {
      return <span className="p-2 d-block">{NO_OPTIONS_FOUND}</span>;
    }

    return items.map((item) => {
      let isChecked;
      if (doRefinement) {
        isChecked = isCheckedField ? item[isCheckedField] : !!item.value;
      } else {
        const index = customAttribute || attribute;
        isChecked = refinements[index]?.includes(item.label);
      }
      return (
        <FacetItem
          key={item.label}
          handleInputOnChange={handleInputOnChange}
          item={item}
          isChecked={isChecked}
          variant={variant}
          showBadge={showBadge}
        />
      );
    });
  }, [items]);

  if (typeaheadOptions) {
    return (
      <TypeaheadFacetDropdown
        items={renderItems()}
        title={title}
        isBold={isBold}
        options={typeaheadOptions}
        searchForItems={searchForItems}
        variant={variant}
      />
    );
  }

  return (
    <FacetDropdown
      items={renderItems()}
      title={title}
      isBold={isBold}
      variant={variant}
    />
  );
};

FacetDropdownBase.defaultProps = {
  isCheckedField: null,
  typeaheadOptions: null,
  customAttribute: null,
  searchForItems: null,
  variant: STYLE_VARIANTS.inverse,
  doRefinement: true,
  showBadge: true,
};

FacetDropdownBase.propTypes = {
  attribute: PropTypes.string.isRequired,
  isBold: PropTypes.bool.isRequired,
  isCheckedField: PropTypes.string,
  customAttribute: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  title: PropTypes.string.isRequired,
  typeaheadOptions: PropTypes.shape({
    placeholder: PropTypes.string.isRequired,
    ariaLabel: PropTypes.string.isRequired,
    minLength: PropTypes.number.isRequired,
  }),
  searchForItems: PropTypes.func,
  variant: PropTypes.oneOf([STYLE_VARIANTS.default, STYLE_VARIANTS.inverse]),
  doRefinement: PropTypes.bool,
  showBadge: PropTypes.bool,
  handleInputOnChange: PropTypes.func.isRequired,
};
export default FacetDropdownBase;
