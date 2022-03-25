import React, { useEffect, useContext, useState } from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import MyContext from '../MyContext/MyContext';
import { fetchDrinks } from '../Services';

function ExploreDrinksIngredients() {
  const { store: { setPageTitle, setShowSearchIcon } } = useContext(MyContext);
  const [ingredientes, setIngredientes] = useState([]);

  const requestIngredients = async () => {
    const res = await fetchDrinks('list.php?i=list', 1);
    setIngredientes(res);
  };

  useEffect(() => {
    setPageTitle('Explore Ingredients');
    setShowSearchIcon(false);
  }, []);

  useEffect(() => {
    requestIngredients();
  }, []);

  return (
    <>
      <Header />
      <section className="exploreIngredient">
        {ingredientes.map((({ strIngredient1 }, i) => (
          <div key={ i } data-testid={ `${i}-ingredient-card` }>
            <h3 data-testid={ `${i}-card-name` }>{strIngredient1}</h3>
            <img
              data-testid={ `${i}-card-img` }
              alt={ strIngredient1 }
              src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
            />
          </div>
        )))}
      </section>
      <Footer />
    </>
  );
}

export default ExploreDrinksIngredients;
