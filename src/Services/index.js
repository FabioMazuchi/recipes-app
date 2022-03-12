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

const returnObjFood = (obj) => {
  const { idMeal, strArea, strCategory, strMeal, strMealThumb } = obj[0];
  const object = {
    id: idMeal,
    type: 'food',
    nationality: strArea,
    category: strCategory,
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb };
  return object;
};

export const removeFavStorageFood = (id) => {
  console.log(id);
  const res = localStorage.getItem('favoriteRecipes');
  if (res !== null) {
    const valor = JSON.parse(res);
    const filtro = valor.filter(({ id: idMeal }) => idMeal !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filtro));
  }
};

export const removeFavStorageDrink = (id) => {
  const res = localStorage.getItem('favoriteRecipes');
  if (res !== null) {
    const valor = JSON.parse(res);
    const filtro = valor.filter(({ id: idDrink }) => idDrink !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filtro));
  }
};

export const saveFoodFavStorage = (obj) => {
  const fav = returnObjFood(obj);
  const array = [];
  const res = localStorage.getItem('favoriteRecipes');
  if (res === null) {
    array.push(fav);
    localStorage.setItem('favoriteRecipes', JSON.stringify(array));
  } else {
    const valor = JSON.parse(res);
    valor.push(fav);
    localStorage.setItem('favoriteRecipes', JSON.stringify(valor));
  }
};

const returnObjDrink = (obj) => {
  const { idDrink, strCategory, strDrink, strAlcoholic, strDrinkThumb } = obj[0];
  const object = {
    id: idDrink,
    type: 'drink',
    nationality: '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strDrinkThumb };
  return object;
};

export const saveDrinkFavStorage = (obj) => {
  const fav = returnObjDrink(obj);
  const array = [];
  const res = localStorage.getItem('favoriteRecipes');
  if (res === null) {
    array.push(fav);
    localStorage.setItem('favoriteRecipes', JSON.stringify(array));
  } else {
    const valor = JSON.parse(res);
    valor.push(fav);
    localStorage.setItem('favoriteRecipes', JSON.stringify(valor));
  }
};
