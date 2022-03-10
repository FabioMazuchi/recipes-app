const TWELVE = 12;

export const fetchFoodByIngredient = async (ingredient) => {
  const data = await (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)).json();
  if (data.meals.length > TWELVE) {
    data.meals.length = TWELVE;
  }
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
  return data.meals;
};

export const fetchFoodRecipeById = async (id) => {
  const data = await (await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)).json();
  return data.meals;
};

export const fetchFoodCategories = async () => {
  const data = await (await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')).json();
  data.meals.length = 5;
  return data.meals;
};

export const fetchFoodByCategory = async (category) => {
  const data = await (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)).json();
  if (data.meals.length > TWELVE) {
    data.meals.length = TWELVE;
  }
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

export const fetchDrinkCategories = async () => {
  const data = await (await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')).json();
  data.drinks.length = 5;
  return data.drinks;
};

export const fetchDrinkByCategory = async (category) => {
  const data = await (await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)).json();
  if (data.drinks.length > TWELVE) {
    data.drinks.length = TWELVE;
  }
  return data.drinks;
};

export const getIngredients = (array) => {
  const keys = Object.entries(array[0]);
  const arrayIngred = keys
    .filter((k) => k[0].includes('Ingredient') && k[1] !== '' && k[1] !== null);
  const arrayMeasure = keys
    .filter((k) => k[0].includes('strMeasure') && k[1] !== '' && k[1] !== null);
  const ingred = arrayIngred.map((ingr) => ingr[1]);
  const measure = arrayMeasure.map((measur) => measur[1]);
  const finalResult = ingred.reduce(((acc, ingr, i) => {
    const obj = { ingredient: '', measure: '' };
    obj.ingredient = ingr;
    obj.measure = measure[i];
    acc.push(obj);
    return acc;
  }), []);
  return finalResult;
};
