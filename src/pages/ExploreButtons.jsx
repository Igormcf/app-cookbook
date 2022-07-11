import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import '../CSS/Explore.css';

function ExploreButtons() {
  const history = useHistory();
  return (
    <div className="container-explore-buttons">
      <div className='conatiner-explore-btn-foods'>
        <button
          className="explore-btn"
          type="button"
          data-testid="explore-foods"
          onClick={ () => {
            history.push('/explore/foods');
          } }
        >
          <h1 className='h1-food'>Explore Foods</h1>
        </button>
      </div>
      <div className='conatiner-explore-btn-drinks'>
        <button
          className="explore-btn"
          type="button"
          data-testid="explore-drinks"
          onClick={ () => {
            history.push('/explore/drinks');
          } }
        >
          <h1 className='h1-drink'>Explore Drinks</h1>
        </button>
      </div>
    </div>
  );
}

export default ExploreButtons;
