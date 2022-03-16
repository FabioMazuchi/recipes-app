const MAX_LENGTH = 12;
const URL_FOOD = 'https://www.themealdb.com/api/json/v1/1/';
const URL_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/';
const SEARCH_BY_FIRST_LETTER = 'search.php?f=';

export const fetchFoods = async (endpoint, comparison) => {
  if (endpoint.includes(SEARCH_BY_FIRST_LETTER) && comparison.length !== 1) {
    global.alert('Your search must have only 1 (one) character');
  }
  const data = await (await fetch(`${URL_FOOD}${endpoint}`)).json();
  return data.meals.slice(0, MAX_LENGTH);
};

export const fetchDrinks = async (endpoint, comparison) => {
  if (endpoint.includes(SEARCH_BY_FIRST_LETTER) && comparison.length !== 1) {
    global.alert('Your search must have only 1 (one) character');
  }
  const data = await (await fetch(`${URL_DRINK}${endpoint}`)).json();
  return data.drinks.slice(0, MAX_LENGTH);
};

export const fetchFoodArea = async () => {
  const data = await (await fetch(`${URL_FOOD}list.php?a=list`)).json();
  return data.meals;
};

// export const getArrayFilterPais = async (pais) => {
//   const filterpais = await fetchFoods(`filter.php?a=${pais}`);
//   return filterpais;
// };

// export const fetchGeralPaises = async (array) => {
//   const results = [];
//   const final = array.reduce((async (acc, { strArea }) => {
//     // const res = await getArrayFilterPais(strArea);
//     const obj = { name: '' };
//     obj.name = strArea;
//     // obj.filtro = await res;
//     acc.push(obj);
//     return acc;
//   }), []);
//   const fim = await final;
//   console.log('fim', fim);
//   console.log('results', results);
//   return results;
// };
