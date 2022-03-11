import React, { useEffect, useContext } from 'react';
import Header from '../Components/Header';
import MyContext from '../MyContext/MyContext';

function DoneRecipes() {
  const { store: { setPageTitle, setShowSearchIcon } } = useContext(MyContext);

  useEffect(() => {
    setPageTitle('Done Recipes');
    setShowSearchIcon(false);
  }, []);

  return (
    <>
      <Header />
      <h1>Página de DoneRecipes</h1>
    </>
  );
}

export default DoneRecipes;
