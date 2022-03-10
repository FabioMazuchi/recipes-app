import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { fetchFoodRecipeById, getIngredients } from '../Services';

function FoodRecipe() {
  const history = useHistory();
  const idd = history.location.pathname.split('/');
  const id = idd[idd.length - 1];
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [embedYoutube, setEmbedYoutube] = useState('');

  const getIdVideo = (array) => {
    const { strYoutube } = array[0];
    const IdYoutube = strYoutube.split('=')[1];
    const result = `https://www.youtube.com/embed/${IdYoutube}`;
    setEmbedYoutube(result);
  };

  const getRecipes = async () => {
    const response = await fetchFoodRecipeById(id);
    setRecipe(response);
    const res = getIngredients(response);
    setIngredients(res);
    getIdVideo(response);
    console.log(ingredients);
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
            <h2>Ingredientes:</h2>
            {ingredients.map(({ ingredient, measure }, i) => (
              <p
                data-testid={ `${i}-ingredient-name-and-measure` }
                key={ i }
              >
                { `${ingredient} - ${measure}` }
              </p>
            ))}
            <h3>Modo de preparo:</h3>
            <p data-testid="instructions">{strInstructions}</p>
            <Link data-testid="video" target="_blank" to={ strYoutube }>
              Video
            </Link>
            <iframe
              width="560"
              height="315"
              src={ embedYoutube }
              title="YouTube video player"
              frameBorder="0"
              allowFullScreen
            />
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
