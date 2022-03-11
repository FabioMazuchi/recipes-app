import React, { useContext, useEffect, useState } from 'react';
import { fetchDrinkByCategory, fetchDrinkCategories } from '../Services';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Card from '../Components/Card';
import MyContext from '../MyContext/MyContext';
import CategoryListButton from '../Components/CategoryListButton';

function Drinks() {
  const { store: { data,
    setShowSearchIcon, setData, setPageTitle } } = useContext(MyContext);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [drinkCategories, setDrinkCategories] = useState([]);

  const fetchInitDrinks = async () => {
    const result = await (await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')).json();
    result.drinks.length = 12;
    setData(result.drinks);
  };

  const fetchDrinksCategories = async () => {
    const resultCategories = await fetchDrinkCategories();
    setDrinkCategories(resultCategories);
  };

  const handleSelect = async (strCategory) => {
    setSelectedCategory(strCategory);
    const validate = (
      selectedCategory === strCategory
      || strCategory === 'All'
    );
    if (validate) {
      fetchInitDrinks();
      setSelectedCategory('');
    } else {
      const result = await fetchDrinkByCategory(strCategory);
      setData(result);
    }
  };

  useEffect(() => {
    setShowSearchIcon(true);
    setPageTitle('Drinks');
    fetchInitDrinks();
    fetchDrinksCategories();
  }, []);

  return (
    <>
      <Header />
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => handleSelect('All') }
      >
        All

      </button>
      {drinkCategories.map(({ strCategory }, index) => (
        <CategoryListButton
          key={ index }
          strCategory={ strCategory }
          onClick={ () => handleSelect(strCategory) }
        />
      ))}
      <main>
        <h3>Drinks:</h3>
        <section className="all-recipes">
          {data.map((drink, index) => (
            <Card
              cardTestId={ `${index}-recipe-card` }
              titleTestid={ `${index}-card-name` }
              imgTestId={ `${index}-card-img` }
              key={ index }
              link={ `/drinks/${drink.idDrink}` }
              recipeTitle={ drink.strDrink }
              strThumb={ drink.strDrinkThumb }
            />
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Drinks;
