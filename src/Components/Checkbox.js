import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Checkbox({ i, ingredient, measure, handleChange, ingredientValidate }) {
  const [isChecked, setIsChecked] = useState(ingredientValidate.includes(ingredient));

  return (
    <label
      htmlFor={ i }
      data-testid={ `${i}-ingredient-step` }
      style={ isChecked ? { textDecoration: 'none solid rgb(0, 0, 0)' }
        : { backgroundColor: 'red' } }
    >
      <input
        type="checkbox"
        id={ i }
        name={ i }
        onChange={ () => {
          setIsChecked(!isChecked);
          handleChange(!isChecked, ingredient);
        } }
        checked={ isChecked }
      />
      {`${ingredient} - ${measure}`}
    </label>
  );
}

Checkbox.propTypes = {
  i: PropTypes.string.isRequired,
  ingredient: PropTypes.string.isRequired,
  measure: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  ingredientValidate: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Checkbox;
