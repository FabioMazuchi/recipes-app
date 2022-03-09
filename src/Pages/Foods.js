import React, { useContext, useEffect, useState } from 'react';
// import React, { useContext } from 'react';
import { fetchFoodCategories, fetchFoodByCategory } from '../Services';
import Card from '../Components/Card';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import MyContext from '../MyContext/MyContext';

function Foods() {
  const { store: { data,
    setShowSearchIcon, setData, setPageTitle } } = useContext(MyContext);
  const [categoryList, setCategoryList] = useState([]);

  const fetchInitFoods = async () => {
    const result = await (await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')).json();
    result.meals.length = 12;
    const categoryResult = await fetchFoodCategories();
    setCategoryList(categoryResult);
    setData(result.meals);
  };

  useEffect(() => {
    setShowSearchIcon(true);
    setPageTitle('Foods');
    fetchInitFoods();
  }, []);

  return (
    <>
      <Header />
      {categoryList.map(({ strCategory }, index) => (
        <button
          type="button"
          key={ index }
          data-testid={ `${strCategory}-category-filter` }
          onClick={ async () => {
            const result = await fetchFoodByCategory(strCategory);
            setData(result);
          } }
        >
          {strCategory}
        </button>
      ))}
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
