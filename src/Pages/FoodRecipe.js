import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { fetchFoodRecipeById } from '../Services';

function FoodRecipe() {
  const history = useHistory();
  const idd = history.location.pathname.split('/');
  const id = idd[idd.length - 1];
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const getIngredients = (array) => {
    const keys = Object.entries(array[0]);
    const arrayIngred = keys
      .filter((k) => k[0].includes('Ingredient') && k[1] !== '');
    const ingred = arrayIngred.map((ingr) => ingr[1]);
    setIngredients(ingred);
    console.log(ingredients);
  };

  const getRecipes = async () => {
    const response = await fetchFoodRecipeById(id);
    setRecipe(response);
    getIngredients(response);
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <>
      {recipe.map(
        ({
          idMeal,
          strCategory,
          strMeal,
          strMealThumb,
          strInstructions,
          strYoutube,
        }) => (
          <div key={ idMeal }>
            <button data-testid="share-btn" type="button">
              Compartilhar
            </button>
            <button data-testid="favorite-btn" type="button">
              Favoitar
            </button>
            <h3 data-testid="recipe-category">{strCategory}</h3>
            <h2 data-testid="recipe-title">{strMeal}</h2>
            <img data-testid="recipe-photo" src={ strMealThumb } alt="oi" />
            {ingredients.map((ingredient, i) => (
              <p data-testid={ `${i}-ingredient-name-and-measure` } key={ i }>
                {ingredient}
              </p>
            ))}
            <h3>Modo de preparo:</h3>
            <p data-testid="instructions">{strInstructions}</p>
            <Link data-testid="video" target="_blank" to={ strYoutube }>
              Video
            </Link>
            <div data-testid="0-recomendation-card">Recomendado</div>
            <button type="button" data-testid="start-recipe-btn">
              Iniciar Receita
            </button>
          </div>
        ),
      )}
    </>
  );
}

export default FoodRecipe;
