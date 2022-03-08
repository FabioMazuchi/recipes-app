import React from 'react';
// import { useHistory } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
// import MyContext from '../MyContext/MyContext';

function Footer() {
  // const history = useHistory();
  // const { store: { setShowSearchIcon, setPageTitle } } = useContext(MyContext);

  return (
    <footer data-testid="footer">
      <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drink-button" />
      <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="explore-button" />
      <img data-testid="food-bottom-btn" src={ mealIcon } alt="foods-button" />
    </footer>
  );
}

export default Footer;
