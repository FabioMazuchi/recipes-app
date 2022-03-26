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
import shareIcon from '../images/shareIcon.svg';

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
          <div className="mainFoodEDrink" key={ idMeal }>
            <div className="shareHeart">
              {showLinkCopied
              && <p>Link copied!</p>}
              <div>
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
                  <img src={ shareIcon } alt={ strMeal } />
                </button>
                <input
                  data-testid="favorite-btn"
                  type="image"
                  src={ isFavorited ? blackHeartIcon : whiteHeartIcon }
                  alt="favoriteRecipe"
                  onClick={ () => handleClick() }
                />
              </div>
            </div>
            <div className="nameImage">
              <h2 data-testid="recipe-title">{strMeal}</h2>
              <h3 data-testid="recipe-category">{strCategory}</h3>
              <img data-testid="recipe-photo" src={ strMealThumb } alt={ strMeal } />
            </div>
            <div className="ingredientes">
              <h2 className="titleGreen">Ingredientes</h2>
              {foodIngredients.map(({ ingredient, measure }, i) => (
                <p
                  data-testid={ `${i}-ingredient-name-and-measure` }
                  key={ i }
                >
                  { ingredient }
                  <span>{ measure }</span>
                </p>
              ))}
            </div>
            <div className="preparo">
              <h2 className="titleGreen">Modo de preparo</h2>
              <p data-testid="instructions">{strInstructions}</p>
            </div>
            <iframe
              width="560"
              height="315"
              src={ `https://www.youtube.com/embed/${strYoutube.split('=')[1]}` }
              title="YouTube video player"
              frameBorder="0"
              allowFullScreen
            />
            <div className="recomendado">
              <h3>Recomendado</h3>
              <Carousel responsive={ responsive }>
                {recipeDrinks.map(({ idDrink, strDrink, strDrinkThumb }, i) => (
                  <Link
                    to={ `/drinks/${idDrink}` }
                    className="recomendado"
                    key={ i }
                    data-testid={ `${i}-recomendation-card` }
                  >
                    <img data-testid="recipe-photo" src={ strDrinkThumb } alt="oi" />
                    <h2 data-testid={ `${i}-recomendation-title` }>{strDrink}</h2>
                  </Link>
                ))}
              </Carousel>
            </div>
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
