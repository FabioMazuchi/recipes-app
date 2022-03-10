import React, { useContext, useEffect, useState } from 'react';
import { fetchDrinkByCategory, fetchDrinkCategories } from '../Services';
// import { fetchDrinkByCategory } from '../Services';

import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Card from '../Components/Card';
import MyContext from '../MyContext/MyContext';
import CategoryListButton from '../Components/CategoryListButton';

function Drinks() {
  const { store: { data,
    setShowSearchIcon, setData, setPageTitle } } = useContext(MyContext);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  // const drinkCategories = [
  //   { strCategory: 'All' },
  //   { strCategory: 'Ordinary Drink' },
  //   { strCategory: 'Cocktail' },
  //   { strCategory: 'Shake' },
  //   { strCategory: 'Other/Unknown' },
  //   { strCategory: 'Cocoa' },
  // ];

  const fetchInitDrinks = async () => {
    const result = await (await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')).json();
    result.drinks.length = 12;
    const resultCategories = await fetchDrinkCategories();
    // resultCategories.unshift({ strCategory: 'All' });
    setDrinkCategories(resultCategories);
    setData(result.drinks);
  };

  const handleSelect = async (strCategory) => {
    console.log(strCategory);
    setSelectedCategory(strCategory);
    const validate = (
      selectedCategory === strCategory
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
  }, []);

  return (
    <>
      <Header />
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
