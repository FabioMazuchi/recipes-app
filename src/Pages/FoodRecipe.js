import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams, useHistory, useLocation } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import 'react-multi-carousel/lib/styles.css';
import { fetchFoods, fetchDrinks } from '../Services';
import { checkFoodIsFavorited,
  getIngredients,
  saveFoodFavStorage,
  removeFavStorageFood } from '../Helpers';
import MyContext from '../MyContext/MyContext';

function FoodRecipe() {
  const { store: { isFavorited,
    setIsFavorited,
    foodRecipe,
    setFoodRecipe,
    foodIngredients,
    setFoodIngredients,
    initRecipe,
    setInitRecipe } } = useContext(MyContext);
  const SIX = 6;
  const { pathname } = useLocation();
  const { id } = useParams();
  const history = useHistory();
  const [recipeDrinks, setRecipeDrinks] = useState([]);
  const [showLinkCopied, setShowLinkCopied] = useState(false);

  // Deixei essa função genérica, pois terá que ser utilizada na page FoodsInProgress, e a passei para o arquivo das funções Helpers;
  // com o nome de checkFoodIsFavorited;
  // const getFavStorage = () => {
  //   const res = localStorage.getItem('favoriteRecipes');
  // const array = JSON.parse(res);
  //   if (array !== null) {
  //     const check = array.some(({ id: idMeal }) => idMeal === id);
  //     if (check) {
  //       setIsFavorited(true);
  //       setFavoritar(true);
  //     } else {
  //       setIsFavorited(false);
  //       setFavoritar(false);
  //     }
  //   }
  // };

  // Passei essa função direto pro handleClick;
  // const iniciarReceita = (idMeal) => {
  //   setInitRecipe(true);
  //   history.push(`/foods/${idMeal}/in-progress`);
  // };

  // const fetchInitDrinks = async () => {
  //   const result = await (await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')).json();
  //   result.drinks.length = 6;
  //   setRecipeDrinks(result.drinks);
  // };

  // Fiz esta função ocorrer direto no embed do Youtube, no HTML;
  // const getIdVideo = (array) => {
  //   const { strYoutube } = array[0];
  //   const IdYoutube = strYoutube.split('=')[1];
  //   const result = `https://www.youtube.com/embed/${IdYoutube}`;
  //   setEmbedYoutube(result);
  // };

  // const getRecipes = async () => {
  //   const response = await fetchFoods(`lookup.php?i=${id}`);
  //   setRecipe(response);
  //   const res = getIngredients(response);
  //   setIngredients(res);
  //   getIdVideo(response);
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

  const handleClick = () => {
    setIsFavorited(!isFavorited);
    return !isFavorited ? saveFoodFavStorage(foodRecipe) : removeFavStorageFood(id);
  };

  // Vi alguns vídeos sobre boas práticas do useEffect e constatei que o melhor é separar cada useEffect para uma função única;
  // Refatorei esta parte para o nosso código ficar mais agradável para a leitura;
  useEffect(() => {
    const setRecipeEffect = async () => {
      setFoodRecipe(await fetchFoods(`lookup.php?i=${id}`));
    };
    setRecipeEffect();
  }, []);

  useEffect(() => {
    const setIngredientsEffect = async () => {
      // Esse if foi só para não quebrar o teste - aplicação funciona normal sem;
      if (foodRecipe.length) {
        setFoodIngredients(getIngredients(foodRecipe));
      }
    };
    setIngredientsEffect();
  }, [foodRecipe]);

  useEffect(() => {
    const setRecipeDrinksEffect = async () => {
      const data = await fetchDrinks('search.php?s=');
      setRecipeDrinks(data.slice(0, SIX));
    };
    setRecipeDrinksEffect();
  }, []);

  useEffect(() => {
    const setIsFavoritedEffect = () => {
      const check = checkFoodIsFavorited(id);
      setIsFavorited(check);
    };
    setIsFavoritedEffect();
  }, []);

  // Refatorei esta função, para passar a utilizar um handleClick no botão de favoritar;
  // useEffect(() => {
  //   if (countFav !== 0) {
  //     console.log(countFav);
  //     if (favoritar) {
  //       saveFoodFavStorage(recipe);
  //       setIsFavorited(true);
  //     } else {
  //       removeFavStorageFood(id);
  //       setIsFavorited(false);
  //     }
  //   }
  // }, [favoritar]);

  return (
    <>
      {foodRecipe.map(
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
              onClick={ handleClick }
            />
            <h3 data-testid="recipe-category">{strCategory}</h3>
            <h2 data-testid="recipe-title">{strMeal}</h2>
            <img data-testid="recipe-photo" src={ strMealThumb } alt="oi" />
            <h2>Ingredientes:</h2>
            {foodIngredients.map(({ ingredient, measure }, i) => (
              <p
                data-testid={ `${i}-ingredient-name-and-measure` }
                key={ i }
              >
                { `${ingredient} - ${measure}` }
              </p>
            ))}
            <h3>Modo de preparo:</h3>
            <p data-testid="instructions">{strInstructions}</p>
            <a
              data-testid="video"
              href={ strYoutube }
            >
              Video

            </a>
            <iframe
              width="560"
              height="315"
              src={ `https://www.youtube.com/embed/${strYoutube.split('=')[1]}` }
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
              onClick={ () => {
                setInitRecipe(true);
                history.push(`/foods/${idMeal}/in-progress`);
              } }
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
