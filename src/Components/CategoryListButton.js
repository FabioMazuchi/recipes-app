import React from 'react';
import PropTypes from 'prop-types';

const CategoryListButton = ({ onClick, strCategory }) => (
  <button
    type="button"
    onClick={ onClick }
    id={ strCategory }
    data-testid={ `${strCategory}-category-filter` }
  >
    {strCategory}
  </button>
);

CategoryListButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  strCategory: PropTypes.string.isRequired,
};

export default CategoryListButton;
