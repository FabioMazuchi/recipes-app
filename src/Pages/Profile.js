import React, { useEffect, useContext } from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import MyContext from '../MyContext/MyContext';

function Profile() {
  const { store: { setPageTitle, setShowSearchIcon } } = useContext(MyContext);

  useEffect(() => {
    setPageTitle('Profile');
    setShowSearchIcon(false);
  }, []);

  return (
    <>
      <Header />
      <h1>Página de Profile</h1>
      <Footer />
    </>
  );
}

export default Profile;
