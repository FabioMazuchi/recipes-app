import React, { useEffect, useContext } from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import MyContext from '../MyContext/MyContext';

function FavoriteRecipes() {
  const { store: { setPageTitle, setShowSearchIcon } } = useContext(MyContext);

  useEffect(() => {
    setPageTitle('Favorite Recipes');
    setShowSearchIcon(false);
  }, []);

  return (
    <>
      <Header />
      <h1>Página de FavoriteRecipes</h1>
      <Footer />
    </>
  );
}

export default FavoriteRecipes;
