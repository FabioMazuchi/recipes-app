import React, { useEffect, useContext, useState } from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import MyContext from '../MyContext/MyContext';
import { fetchFoods } from '../Services';

function ExploreFoodsIngredients() {
  const {
    store: { setPageTitle, setShowSearchIcon },
  } = useContext(MyContext);
  const [ingredientes, setIngredientes] = useState([]);

  const requestIngredients = async () => {
    const res = await fetchFoods('list.php?i=list', 1);
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
      {ingredientes.map(({ strIngredient }, i) => (
        <div key={ i } data-testid={ `${i}-ingredient-card` }>
          <img
            data-testid={ `${i}-card-img` }
            alt={ strIngredient }
            src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
          />
          <p data-testid={ `${i}-card-name` }>{strIngredient}</p>
        </div>
      ))}
      <Footer />
    </>
  );
}

export default ExploreFoodsIngredients;
