import React, { useEffect, useContext, useState } from 'react';
import DoneRecipeCard from '../Components/DoneRecipeCard';
import Header from '../Components/Header';
import MyContext from '../MyContext/MyContext';

function DoneRecipes() {
  const { store: { setPageTitle, setShowSearchIcon } } = useContext(MyContext);
  const [doneRecipes, setDoneRecipes] = useState([]);
  // const [showFoods, setshowFoods] = useState(false);
  // const [showDrinks, setShowDrinks] = useState(false);
  const buttons = ['All', 'Food', 'Drink'];

  const handleClick = () => {
    console.log('xablau');
  };

  console.log(doneRecipes);

  useEffect(() => {
    setPageTitle('Done Recipes');
    setShowSearchIcon(false);
  }, []);

  useEffect(() => {
    const getDoneRecipesEffect = () => {
      const res = JSON.parse(localStorage.getItem('doneRecipes'));
      if (res !== null) {
        setDoneRecipes(res);
      }
    };
    getDoneRecipesEffect();
  }, []);

  return (
    <>
      <Header />
      {buttons.map((button) => (
        <button
          type="button"
          key={ button }
          onClick={ handleClick }
          data-testid={ `filter-by-${button.toLowerCase()}-btn` }
        >
          {button}
        </button>
      ))}
      {doneRecipes.map(({ alcoholicOrNot,
        category, doneDate, id, image, name, nationality, tags, type }, index) => (
        (<DoneRecipeCard
          key={ index }
          index={ index }
          alcoholicOrNot={ alcoholicOrNot }
          category={ category }
          doneDate={ doneDate }
          id={ id }
          image={ image }
          name={ name }
          nationality={ nationality }
          tags={ tags }
          type={ type }
        />)
      ))}
    </>
  );
}

export default DoneRecipes;
