export const fetchFoodByIngredient = async (ingredient) => {
  const data = await (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)).json();
  return data.meals;
};

export const fetchFoodByName = async (name) => {
  const data = await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)).json();
  return data.meals;
};

export const fetchFoodByFirstLetter = async (firstLetter) => {
  if (firstLetter.length !== 1) {
    global.alert('Your search must have only 1 (one) character');
  } else {
    const data = await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${firstLetter}`)).json();
    return data.meals;
  }
};

export const fetchFoodRecipeById = async (id) => {
  const data = await (await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)).json();
  return data.meals;
};

export const fetchDrinkByIngredient = async (ingredient) => {
  const data = await (await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)).json();
  return data.drinks;
};

export const fetchDrinkByName = async (name) => {
  const data = await (await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)).json();
  return data.drinks;
};

export const fetchDrinkByFirstLetter = async (firstLetter) => {
  if (firstLetter.length !== 1) {
    global.alert('Your search must have only 1 (one) character');
  } else {
    const data = await (await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`)).json();
    return data.drinks;
  }
};

export const fetchDrinkRecipeById = async (id) => {
  const data = await (await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)).json();
  return data.drinks;
};
