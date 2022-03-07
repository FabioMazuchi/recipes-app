import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { fetchFoodRecipe, fetchDrinkRecipe } from '../Helpers';
import MyContext from '../MyContext/MyContext';

function Header() {
  const history = useHistory();
  const { store: { setData, showSearchIcon, pageTitle } } = useContext(MyContext);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('ingredient');

  const handleClick = async (e) => {
    e.preventDefault();
    const TWELVE = 12;
    const fetchFoodsOrDrinks = (pageTitle === 'Foods')
      ? fetchFoodRecipe : fetchDrinkRecipe;
    const data = await fetchFoodsOrDrinks(searchType, searchValue);
    if (data === undefined || null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (data.length > TWELVE) {
      data.length = TWELVE;
    }
    setData(data);
  };

  const searchForm = (
    <form>
      <input
        type="text"
        name="searchValue"
        value={ searchValue }
        onChange={ ({ target }) => setSearchValue(target.value) }
        data-testid="search-input"
      />
      <div className="radio">
        <label htmlFor="ingredient">
          <input
            id="ingredient"
            type="radio"
            value="ingredient"
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
            value="name"
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
            value="firstLetter"
            name="filter"
            onChange={ ({ target }) => setSearchType(target.value) }
            data-testid="first-letter-search-radio"
          />
          First Letter
        </label>
      </div>
      <button
        type="submit"
        data-testid="exec-search-btn"
        onClick={ handleClick }
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
