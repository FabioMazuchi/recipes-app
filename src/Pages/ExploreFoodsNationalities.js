import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import MyContext from '../MyContext/MyContext';
import { fetchFoodArea, fetchFoods } from '../Services';

function ExploreFoodsNationalities() {
  const {
    store: { setPageTitle, setShowSearchIcon, data, setData },
  } = useContext(MyContext);
  const [nacionalidades, setNacionalidades] = useState();
  const history = useHistory();

  const fetchInitFoods = async () => {
    const MAX_LENGTH = 12;
    const result = await (await fetchFoods('search.php?s='));
    setData(result.slice(0, MAX_LENGTH));
  };

  const fetchNacionalidade = async () => {
    const res = await fetchFoodArea();
    setNacionalidades(res);
    console.log(data);
  };

  useEffect(() => {
    setPageTitle('Explore Nationalities');
    setShowSearchIcon(true);
  }, []);

  useEffect(() => {
    fetchNacionalidade();
  }, []);

  useEffect(() => {
    fetchInitFoods();
  }, []);

  return (
    <>
      <Header />
      {nacionalidades !== undefined && (
        <form>
          <label htmlFor="nacionalidade">
            Filtrar por nacionalidade:
            <select
              data-testid="explore-by-nationality-dropdown"
              id="nacionalidade"
            >
              {nacionalidades.map(({ strArea }) => (
                <option data-testid={ `${strArea}-option` } key={ strArea }>
                  {strArea}
                </option>
              ))}
            </select>
          </label>
          <section className="all-recipes">
            {data.map(({ strMeal, idMeal, strMealThumb }, i) => (
              <div key={ i } className="card" data-testid={ `${i}-recipe-card` }>
                <button type="button" onClick={ () => history.push(`/foods/${idMeal}`) }>
                  <h4 data-testid={ `${i}-card-name` }>{ strMeal }</h4>
                  <img
                    src={ strMealThumb }
                    alt={ strMeal }
                    data-testid={ `${i}-card-img` }
                  />
                </button>
              </div>
            ))}
          </section>
        </form>
      )}
      <Footer />
    </>
  );
}

export default ExploreFoodsNationalities;
