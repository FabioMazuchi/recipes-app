import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import MyContext from '../MyContext/MyContext';

function Explore() {
  const { store: { setPageTitle, setShowSearchIcon } } = useContext(MyContext);

  useEffect(() => {
    setPageTitle('Explore');
    setShowSearchIcon(false);
  }, [setPageTitle, setShowSearchIcon]);

  return (
    <>
      <Header />
      <section className="explore">
        <Link to="/explore/foods" data-testid="explore-foods">Explore Foods</Link>
        <Link to="/explore/drinks" data-testid="explore-drinks">Explore Drinks</Link>
      </section>
      <Footer />
    </>
  );
}

export default Explore;
