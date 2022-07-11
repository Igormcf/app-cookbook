import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { surpriseMeD } from '../requisitions/recipesData';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../CSS/ExploreBtnsFood.css';

function ExploreDrinks() {
  const history = useHistory();
  const requisition = async () => {
    const data = await surpriseMeD();
    const { idDrink } = data[0];
    history.push(`/drinks/${idDrink}`);
  };
  return (
    <div>
      <header>
        <Header showIcon={ false } titleHeader="Explore Drinks" />
      </header>
      <main className='main-explore-btn-foods'>
        <button
          className="explore-btn-foods"
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => {
            history.push('/explore/drinks/ingredients');
          } }
        >
          By Ingredient
        </button>
        <button
          className="explore-btn-foods"
          type="button"
          data-testid="explore-surprise"
          onClick={ requisition }
        >
          Surprise me!
        </button>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default ExploreDrinks;
