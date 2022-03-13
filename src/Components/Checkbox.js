import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ i, ingredient, measure, onChange }) => (
  <label
    htmlFor={ i }
    data-testid="ingredient-step"
  >
    <input
      type="checkbox"
      onChange={ onChange }
      id={ i }
    />
    {`${ingredient} - ${measure}`}
  </label>
);

Checkbox.propTypes = {
  i: PropTypes.string.isRequired,
  ingredient: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  measure: PropTypes.string.isRequired,
  // id: PropTypes.string.isRequired,
};

export default Checkbox;
