import React, { useEffect, useContext } from 'react';
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
      <h1>Página de ExploreDrinks</h1>
      <Footer />
    </>
  );
}

export default ExploreDrinks;
