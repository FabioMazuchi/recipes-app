import { fetchFoodByIngredient,
  fetchFoodByName,
  fetchFoodByFirstLetter,
  fetchDrinkByIngredient,
  fetchDrinkByName,
  fetchDrinkByFirstLetter,
} from '../Services';

export const fetchFoodRecipe = (searchType, searchValue) => {
  const switchCaseModerno = {
    ingredient: fetchFoodRecipe,
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
