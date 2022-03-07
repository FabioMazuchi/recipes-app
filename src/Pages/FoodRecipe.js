import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchFoodRecipeById } from '../Services';

function FoodRecipe() {
  const history = useHistory();
  const idd = history.location.pathname.split('/');
  const id = idd[idd.length - 1];
  const [recipe, setRecipe] = useState([]);

  const getRecipes = async () => {
    setRecipe(await fetchFoodRecipeById(id));
  };

  console.log(recipe);

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <h1>Oi</h1>
  );
}

export default FoodRecipe;
