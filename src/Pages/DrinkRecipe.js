import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { fetchDrinkRecipeById, getIngredients } from '../Services';

function DrinkRecipe() {
  const history = useHistory();
  const idd = history.location.pathname.split('/');
  const id = idd[idd.length - 1];
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recipeFoods, setRecipeFoods] = useState([]);

  const fetchInitFoods = async () => {
    const result = await (await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')).json();
    result.meals.length = 6;
    console.log(result.meals);
    setRecipeFoods(result.meals);
    console.log(recipeFoods);
  };

  const teste = async () => {
    const response = await fetchDrinkRecipeById(id);
    setRecipe(response);
    const res = getIngredients(response);
    setIngredients(res);
    fetchInitFoods();
  };

  useEffect(() => {
    teste();
  }, []);

  return (
    <>
      {recipe.map(
        ({
          idDrink,
          strDrink,
          strDrinkThumb,
          strInstructions,
          strAlcoholic,
        }) => (
          <div key={ idDrink }>
            <button data-testid="share-btn" type="button">
              Compartilhar
            </button>
            <button data-testid="favorite-btn" type="button">
              Favoitar
            </button>
            <h3 data-testid="recipe-category">{strAlcoholic}</h3>
            <h2 data-testid="recipe-title">{strDrink}</h2>
            <img data-testid="recipe-photo" src={ strDrinkThumb } alt="oi" />
            <h2>Ingredientes:</h2>
            {ingredients.map(({ ingredient, measure }, i) => (
              <p data-testid={ `${i}-ingredient-name-and-measure` } key={ i }>
                {`${ingredient} - ${measure}` }
              </p>
            ))}
            <h3>Modo de preparo:</h3>
            <p data-testid="instructions">{strInstructions}</p>
            <section>
              {recipeFoods.map(({ idMeal, strMeal, strMealThumb }, i) => (
                <Link
                  to={ `/foods/${idMeal}` }
                  key={ i }
                  data-testid={ `${i}-recomendation-card` }
                >
                  <img data-testid="recipe-photo" src={ strMealThumb } alt="oi" />
                  <h2 data-testid="recipe-title">{strMeal}</h2>
                </Link>
              ))}
            </section>
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
