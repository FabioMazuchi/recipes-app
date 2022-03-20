import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { fetchFoods, fetchDrinks } from '../Services';
import MyContext from '../MyContext/MyContext';

function Header() {
  const history = useHistory();
  const { store: { setData, showSearchIcon, pageTitle } } = useContext(MyContext);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('filter.php?i=');

  const handleClick = async (endpoint, comparison) => {
    const fetchFoodsOrDrinks = (pageTitle.includes('Foods'))
      ? fetchFoods : fetchDrinks;
    const data = await fetchFoodsOrDrinks(endpoint, comparison);
    setData(data);
    if (data.length === 1) {
      const foodOrDrinkRecipeRedirect = (
        pageTitle.includes('Foods') ? `/foods/${data[0].idMeal}`
          : `/drinks/${data[0].idDrink}`
      );
      history.push(`${foodOrDrinkRecipeRedirect}`);
    }
  };

  const searchForm = (
    <form className="searchForm">
      <input
        type="text"
        name="searchValue"
        value={ searchValue }
        onChange={ ({ target }) => setSearchValue(target.value) }
        data-testid="search-input"
        placeholder="Digite aqui..."
      />
      <div className="radio">
        <label htmlFor="ingredient">
          <input
            id="ingredient"
            type="radio"
            value="filter.php?i="
            name="filter"
            onChange={ ({ target }) => setSearchType(target.value) }
            data-testid="ingredient-search-radio"
          />
          Ingredient
        </label>
        <label htmlFor="name">
          <input
            id="name"
            type="radio"
            value="search.php?s="
            name="filter"
            onChange={ ({ target }) => setSearchType(target.value) }
            data-testid="name-search-radio"
          />
          Name
        </label>
        <label htmlFor="firstLetter">
          <input
            id="firstLetter"
            type="radio"
            value="search.php?f="
            name="filter"
            onChange={ ({ target }) => setSearchType(target.value) }
            data-testid="first-letter-search-radio"
          />
          First Letter
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => handleClick(`${searchType}${searchValue}`, searchValue) }
      >
        Search
      </button>
    </form>
  );

  return (
    <header>
      <button
        type="button"
        onClick={ () => history.push('/profile') }
        src={ profileIcon }
        data-testid="profile-top-btn"
      >
        <img src={ profileIcon } alt="profile-icon-svg" />
      </button>
      <button
        className="pageTitle"
        type="button"
        data-testid="page-title"
      >
        {pageTitle}
      </button>
      {
        showSearchIcon
        && (
          <button
            type="button"
            onClick={ () => setShowSearchBar(!showSearchBar) }
            src={ searchIcon }
            data-testid="search-top-btn"
          >
            <img src={ searchIcon } alt="search-icon-svg" />
          </button>
        )
      }
      {showSearchBar && searchForm }
    </header>
  );
}

export default Header;
