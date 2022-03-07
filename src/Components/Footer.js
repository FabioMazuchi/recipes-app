import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import foodsSVG from '../images/mealIcon.svg';
import exploreSVG from '../images/exploreIcon.svg';
import drinksSVG from '../images/drinkIcon.svg';
import MyContext from '../MyContext/MyContext';

function Footer() {
  const history = useHistory();
  const { store: { setShowSearchIcon, setPageTitle } } = useContext(MyContext);

  return (
    <footer
      data-testid="footer"
    >
      <button
        type="button"
        data-testid="drinks-bottom-btn"
        onClick={ () => {
          setShowSearchIcon(false);
          setPageTitle('Explore Drinks');
          history.push('/explore/drinks');
        } }
      >
        <img src={ drinksSVG } alt="drink-button" />
      </button>
      <button
        type="button"
        data-testid="explore-bottom-btn"
        onClick={ () => {
          setShowSearchIcon(false);
          setPageTitle('Explore');
          history.push('/explore');
        } }
      >
        <img src={ exploreSVG } alt="explore-button" />
      </button>
      <button
        type="button"
        data-testid="food-bottom-btn"
        onClick={ () => {
          setShowSearchIcon(false);
          setPageTitle('Explore Foods');
          history.push('/explore/foods');
        } }
      >
        <img src={ foodsSVG } alt="foods-button" />
      </button>
    </footer>
  );
}

export default Footer;
