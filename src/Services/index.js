const MAX_LENGTH = 12;
const URL_FOOD = 'https://www.themealdb.com/api/json/v1/1/';
const URL_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/';
const SEARCH_BY_FIRST_LETTER = 'search.php?f=';

export const fetchFoods = async (endpoint, comparison) => {
  if (endpoint.includes(SEARCH_BY_FIRST_LETTER) && comparison.length !== 1) {
    global.alert('Your search must have only 1 (one) character');
  }
  const data = await (await fetch(`${URL_FOOD}${endpoint}`)).json();
  data.meals.slice(0, MAX_LENGTH);
  return data.meals.slice(0, MAX_LENGTH);
};

export const fetchDrinks = async (endpoint, comparison) => {
  if (endpoint.includes(SEARCH_BY_FIRST_LETTER) && comparison.length !== 1) {
    global.alert('Your search must have only 1 (one) character');
  }
  const data = await (await fetch(`${URL_DRINK}${endpoint}`)).json();
  return data.drinks.slice(0, MAX_LENGTH);
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
