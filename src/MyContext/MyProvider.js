import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [data, setData] = useState([]);
  const [showSearchIcon, setShowSearchIcon] = useState(true);
  const [pageTitle, setPageTitle] = useState('Foods');
  const [favoritedArray, setFavoritedArray] = useState([]);

  const store = {
    data,
    setData,
    showSearchIcon,
    setShowSearchIcon,
    pageTitle,
    setPageTitle,
    favoritedArray,
    setFavoritedArray,
  };
  return (
    <main>
      <MyContext.Provider value={ { store } }>
        {children}
      </MyContext.Provider>
    </main>
  );
}

MyProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MyProvider;
