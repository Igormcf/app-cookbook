import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ShareIcon from '../images/shareIcon.png';
import notFood from '../images/notFood.svg';
import '../CSS/DoneFavoriteRecipes.css';

function ShowDoneRecipes() {
  const [copied, setCopied] = useState(false);
  const [all, setAll] = useState();

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('doneRecipes'));
    setAll(local);
  }, []);

  const renderLocalDone = () => {
    const copyFunc = (param) => {
      navigator.clipboard.writeText(param);
      setCopied(true);
    };

    return all.map((item, index) => {
      const renderTags = () => {
        if (item.tags) {
          let { tags } = item;
          tags += '';
          const eachTag = tags.split(',');

          return (
            eachTag.map((a) => (
              <h4
                data-testid={ `${index}-${a}-horizontal-tag` }
                key={ a }
              >
                { a }
              </h4>
            ))
          );
        }
      };

      return (
        <div key={ item.name } className="done">
          <div className="div-donefavorite-recipe">
            <Link to={ `/${item.type}s/${item.id}` }>
              <img
                className="imgFood"
                src={ item.image }
                alt={ item.name }
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>

            <div className='info-donefavorite-recipes'>
              <h4
                data-testid={ `${index}-horizontal-top-text` }
              >
                { `${item.nationality} - ${item.category}` }
              </h4>

              { item.alcoholicOrNot ? (
                <h5
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { item.alcoholicOrNot }
                </h5>
              ) : undefined }

              <h4
                data-testid={ `${index}-horizontal-name` }
              >
                <Link to={ `/${item.type}s/${item.id}` }>
                  { item.name }
                </Link>
              </h4>

              <h4
                data-testid={ `${index}-horizontal-done-date` }
              >
                { `Done in: ${item.doneDate}` }
              </h4>
              <div className='btn-recipe-progress'>
                <button
                  type="button"
                  onClick={ () => { copyFunc(`http://localhost:3000/foods/${item.id}`); } }
                >
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ ShareIcon }
                    alt="share-btn"
                  />
                </button>
              </div>

              { copied ? <p>Link copied!</p> : undefined}

              { renderTags() }
            </div>
          </div>
        </div>
      );
    });
  };

  const foodBtn = () => {
    const local = JSON.parse(localStorage.getItem('doneRecipes'));
    const food = local.filter((a) => a.type === 'food');
    setAll(food);
  };

  const drinkBtn = () => {
    const local = JSON.parse(localStorage.getItem('doneRecipes'));
    const drink = local.filter((a) => a.type === 'drink');
    setAll(drink);
  };

  return (
    <>
    { all ? (
      <main className='main-doneFavorite-recipes'>
        <section className='section-btns'>
          <button
            className='btn-categories'
            data-testid="filter-by-all-btn"
            type="button"
            onClick={ () => {
              setAll(JSON.parse(localStorage.getItem('doneRecipes')));
            } }
          >
            All
          </button>

          <button
            className='btn-categories'
            data-testid="filter-by-food-btn"
            type="button"
            onClick={ foodBtn }
          >
            Food
          </button>

          <button
            className='btn-categories'
            data-testid="filter-by-drink-btn"
            type="button"
            onClick={ drinkBtn }
          >
            Drinks
          </button>
        </section>

        <section className='div-cards'>
          { renderLocalDone() }
        </section>
      </main>
    ) : <main className='main-notfood'>
      <img src={ notFood } alt='Imagem de mulher olhando um celular'/>
    </main> }
    </>
  );
}

export default ShowDoneRecipes;
