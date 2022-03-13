import React, { useContext, useState } from 'react';
// import { useParams, useLocation } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import MyContext from '../MyContext/MyContext';

function FoodsInProgress() {
  const { store: { isFavorited,
    foodRecipe,
    foodIngredients } } = useContext(MyContext);
  //   const { id } = useParams();
  const { pathname } = useLocation();
  const [showLinkCopied, setShowLinkCopied] = useState(false);

  return (
    <>
      {foodRecipe.map(
        ({
          idMeal,
          strCategory,
          strMeal,
          strMealThumb,
          strInstructions,
        }) => (
          <div key={ idMeal }>
            <button
              data-testid="share-btn"
              type="button"
              value={ `http://localhost:3000${pathname}` }
              // Source: https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
              onClick={ ({ target }) => {
                navigator.clipboard.writeText(target.value);
                setShowLinkCopied(true);
              } }
            >
              Compartilhar
            </button>
            {showLinkCopied
            && <p>Link copied!</p>}
            <input
              data-testid="favorite-btn"
              type="image"
              src={ isFavorited ? blackHeartIcon : whiteHeartIcon }
              alt="favoriteRecipe"
              onClick={ () => favoritarReceita() }
            />
            <h3 data-testid="recipe-category">{strCategory}</h3>
            <h2 data-testid="recipe-title">{strMeal}</h2>
            <img data-testid="recipe-photo" src={ strMealThumb } alt="oi" />
            <h2>Ingredientes:</h2>
            {foodIngredients.map(({ ingredient, measure }, i) => (
              <p
                data-testid={ `${i}-ingredient-step` }
                key={ i }
              >
                { `${ingredient} - ${measure}` }
              </p>
            ))}
            <h3>Modo de preparo:</h3>
            <p data-testid="instructions">{strInstructions}</p>
          </div>
        ),
      )}
    </>
  );
}

export default FoodsInProgress;
