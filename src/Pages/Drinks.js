import React, { useContext, useEffect } from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Card from '../Components/Card';
import MyContext from '../MyContext/MyContext';

function Drinks() {
  const { store: { data, setShowSearchIcon, setPageTitle } } = useContext(MyContext);

  useEffect(() => {
    setShowSearchIcon(true);
    setPageTitle('Drinks');
  }, []);

  return (
    <>
      <Header />
      <main>
        <h3>Drinks:</h3>
        <section className="all-recipes">
          {data.map((drink, index) => (
            <Card
              cardTestId={ `${index}-recipe-card` }
              titleTestid={ `${index}-card-name` }
              imgTestId={ `${index}-card-img` }
              key={ index }
              link={ `/drinks/${drink.idDrink}` }
              recipeTitle={ drink.strDrink }
              strThumb={ drink.strDrinkThumb }
            />
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Drinks;
