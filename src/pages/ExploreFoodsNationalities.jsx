import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../CSS/ExploreNationalities.css';
import topo from '../images/topo.png';

function ExploreFoodsNationalities() {
  // bloco do dropdown
  const [nationalities, setNationalities] = useState();

  const getNationalities = async () => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
    const response = await fetch(URL);
    const { meals } = await response.json();

    setNationalities(meals);
  };

  useEffect(() => {
    getNationalities();
  }, []);
  // bloco do dropdown

  const [recipes, setRecipes] = useState();

  const getRecipes = async ({ target }) => {
    if (target.value === 'All') {
      console.log(target.value);
      const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const cardLimit = 12;
      const response = await fetch(URL);
      const { meals } = await response.json();
      const meals12 = meals.slice(0, cardLimit);

      setRecipes(meals12);
      return;
    }
    const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${target.value}`;

    const cardLimit = 12;
    const response = await fetch(URL);
    const { meals } = await response.json();
    const meals12 = meals.slice(0, cardLimit);
    console.log(meals12);
    setRecipes(meals12);
    console.log(recipes);
  };

  const getRecipesAll = async () => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const cardLimit = 12;
    const response = await fetch(URL);
    const { meals } = await response.json();
    const meals12 = meals.slice(0, cardLimit);

    setRecipes(meals12);
  };

  useEffect(() => {
    getRecipesAll();
  }, []);

  return (
    <div className='div-body'>
      <header>
        <Header showIcon titleHeader="Explore Nationalities" />
      </header>
      <nav className='nav-nationalities'>
        <select
          className='select-nationalities'
          data-testid="explore-by-nationality-dropdown"
          defaultValue="All"
          onChange={ getRecipes }
        >
          <option value="All" data-testid="All-option">All</option>
          { nationalities ? (
            nationalities.map((nationality, index) => (
              <option
                value={ nationality.strArea }
                key={ index }
                data-testid={ `${nationality.strArea}-option` }

              >

                { nationality.strArea }

              </option>
            ))
          ) : undefined }
        </select>
      </nav>
      <main className='main-nationalities'>
        { recipes ? (
          recipes.map((recipe, index) => (
            <div className='div-card' key={ recipe.idMeal }>
              <Link
                to={ `/foods/${recipe.idMeal}` }
                key={ recipe.idMeal }
              >
                <img
                  className='img-recipe'
                  src={ recipe.strMealThumb }
                  alt={ recipe.strMeal }
                  data-testid={ `${index}-card-img` }
                />
                <div className='div-p'>
                  <p data-testid={ `${index}-card-name` }>{ recipe.strMeal }</p>
                </div>
              </Link>
            </div>
          ))
        ) : undefined }
      </main>
      <section className='section-a'>
        <a href='#container-header'>
          <img src={ topo } alt='seta para cima' className='seta-img'/>
        </a>
      </section>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default ExploreFoodsNationalities;
