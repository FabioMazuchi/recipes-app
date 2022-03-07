import React, { useEffect, useContext } from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import MyContext from '../MyContext/MyContext';

function Explore() {
  const { store: { setPageTitle, setShowSearchIcon } } = useContext(MyContext);

  useEffect(() => {
    setPageTitle('Explore');
    setShowSearchIcon(true);
  }, []);

  return (
    <>
      <Header />
      <h1>Página de Explore</h1>
      <Footer />
    </>
  );
}

export default Explore;
