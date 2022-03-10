import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchDrinkRecipeById } from '../Services';

function DrinkRecipe() {
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

  const teste = async () => {
    const response = await fetchDrinkRecipeById(id);
    setRecipe(response);
    getIngredients(response);
  };

  console.log(recipe);

  useEffect(() => {
    teste();
  }, []);

  return (
    <>
      {recipe.map(
        ({
          idDrink,
          strCategory,
          strDrink,
          strDrinkThumb,
          strInstructions,
        }) => (
          <div key={ idDrink }>
            <button data-testid="share-btn" type="button">
              Compartilhar
            </button>
            <button data-testid="favorite-btn" type="button">
              Favoitar
            </button>
            <h3 data-testid="recipe-category">{strCategory}</h3>
            <h2 data-testid="recipe-title">{strDrink}</h2>
            <img data-testid="recipe-photo" src={ strDrinkThumb } alt="oi" />
            {ingredients.map((ingredient, i) => (
              <p data-testid={ `${i}-ingredient-name-and-measure` } key={ i }>
                {ingredient}
              </p>
            ))}
            <h3>Modo de preparo:</h3>
            <p data-testid="instructions">{strInstructions}</p>
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

export default DrinkRecipe;
