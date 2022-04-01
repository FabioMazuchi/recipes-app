import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import MyContext from '../MyContext/MyContext';

function Profile() {
  const { store: { setPageTitle, setShowSearchIcon } } = useContext(MyContext);
  const history = useHistory();
  const [email, setEmail] = useState();

  const getEmail = () => {
    const res = JSON.parse(localStorage.getItem('user'));
    if (res !== null) {
      setEmail(res.email);
    }
  };

  useEffect(() => {
    setPageTitle('Profile');
    setShowSearchIcon(false);
  }, [setPageTitle, setShowSearchIcon]);

  useEffect(() => {
    getEmail();
  }, []);

  return (
    <>
      <Header />
      <section className="explore">
        <h2 data-testid="profile-email">{ email }</h2>
        <button
          data-testid="profile-done-btn"
          type="button"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ () => {
            localStorage.clear();
            history.push('/');
          } }
        >
          Logout
        </button>
      </section>
      <Footer />
    </>
  );
}

export default Profile;
