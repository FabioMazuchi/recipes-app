import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import MyContext from '../MyContext/MyContext';
import { fetchFoods } from '../Services';

function ExploreFoods() {
  const {
    store: { setPageTitle, setShowSearchIcon },
  } = useContext(MyContext);
  const history = useHistory();

  const redirectFoodAleatorio = async () => {
    const res = await fetchFoods('random.php', 1);
    const { idMeal } = res[0];
    history.push(`/foods/${idMeal}`);
  };

  useEffect(() => {
    setPageTitle('Explore Foods');
    setShowSearchIcon(false);
  }, [setPageTitle, setShowSearchIcon]);

  return (
    <>
      <Header />
      <nav className="explore">
        <Link
          to="/explore/foods/ingredients"
          data-testid="explore-by-ingredient"
        >
          By Ingredient
        </Link>
        <Link
          to="/explore/foods/nationalities"
          data-testid="explore-by-nationality"
        >
          By Nationality
        </Link>
        <button
          className="surpriseMe"
          onClick={ () => redirectFoodAleatorio() }
          type="button"
          data-testid="explore-surprise"
        >
          Surprise me!
        </button>
      </nav>
      <Footer />
    </>
  );
}

export default ExploreFoods;
