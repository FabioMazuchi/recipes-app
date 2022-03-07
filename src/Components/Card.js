import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function Card({ link,
  recipeTitle,
  strThumb,
  cardTestId,
  titleTestid,
  imgTestId,
}) {
  const history = useHistory();
  return (
    <div
      className="card"
      data-testid={ cardTestId }
    >
      <button
        type="button"
        onClick={ () => history.push(`${link}`) }
      >
        <h4 data-testid={ titleTestid }>{recipeTitle}</h4>
        <img src={ strThumb } alt={ recipeTitle } data-testid={ imgTestId } />
      </button>
    </div>
  );
}

Card.propTypes = {
  link: PropTypes.string.isRequired,
  recipeTitle: PropTypes.string.isRequired,
  strThumb: PropTypes.string.isRequired,
  cardTestId: PropTypes.string.isRequired,
  titleTestid: PropTypes.string.isRequired,
  imgTestId: PropTypes.string.isRequired,
};

export default Card;
