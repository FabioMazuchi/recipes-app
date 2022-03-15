import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { saveProgress } from '../Helpers';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [data, setData] = useState([]);
  const [showSearchIcon, setShowSearchIcon] = useState(true);
  const [pageTitle, setPageTitle] = useState('Foods');
  const [isFavorited, setIsFavorited] = useState(false);
  const [foodRecipe, setFoodRecipe] = useState([]);
  const [drinkRecipe, setDrinkRecipe] = useState([]);
  const [foodIngredients, setFoodIngredients] = useState([]);
  const [drinkIngredients, setDrinkIngredients] = useState([]);
  const [initRecipe, setInitRecipe] = useState(false);
  const [meals, setMeals] = useState({});
  const [cocktails, setCocktails] = useState({});

  // useEffect(() => {
  //   const progressObj = {
  //     meals,
  //     cocktails,
  //   };
  //   console.log(progressObj);
  //   localStorage.setItem('inProgressRecipes',
  //     JSON.stringify({ meals: {}, cocktails: {} }));
  //   if (progressObj.cocktails.length > 0 || progressObj.meals.length > 0) {
  //     saveProgress(progressObj);
  //   }
  // }, [meals, cocktails]);

  const store = {
    data,
    setData,
    showSearchIcon,
    setShowSearchIcon,
    pageTitle,
    setPageTitle,
    isFavorited,
    setIsFavorited,
    foodRecipe,
    setFoodRecipe,
    foodIngredients,
    setFoodIngredients,
    drinkRecipe,
    setDrinkRecipe,
    drinkIngredients,
    setDrinkIngredients,
    initRecipe,
    setInitRecipe,
    meals,
    setMeals,
    cocktails,
    setCocktails,
  };
  return (
    <main>
      <MyContext.Provider value={ { store } }>
        {children}
      </MyContext.Provider>
    </main>
  );
}

MyProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MyProvider;
