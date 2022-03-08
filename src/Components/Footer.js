import React from 'react';
import { Link } from 'react-router-dom';
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
      <Link to="/drinks">
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drink-button"
        />
      </Link>
      <Link to="/explore">
        <img
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="explore-button"
        />
      </Link>
      <Link to="/foods">
        <img
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="foods-button"
        />
      </Link>
    </footer>
  );
}

export default Footer;
