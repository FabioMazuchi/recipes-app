import NUMBER_6 from '../data';

export const checkEmailSenha = (email, senha) => {
  const valid = /\S+@\S+\.\S+/;
  const check = valid.test(email);
  if (check && senha.length > NUMBER_6) return true;
  return false;
};

export const checkFoodIsFavorited = (id) => {
  const array = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (array !== null) {
    return (array.some(({ id: idMeal }) => idMeal === id));
  }
  return false;
};

export const checkDrinkIsFavorited = (id) => {
  const array = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (array !== null) {
    return (array.some(({ id: idDrink }) => idDrink === id));
  }
  return false;
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

export const returnObjFood = (obj) => {
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

export const removeFavStorageFood = (id) => {
  const res = localStorage.getItem('favoriteRecipes');
  if (res !== null) {
    const valor = JSON.parse(res);
    const filtro = valor.filter(({ id: idMeal }) => idMeal !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filtro));
  }
};

export const returnObjDrink = (obj) => {
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

export const removeFavStorageDrink = (id) => {
  const res = localStorage.getItem('favoriteRecipes');
  if (res !== null) {
    const valor = JSON.parse(res);
    const filtro = valor.filter(({ id: idDrink }) => idDrink !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filtro));
  }
};

// const createRecipeObject = (id, ingredientList) => {
//   const obj = {
//     meals: {
//       id: [...ingredientList],
//     },
//   };
//   return obj;
// };

export const saveProgress = (id, ingredient) => {
  const obj = {
    meals: {
      [id]: [...ingredient, ingredient],
    },
  };
  console.log(obj);
  return obj;
};
