import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import MyContext from '../MyContext/MyContext';

function ExploreDrinks() {
  const { store: { setPageTitle, setShowSearchIcon } } = useContext(MyContext);

  useEffect(() => {
    setPageTitle('Explore Drinks');
    setShowSearchIcon(false);
  }, []);

  return (
    <>
      <Header />
      <nav>
        <Link
          to="/explore/drinks/ingredients"
          data-testid="explore-by-ingredient"
        >
          By Ingredient
        </Link>
        <Link
          to="/explore/foods/nationalities"
          data-testid="explore-surprise"
        >
          Surprise me!
        </Link>
      </nav>
      <Footer />
    </>
  );
}

export default ExploreDrinks;
