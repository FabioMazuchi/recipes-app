import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchDrinkRecipeById } from '../Services';

function DrinkRecipe() {
  const history = useHistory();
  const idd = history.location.pathname.split('/');
  const id = idd[idd.length - 1];
  const [recipe, setRecipe] = useState([]);

  const getRecipes = async () => {
    setRecipe(await fetchDrinkRecipeById(id));
  };

  console.log(recipe);

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <h1>DrinkRecipe Page</h1>
  );
}

export default DrinkRecipe;
