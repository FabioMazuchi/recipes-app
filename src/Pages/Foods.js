import React, { useContext, useEffect } from 'react';
import Card from '../Components/Card';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import MyContext from '../MyContext/MyContext';

function Foods() {
  const { store: { data, setShowSearchIcon } } = useContext(MyContext);

  useEffect(() => {
    setShowSearchIcon(true);
  }, []);

  return (
    <>
      <Header />
      <main>
        <h3>Receitas:</h3>
        <section className="all-recipes">
          {data.map((food, index) => (
            <Card
              cardTestId={ `${index}-recipe-card` }
              titleTestid={ `${index}-card-name` }
              imgTestId={ `${index}-card-img` }
              key={ index }
              link={ `/foods/${food.idMeal}` }
              recipeTitle={ food.strMeal }
              strThumb={ food.strMealThumb }
            />
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Foods;
