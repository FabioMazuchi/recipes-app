import React, { useContext, useEffect, useState } from 'react';
import { fetchFoods } from '../Services';
import { MAX_LENGTH } from '../data';
import Card from '../Components/Card';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import MyContext from '../MyContext/MyContext';
import CategoryListButton from '../Components/CategoryListButton';

function Foods() {
  const { store: { data,
    setShowSearchIcon, setData, setPageTitle } } = useContext(MyContext);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const FIVE = 5;

  const fetchInitFoods = async () => {
    const result = await (await fetchFoods('search.php?s='));
    setData(result.slice(0, MAX_LENGTH));
  };

  const getCategories = async () => {
    const result = await fetchFoods('list.php?c=list');
    setCategoryList(result.slice(0, FIVE));
  };

  const handleSelect = async (strCategory) => {
    setSelectedCategory(strCategory);
    const validate = (
      selectedCategory === strCategory
      || strCategory === 'All'
    );
    if (validate) {
      fetchInitFoods();
      setSelectedCategory('');
    } else {
      const result = await fetchFoods(`filter.php?c=${strCategory}`);
      setData(result);
    }
  };

  useEffect(() => {
    setShowSearchIcon(true);
    setPageTitle('Foods');
    fetchInitFoods();
    getCategories();
  }, []);

  return (
    <>
      <Header />
      <div className="foodBotoes">
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => handleSelect('All') }
        >
          All
        </button>
        {categoryList.map(({ strCategory }, index) => (
          <CategoryListButton
            key={ index }
            strCategory={ strCategory }
            onClick={ () => handleSelect(strCategory) }
          />
        ))}
      </div>
      <main className="mainFood">
        <h3>Receitas</h3>
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
