import React, { useContext, useEffect, useState } from 'react';
// import React, { useContext } from 'react';
import { fetchFoodCategories, fetchFoodByCategory } from '../Services';
import Card from '../Components/Card';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import MyContext from '../MyContext/MyContext';
import CategoryListButton from '../Components/CategoryListButton';

function Foods() {
  const { store: { data,
    setShowSearchIcon, setData, setPageTitle } } = useContext(MyContext);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchInitFoods = async () => {
    const result = await (await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')).json();
    result.meals.length = 12;
    const categories = await fetchFoodCategories();
    setCategoryList(categories);
    setData(result.meals);
  };

  const handleSelect = async (strCategory) => {
    setSelectedCategory(strCategory);
    const validate = (
      selectedCategory === strCategory
    );
    if (validate) {
      fetchInitFoods();
      setSelectedCategory('');
    } else {
      const result = await fetchFoodByCategory(strCategory);
      setData(result);
    }
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
        <CategoryListButton
          key={ index }
          strCategory={ strCategory }
          onClick={ () => handleSelect(strCategory) }
        />
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
