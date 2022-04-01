import React, { useEffect, useContext, useState } from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import MyContext from '../MyContext/MyContext';
import { fetchFoods } from '../Services';

function ExploreFoodsIngredients() {
  const {
    store: { setPageTitle, setShowSearchIcon },
  } = useContext(MyContext);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    setPageTitle('Explore Ingredients');
    setShowSearchIcon(false);
  }, [setPageTitle, setShowSearchIcon]);

  useEffect(() => {
    const setIngredientsEffect = async () => {
      const res = await fetchFoods('list.php?i=list');
      setIngredients(res);
    };
    setIngredientsEffect();
  }, []);

  return (
    <>
      <Header />
      <section className="exploreIngredient">
        {ingredients.map(({ strIngredient }, i) => (
          <div key={ i } data-testid={ `${i}-ingredient-card` }>
            <h3 data-testid={ `${i}-card-name` }>{strIngredient}</h3>
            <img
              data-testid={ `${i}-card-img` }
              alt={ strIngredient }
              src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
            />
          </div>
        ))}
      </section>
      <Footer />
    </>
  );
}

export default ExploreFoodsIngredients;
