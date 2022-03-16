import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchFoods } from '../Services';
import { getIngredients } from '../Helpers';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import MyContext from '../MyContext/MyContext';
import Checkbox from '../Components/Checkbox';

function FoodsInProgress() {
  const { store: { isFavorited,
    setFoodRecipe,
    setFoodIngredients,
    foodRecipe,
    foodIngredients } } = useContext(MyContext);
  const { id } = useParams();
  const { pathname } = useLocation();
  const [showLinkCopied, setShowLinkCopied] = useState(false);

  useEffect(() => {
    const setFoodAndIngredientsEffect = async () => {
      if (!foodRecipe.length) {
        const data = await fetchFoods(`lookup.php?i=${id}`);
        setFoodRecipe(data);
        setFoodIngredients(getIngredients(data));
      }
    };
    setFoodAndIngredientsEffect();
  }, []);

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
              <Checkbox
                key={ i }
                ingredient={ ingredient }
                measure={ measure }
                name={ i }
              />
            ))}
            <h3>Modo de preparo:</h3>
            <p data-testid="instructions">{strInstructions}</p>
          </div>
        ),
      )}
      <button
        data-testid="finish-recipe-btn"
        type="button"
      >
        Finalizar Receita
      </button>
    </>
  );
}

export default FoodsInProgress;
