import React, { useEffect, useState } from 'react';
import { useHistory, Link, useLocation } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { fetchFoodRecipeById, getIngredients, saveFoodFavStorage } from '../Services';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
// import MyContext from '../MyContext/MyContext';

function FoodRecipe() {
  // const { store: {
  //   favoritedArray,
  //   setFavoritedArray } } = useContext(MyContext);
  const history = useHistory();
  const { pathname } = useLocation();
  const idd = pathname.split('/');
  const id = idd[idd.length - 1];
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [embedYoutube, setEmbedYoutube] = useState('');
  const [recipeDrinks, setRecipeDrinks] = useState([]);
  const [initRecipe, setInitRecipe] = useState(false);
  const [showLinkCopied, setShowLinkCopied] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const getFavStorage = () => {
    const res = localStorage.getItem('favoriteRecipes');
    const array = JSON.parse(res);
    if (array !== null) {
      const check = array.some(({ idMeal }) => idMeal === id);
      if (check) {
        setIsFavorited(true);
      } else {
        setIsFavorited(false);
      }
      console.log(check);
      console.log(array);
    }
  };

  const iniciarReceita = (idMeal) => {
    setInitRecipe(true);
    history.push(`/foods/${idMeal}/in-progress`);
  };

  const fetchInitDrinks = async () => {
    const result = await (await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')).json();
    result.drinks.length = 6;
    setRecipeDrinks(result.drinks);
  };

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
  };

  // const handleFavorite = (param, obj) => {
  //   setFavoritedArray([...favoritedArray, param]);
  //   if (isFavorited) {
  //     setFavoritedArray(favoritedArray.filter((f) => f !== param));
  //   }
  //   setIsFavorited(!isFavorited);
  //   saveFoodFavStorage(obj);
  // };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  useEffect(() => {
    getRecipes();
    fetchInitDrinks();
    // setIsFavorited(favoritedArray.includes(id));
    getFavStorage();
  }, [isFavorited]);

  useEffect(() => {
    getFavStorage();
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
              onClick={ () => saveFoodFavStorage(recipe) }
            />
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
            <Carousel responsive={ responsive }>
              {recipeDrinks.map(({ idDrink, strDrink, strDrinkThumb }, i) => (
                <div
                  key={ i }
                  data-testid={ `${i}-recomendation-card` }
                >
                  <img data-testid="recipe-photo" src={ strDrinkThumb } alt="oi" />
                  <h2 data-testid={ `${i}-recomendation-title` }>{strDrink}</h2>
                  <Link to={ `/drinks/${idDrink}` }>Detalhes</Link>
                </div>
              ))}
            </Carousel>
            <button
              onClick={ () => iniciarReceita(idMeal) }
              className="startRecipe"
              type="button"
              data-testid="start-recipe-btn"
            >
              {initRecipe ? 'Iniciar Receita' : 'Continue Recipe'}
            </button>
          </div>
        ),
      )}
    </>
  );
}

export default FoodRecipe;
