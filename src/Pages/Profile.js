import React, { useEffect, useContext } from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import MyContext from '../MyContext/MyContext';

function Profile() {
  const { store: { setPageTitle, setShowSearchIcon } } = useContext(MyContext);

  const { email } = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    setPageTitle('Profile');
    setShowSearchIcon(false);
  }, []);

  return (
    <>
      <Header />

      <h2 data-testid="profile-email">{ email }</h2>

      <button
        data-testid="profile-done-btn"
        type="button"
      >
        Done Recipes
      </button>

      <button
        data-testid="profile-favorite-btn"
        type="button"
      >
        Favorite Recipes
      </button>

      <button
        data-testid="profile-logout-btn"
        type="button"
      >
        Logout
      </button>

      <Footer />
    </>
  );
}

export default Profile;
