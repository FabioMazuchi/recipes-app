import { fetchFoodByIngredient,
  fetchFoodByName,
  fetchFoodByFirstLetter,
  fetchDrinkByIngredient,
  fetchDrinkByName,
  fetchDrinkByFirstLetter,
} from '../Services';

export const fetchFoodRecipe = async (searchType, searchValue) => {
  switch (searchType) {
  case 'ingredient':
    return fetchFoodByIngredient(searchValue);
  case 'name':
    return fetchFoodByName(searchValue);
  case 'firstLetter':
    return fetchFoodByFirstLetter(searchValue);
  default:
    break;
  }
};

export const fetchDrinkRecipe = async (searchType, searchValue) => {
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
