import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { saveFoodProgress, saveDrinkProgress } from '../Helpers';

function Checkbox({ i, ingredient, measure, handleChange, id, type }) {
  console.log(measure);
  const validateStorage = () => {
    let res = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (res === null || res[type][id] === undefined) {
      if (type === 'meals') {
        saveFoodProgress([], id);
      } else {
        saveDrinkProgress([], id);
      }
    }
    res = JSON.parse(localStorage.getItem('inProgressRecipes'));
    return res[type][id].includes(ingredient);
  };
  const [isChecked, setIsChecked] = useState(validateStorage());

  return (
    <label
      htmlFor={ i }
      data-testid={ `${i}-ingredient-step` }
      className={ isChecked ? 'concluidRecipe' : '' }
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
      { ingredient }
      <span
        className={ isChecked ? 'concluidRecipe' : '' }
      >
        { measure === undefined ? 'to taste' : measure }
      </span>
    </label>
  );
}

Checkbox.propTypes = {
  i: PropTypes.string.isRequired,
  ingredient: PropTypes.string.isRequired,
  measure: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Checkbox;
