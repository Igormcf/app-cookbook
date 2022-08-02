import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useHistory, Link } from 'react-router-dom';
import '../CSS/ProgressFood.css';
import ListFood from './ListFood';
import ShareIcon from '../images/shareIcon.png';
import WhiteHeartIcon from '../images/whiteHeartIcon.png';
import BlackHeartIcon from '../images/blackHeartIcon.png';
import Header from './Header';
import Footer from './Footer';
import Loading from './Loading';

import Context from '../Context/Context';

import { btnFavLocal, getLocalFav,
  deleteLocalFav, SetLocalDoneRecipes } from '../Helpers';

function ProgressFood() {
  const [foodDetail, setFoodDetail] = useState();
  const [foodProgress, setFoodProgress] = useState();
  const [copied, setCopied] = useState(false);
  const [favStatus, setFavStatus] = useState(false);

  const {
    setTotalIngre,
    finishBtnDisabled,
  } = useContext(Context);

  const history = useHistory();
  const { location } = history;
  const { pathname } = location;
  const id = pathname.split('/');

  const fetchFood = useCallback(async () => {
    const ids = window.location.pathname.split('/');
    const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ids[2]}`;
    const response = await fetch(URL);
    const data = await response.json();
    const { meals } = data;
    setFoodProgress(meals[0]);
    setFoodDetail(data);
  }, []);

  const foodItem = foodDetail ? foodDetail.meals[0] : [];
  console.log(foodItem);

  const list = {
    id: foodItem.idMeal,
    type: 'food',
    nationality: foodItem.strArea,
    category: foodItem.strCategory,
    alcoholicOrNot: '',
    name: foodItem.strMeal,
    image: foodItem.strMealThumb,
  };

  useEffect(() => {
    const ids = window.location.pathname.split('/');
    fetchFood();
    btnFavLocal(ids[2], setFavStatus);
  }, [fetchFood]);

  const renderIngredients = () => {
    const ingredient = Object.entries(foodProgress).filter(([key, values]) => key
      .includes('strIngredient')
      && typeof values === 'string' && values !== '' && values !== ' ');

    const measure = Object.entries(foodProgress).filter(([key, values]) => key
      .includes('strMeasure')
      && typeof values === 'string' && values !== '' && values !== ' ');

    const ingre = ingredient.map((a) => a.splice(1));

    const meas = measure.map((a) => a.splice(1));

    ingre.forEach((b, index) => {
      b.push(meas[index][0]);
    });

    setTotalIngre(ingre.length);

    const verificCheck = (param) => {
      const local = localStorage.getItem('inProgressRecipes');
      if (local) {
        return local.includes(param);
      }
    };

    return (
      ingre.map((value, index) => (
        <ListFood
          key={ value[0] }
          value={ value }
          index={ index }
          isChecked={ verificCheck(value[0]) }
        />))
    );
  };

  const copyFunc = (param) => {
    navigator.clipboard.writeText(param);
    setCopied(true);
  };

  const favButton = () => {
    setFavStatus(!favStatus);
    if (!favStatus) {
      getLocalFav(list);
      console.log('mandou pro local');
    } else {
      deleteLocalFav(id[2]);
      console.log('apagar do local');
    }
  };

  const doneLocal = () => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    today = `${mm}/${dd}/${yyyy}`;

    return {
      id: foodItem.idMeal,
      type: 'food',
      nationality: foodItem.strArea,
      category: foodItem.strCategory,
      alcoholicOrNot: '',
      name: foodItem.strMeal,
      image: foodItem.strMealThumb,
      doneDate: today,
      tags: foodItem.strTags,
    };
  };

  return (
    foodProgress ? (
      <>
        <Header titleHeader='In Progress'/>
        <main className='main-in-progress'>
          <section className='section-info-recipe-progress'>
            <div className='div-info-recipe-progress'>
              <img
                data-testid="recipe-photo"
                className="imgFood"
                src={ foodProgress.strMealThumb }
                alt="food"
              />

              <h1 data-testid="recipe-title">{foodProgress.strMeal}</h1>

              <div className='btn-recipe-progress'>
                <button
                  data-testid="share-btn"
                  type="button"
                  onClick={ () => { copyFunc(`http://localhost:3000/foods/${id[2]}`); } }
                >
                  <img src={ ShareIcon } alt="share-btn" />
                </button>

                <button
                  type="button"
                  onClick={ favButton }
                >
                  <img
                    data-testid="favorite-btn"
                    src={ favStatus ? BlackHeartIcon : WhiteHeartIcon }
                    alt="fav-icon"
                  />
                </button>
              </div>

              { copied ? <p>Link copied!</p> : undefined}

              <h3 data-testid="recipe-category">{foodProgress.strCategory}</h3>
            </div>

            <div className='div-ingredients-progress'>
              <h2>Ingredients</h2>

              <ul>
                {renderIngredients()}
              </ul>
            </div>
          </section>

          <div className='div-instructions-progress'>
            <h2>Instructions</h2>

            <p data-testid="instructions">
              {foodProgress.strInstructions}
            </p>
          </div>
          <Link to="/done-recipes">
            <button
              data-testid="finish-recipe-btn"
              type="button"
              disabled={ !finishBtnDisabled }
              onClick={ () => { SetLocalDoneRecipes(doneLocal()); } }
              className='finish-recipe-btn'
            >
              Finish Recipe
            </button>
          </Link>
        </main>
        <Footer/>
      </>
    ) : (<Loading />)
  );
}

export default ProgressFood;
