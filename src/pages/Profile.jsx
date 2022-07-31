import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../CSS/Profile.css';
import checkIcon from '../images/checkIcon.svg';
import favIcon from '../images/favIcon.svg';
import logoutIcon from '../images/logoutIcon.png';

function Profile() {
  const [getEmail, setEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user === null) {
      localStorage.setItem('user', JSON.stringify({}));
    } else {
      setEmail(JSON.parse(user));
    }
  }, []);

  function handleClick() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <>
      <Header showIcon={ false } titleHeader="Profile" className="header-profile"/>
      <main className='main-profile'>
        <div className='div-email-profile'>
          <h2
            data-testid="profile-email"
            className="email"
          >
            { getEmail.email }
          </h2>
        </div>
        <Link
            to="/done-recipes"
          >
            <button
              className="done-btn"
              type="button"
              data-testid="profile-done-btn"
            >
              Done Recipes
              <img
                className="check-icon"
                src={ checkIcon }
                alt="checkIcon"
              />
            </button>
          </Link>
          
          <Link
            to="/favorite-recipes"
          >
            <button
              className="fav-btn"
              type="button"
              data-testid="profile-favorite-btn"
            >
              Favorite Recipes
              <img
                className="fav-icon"
                src={ favIcon }
                alt="favIcon"
              />
            </button>
          </Link>
  
        <div className='div-logout-btn'>
          <img
            src={ logoutIcon }
            alt="logoutIcon"
            onClick={ handleClick }
            className='logout-btn'
          />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Profile;
