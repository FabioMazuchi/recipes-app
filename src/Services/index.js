const TWELVE = 12;

export const fetchFoodByIngredient = async (ingredient) => {
  const data = await (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)).json();
  data.meals.length = 12;
  return data.meals;
};

export const fetchFoodByName = async (name) => {
  const data = await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)).json();
  if (data.meals.length > TWELVE) {
    data.meals.length = TWELVE;
  }
  return data.meals;
};

export const fetchFoodByFirstLetter = async (firstLetter) => {
  if (firstLetter.length !== 1) {
    global.alert('Your search must have only 1 (one) character');
    return [];
  }
  const data = await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`)).json();
  const result = data.meals.filter((meal) => meal.strMeal[0]
  === firstLetter.toUpperCase());
  if (result.length > TWELVE) {
    result.length = TWELVE;
  }
  return result;
};

export const fetchFoodRecipeById = async (id) => {
  const data = await (await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)).json();
  return data.meals;
};

export const fetchDrinkByIngredient = async (ingredient) => {
  const data = await (await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)).json();
  if (data.drinks.length > TWELVE) {
    data.drinks.length = TWELVE;
  }
  return data.drinks;
};

export const fetchDrinkByName = async (name) => {
  const data = await (await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)).json();
  if (data.drinks.length > TWELVE) {
    data.drinks.length = TWELVE;
  }
  return data.drinks;
};

export const fetchDrinkByFirstLetter = async (firstLetter) => {
  if (firstLetter.length !== 1) {
    global.alert('Your search must have only 1 (one) character');
    return [];
  }
  const data = await (await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`)).json();
  const result = data.drinks.filter((drink) => drink.strDrink[0]
   === firstLetter.toUpperCase());
  if (result.length > TWELVE) {
    result.length = TWELVE;
  }
  return result;
};

export const fetchDrinkRecipeById = async (id) => {
  const data = await (await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)).json();
  return data.drinks;
};
