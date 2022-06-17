import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../CSS/DetailFood.css';
import ShareIcon from '../images/shareIcon.png';
import WhiteHeartIcon from '../images/whiteHeartIcon.png';
import BlackHeartIcon from '../images/blackHeartIcon.png';
import Loading from '../components/Loading';
import Carousel from 'react-elastic-carousel';

import { renderIngredients,
  renderFootBtn, btnFavLocal, getLocalFav,
  deleteLocalFav, localDoneRecipes, localInProgress } from '../Helpers';

const breakPoints = [
  { width: 600, itemsToShow: 1 },
  { width: 768, itemsToShow: 2 },
  { width: 1024, itemsToShow: 3 }
];

function DetailFood() {
  const [foodDetail, setFoodDetail] = useState();
  const [recomFood, setRecomFood] = useState();
  const [done, setDone] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [copied, setCopied] = useState(false);
  const [favStatus, setFavStatus] = useState(false);

  const history = useHistory();
  const { location } = history;
  const { pathname } = location;
  const id = pathname.split('/');

  const foodItem = foodDetail ? foodDetail.meals[0] : [];

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
    (async () => {
      const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ids[2]}`;
      const response = await fetch(URL);
      const data = await response.json();
      setFoodDetail(data);
    })();
    console.log('use 1');
    btnFavLocal(ids[2], setFavStatus);
  }, []);

  useEffect(() => {
    const ids = window.location.pathname.split('/');
    (async () => {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const six = 6;
      const response = await fetch(url);
      const { drinks } = await response.json();
      const all = drinks.slice(0, six);
      setRecomFood(all);
    })();
    console.log('use 2');

    localDoneRecipes(ids[2], setDone);
    localInProgress(ids[2], setInProgress);
  }, []);


  const renderCarousel = () => {
    if (recomFood) {
      return (
        <Carousel breakPoints={ breakPoints }>
          { recomFood.map((a, index) => (
            <div
              className="divCarousel"
              key={ index }
              data-testid={ `${index}-recomendation-card` }
            >
              <img className="imgCarousel" src={ a.strDrinkThumb } alt={ a.strDrink } />
              <p>{ a.strCategory }</p>
              <h4
                data-testid={ `${index}-recomendation-title` }
              >
                { a.strDrink }
              </h4>
            </div>
          )) }
        </Carousel>
      );
    }
  };

  const renderVideo = (param) => {
    const url = param.replace('watch', 'embed').replace('?v=', '/')
      .replace('youtube', 'youtube-nocookie');
    return (
      <iframe
        src={ url }
        title="video"
        data-testid="video"
      />
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

  return (
    <body className='body-detailFood'>
      {foodDetail
        ? ( // true
          <div className='container-detailFood'>
            <main className='main-detailFood'>
              <section className="section-info-recipe">
                <div className="conatiner-img-recipe">
                  <img
                    data-testid="recipe-photo"
                    className="imgFood"
                    src={ foodItem.strMealThumb }
                    alt="food"
                  />

                  <h1 data-testid="recipe-title">{foodItem.strMeal}</h1>

                  <div className="container-btn-detail">
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
                </div>
                <div className="container-list-ingredients">
                  <h3 data-testid="recipe-category">{foodItem.strCategory}</h3>

                  <h4>Ingredients</h4>

                  <ul>
                    {renderIngredients(foodItem)}
                  </ul>
                </div>

              </section>
              <section className='section-intructions'>
                <h2>instructions</h2>
                <p data-testid="instructions">
                  {foodItem.strInstructions}
                </p>
              </section>

              {renderVideo(foodItem.strYoutube)}

              {renderCarousel()}

            </main>
            <footer className='footer-detailFood'>
              { renderFootBtn(done, id[2], inProgress, 'foods') }
            </footer>
          </div>
        ) : (
          <Loading />
        )}
    </body>
  );
}

export default DetailFood;
