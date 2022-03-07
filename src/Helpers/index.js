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
