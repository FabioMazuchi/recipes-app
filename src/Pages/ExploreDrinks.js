import React, { useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import { fetchDrinks } from '../Services';
import MyContext from '../MyContext/MyContext';

function ExploreDrinks() {
  const { store: { setPageTitle, setShowSearchIcon } } = useContext(MyContext);
  const history = useHistory();

  const redirectDrinkdAleatorio = async () => {
    const res = await fetchDrinks('random.php', 1);
    const { idDrink } = res[0];
    history.push(`/drinks/${idDrink}`);
  };

  useEffect(() => {
    setPageTitle('Explore Drinks');
    setShowSearchIcon(false);
  }, [setPageTitle, setShowSearchIcon]);

  return (
    <>
      <Header />
      <nav className="explore">
        <Link
          to="/explore/drinks/ingredients"
          data-testid="explore-by-ingredient"
        >
          By Ingredient
        </Link>
        <button
          className="surpriseMe"
          onClick={ () => redirectDrinkdAleatorio() }
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

export default ExploreDrinks;
