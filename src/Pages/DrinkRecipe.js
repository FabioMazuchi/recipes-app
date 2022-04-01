import React, { useEffect, useState, useContext } from 'react';
import { useHistory, Link, useLocation, useParams } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { getIngredients,
  checkDrinkIsFavorited,
  removeFavStorageDrink,
  saveDrinkFavStorage } from '../Helpers';
import { fetchDrinks, fetchFoods } from '../Services';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import MyContext from '../MyContext/MyContext';
import shareIcon from '../images/shareIcon.svg';

function DrinkRecipe() {
  const { store: { isFavorited,
    setIsFavorited,
    drinkRecipe,
    setDrinkRecipe,
    drinkIngredients,
    setDrinkIngredients,
    initRecipe,
    setInitRecipe } } = useContext(MyContext);
  const SIX = 6;
  const { pathname } = useLocation();
  const { id } = useParams();
  const history = useHistory();
  const [recipeFoods, setRecipeFoods] = useState([]);
  const [showLinkCopied, setShowLinkCopied] = useState(false);

  const iniciarReceita = (idDrink) => {
    setInitRecipe(true);
    history.push(`/drinks/${idDrink}/in-progress`);
  };

  const handleClick = () => {
    setIsFavorited(!isFavorited);
    return !isFavorited ? saveDrinkFavStorage(drinkRecipe) : removeFavStorageDrink(id);
  };

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
    const setRecipeEffect = async () => {
      setDrinkRecipe(await fetchDrinks(`lookup.php?i=${id}`));
    };
    setRecipeEffect();
  }, [id, setDrinkRecipe]);

  useEffect(() => {
    const setIngredientsEffect = async () => {
      if (drinkRecipe.length) {
        setDrinkIngredients(getIngredients(drinkRecipe));
      }
    };
    setIngredientsEffect();
  }, [drinkRecipe, setDrinkIngredients]);

  useEffect(() => {
    const setRecipeFoodsEffect = async () => {
      const data = await fetchFoods('search.php?s=');
      setRecipeFoods(data.slice(0, SIX));
    };
    setRecipeFoodsEffect();
  }, []);

  useEffect(() => {
    const setIsFavoritedEffect = () => {
      const check = checkDrinkIsFavorited(id);
      setIsFavorited(check);
    };
    setIsFavoritedEffect();
  }, [id, setIsFavorited]);

  return (
    <>
      {drinkRecipe.map(
        ({
          idDrink,
          strDrink,
          strDrinkThumb,
          strInstructions,
          strAlcoholic,
        }) => (
          <div className="mainFoodEDrink" key={ idDrink }>
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
                  <img src={ shareIcon } alt={ strDrink } />
                </button>
                <input
                  data-testid="favorite-btn"
                  type="image"
                  src={ isFavorited ? blackHeartIcon : whiteHeartIcon }
                  alt="favoriteRecipe"
                  onClick={ handleClick }
                />
              </div>
            </div>
            <div className="nameImage">
              <h2 data-testid="recipe-title">{strDrink}</h2>
              <h3 data-testid="recipe-category">{strAlcoholic}</h3>
              <img data-testid="recipe-photo" src={ strDrinkThumb } alt={ strDrink } />
            </div>
            <div className="ingredientes">
              <h2 className="titleGreen">Ingredientes</h2>
              {drinkIngredients.map(({ ingredient, measure }, i) => (
                <p data-testid={ `${i}-ingredient-name-and-measure` } key={ i }>
                  { ingredient }
                  <span>{ measure }</span>
                </p>
              ))}
            </div>
            <div className="preparo">
              <h2 className="titleGreen">Modo de preparo</h2>
              <p data-testid="instructions">{strInstructions}</p>
            </div>
            <div className="recomendado">
              <h3>Recomendado</h3>
              <Carousel responsive={ responsive }>
                {recipeFoods.map(({ idMeal, strMeal, strMealThumb }, i) => (
                  <Link
                    to={ `/foods/${idMeal}` }
                    key={ i }
                    className="recomendado"
                    data-testid={ `${i}-recomendation-card` }
                  >
                    <img data-testid="recipe-photo" src={ strMealThumb } alt="oi" />
                    <h2 data-testid={ `${i}-recomendation-title` }>{strMeal}</h2>
                  </Link>
                ))}
              </Carousel>
            </div>
            <button
              onClick={ () => iniciarReceita(idDrink) }
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

export default DrinkRecipe;
