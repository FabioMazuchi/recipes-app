import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchFoodRecipeById } from '../Services';

function FoodRecipe() {
  const history = useHistory();
  const idd = history.location.pathname.split('/');
  const id = idd[idd.length - 1];
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const getIngredients = () => {
    const keys = Object.entries(recipe[0]);
    const arrayIngred = keys
      .filter((k) => k[0].includes('Ingredient') && k[1] !== '');
    const ingred = arrayIngred.map((ingr) => ingr[1]);
    setIngredients(ingred);
  };

  const getRecipes = async () => {
    setRecipe(await fetchFoodRecipeById(id));
    getIngredients();
  };

  useEffect(() => {
    console.log('effect');
    getRecipes();
  }, []);

  return (
    <div>
      {recipe.length !== 0 && (
        <>
          {recipe.map(
            ({ strMealThumb, strArea, strCategory, strInstructions, strYoutube }) => (
              <div key="1">
                <h3 data-testid="recipe-category">{strCategory}</h3>
                <h2 data-testid="recipe-title">{strArea}</h2>
                <img data-testid="recipe-photo" src={ strMealThumb } alt="oi" />
                <h3>Ingredientes:</h3>
                {ingredients.map((ingredient, i) => (
                  <p data-testid={ `${i}-ingredient-name-and-measure` } key={ i }>
                    {ingredient}
                  </p>
                ))}
                <h3>Modo de preparo:</h3>
                <p data-testid="instructions">{strInstructions}</p>
                <button data-testid="share-btn" type="button">
                  Compartilhar
                </button>
                <button data-testid="favorite-btn" type="button">
                  Favoitar
                </button>
              </div>
            ),
          )}
        </>
      )}
    </div>
  );
}

export default FoodRecipe;
