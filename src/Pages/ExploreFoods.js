import React, { useContext, useEffect } from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import MyContext from '../MyContext/MyContext';

function ExploreFoods() {
  const { store: { setPageTitle, setShowSearchIcon } } = useContext(MyContext);

  useEffect(() => {
    setPageTitle('Explore Foods');
    setShowSearchIcon(false);
  }, []);

  return (
    <>
      <Header />
      <h1>Página de ExploreFoods</h1>
      <Footer />
    </>
  );
}

export default ExploreFoods;
