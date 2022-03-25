import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipeCard({ index,
  alcoholicOrNot,
  category,
  doneDate,
  id,
  image,
  name,
  nationality,
  type,
  handleClick,
}) {
  const validate = (type === 'food');
  const foodOrDrink = (validate ? 'foods' : 'drinks');
  const [showLinkCopied, setShowLinkCopied] = useState(false);
  const history = useHistory();
  return (
    <div className="mainFoodEDrink">
      <div className="shareHeart">
        {showLinkCopied && <p>Link copied!</p>}
        <div>
          <label htmlFor={ index }>
            <input
              data-testid={ `${index}-horizontal-share-btn` }
              value={ `http://localhost:3000/${foodOrDrink}/${id}` }
              type="image"
              src={ shareIcon }
              id={ index }
              alt="share-icon"
              onClick={ ({ target }) => {
                setShowLinkCopied(true);
                navigator.clipboard.writeText(target.value);
              } }
            />
          </label>
          <label htmlFor="favorite-btn">
            <input
              data-testid={ `${index}-horizontal-favorite-btn` }
              type="image"
              src={ blackHeartIcon }
              alt="botao-favoritado"
              onClick={ () => handleClick(id, type) }
            />
          </label>
        </div>
      </div>
      <Link className="nameImage" to={ `/${foodOrDrink}/${id}` }>
        <h2
          data-testid={ `${index}-horizontal-name` }
        >
          {name}
        </h2>
        <h3
          data-testid={ `${index}-horizontal-top-text` }
        >
          {validate ? (`${nationality} - ${category}`) : alcoholicOrNot}
        </h3>
        <input
          className="favImage"
          type="image"
          src={ image }
          data-testid={ `${index}-horizontal-image` }
          alt="foto-da-receita"
          onClick={ () => history.push(`/${foodOrDrink}/${id}`) }
        />
        <p
          data-testid={ `${index}-horizontal-done-date` }
        >
          {doneDate}
        </p>
      </Link>
    </div>
  );
}

FavoriteRecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  doneDate: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default FavoriteRecipeCard;
