import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { saveProgress } from '../Helpers';

function Checkbox({ i, ingredient, measure }) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <label
      htmlFor={ i }
      data-testid="ingredient-step"
      style={ isChecked ? { textDecoration: 'none solid rgb(0, 0, 0)' }
        : { backgroundColor: 'red' } }

    >
      <input
        type="checkbox"
        id={ i }
        name={ i }
        onChange={ () => {
          setIsChecked(!isChecked);
        } }
        checked={ isChecked }
      />
      {`${ingredient} - ${measure}`}
    </label>
  );
}

Checkbox.propTypes = {
  i: PropTypes.string.isRequired,
  // id: PropTypes.string.isRequired,
  ingredient: PropTypes.string.isRequired,
  measure: PropTypes.string.isRequired,
  // onChange: PropTypes.func.isRequired,
};

export default Checkbox;
