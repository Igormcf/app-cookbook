import React from 'react';
import DrinkIcon from '../images/drinkIcon.png';
import ExploreIcon from '../images/exploreIcon.png';
import MealIcon from '../images/mealIcon.png';
import '../CSS/Footer.css';

function Footer() {
  return (
    <footer className="container-footer" data-testid="footer">
      <a href="/drinks">
        <img
          className="footer-icon"
          data-testid="drinks-bottom-btn"
          src={ DrinkIcon }
          alt="DrinkIcon"
        />
      </a>
      <a href="/explore">
        <img
          className="footer-icon"
          data-testid="explore-bottom-btn"
          src={ ExploreIcon }
          alt="EXploreIcon"
        />
      </a>
      <a href="/foods">
        <img
          className="footer-icon"
          data-testid="food-bottom-btn"
          src={ MealIcon }
          alt="MealIcon"
        />
      </a>

    </footer>
  );
}

export default Footer;
