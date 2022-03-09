import React, { useContext, useEffect, useState } from 'react';
import { fetchDrinkByCategory, fetchDrinkCategories } from '../Services';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Card from '../Components/Card';
import MyContext from '../MyContext/MyContext';

function Drinks() {
  const { store: { data,
    setShowSearchIcon, setData, setPageTitle } } = useContext(MyContext);
  const [drinkCategories, setDrinkCategories] = useState([]);

  const fetchInitDrinks = async () => {
    const result = await (await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')).json();
    result.drinks.length = 12;
    const resultCategories = await fetchDrinkCategories();
    setDrinkCategories(resultCategories);
    setData(result.drinks);
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
        <button
          key={ index }
          type="button"
          data-testid={ `${strCategory}-category-filter` }
          onClick={ async () => {
            const result = await fetchDrinkByCategory(strCategory);
            setData(result);
          } }
        >
          {strCategory}
        </button>
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
