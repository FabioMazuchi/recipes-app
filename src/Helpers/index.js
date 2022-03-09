import {
  fetchFoodByName,
  fetchFoodByFirstLetter,
  fetchDrinkByIngredient,
  fetchDrinkByName,
  fetchDrinkByFirstLetter,
} from '../Services';
import NUMBER_6 from '../data';

export const fetchFoodRecipe = async (searchType, searchValue) => {
  const switchCaseModerno = {
    ingredient: fetchFoodByIngredient,
    name: fetchFoodByName,
    firstLetter: fetchFoodByFirstLetter,
  };
  return switchCaseModerno[searchType](searchValue);
};

export const fetchDrinkRecipe = (searchType, searchValue) => {
  switch (searchType) {
  case 'ingredient':
    return fetchDrinkByIngredient(searchValue);
  case 'name':
    return fetchDrinkByName(searchValue);
  case 'firstLetter':
    return fetchDrinkByFirstLetter(searchValue);
  default:
    break;
  }
};

// export const redirectToDetails = (data) => {
//   const history = useHistory();
//   if (Object.keys(data[0].includes('Meal'))) {
//     return history.push(`/foods/${data[0].idMeal}`);
//   } else {
//     history.push(`/drinks/${data[0].idDrink}`);
//   }
// };

export const checkEmailSenha = (email, senha) => {
  const valid = /\S+@\S+\.\S+/;
  const check = valid.test(email);
  if (check && senha.length > NUMBER_6) return true;
  return false;
};
