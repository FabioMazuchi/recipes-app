import React, { useEffect, useContext } from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import MyContext from '../MyContext/MyContext';

function ExploreFoodsNationalities() {
  const { store: { setPageTitle, setShowSearchIcon } } = useContext(MyContext);

  useEffect(() => {
    setPageTitle('Explore Nationalities');
    setShowSearchIcon(true);
  }, []);

  return (
    <>
      <Header />
      <h1>Página de ExploreFoodsNationalities</h1>
      <Footer />
    </>
  );
}

export default ExploreFoodsNationalities;
