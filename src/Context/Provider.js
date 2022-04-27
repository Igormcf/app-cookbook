import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [list, setListFood] = useState('');
<<<<<<< HEAD
=======
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
>>>>>>> fe4a331ef5106a78723f253a80288b103a799cff

  const getIngredienteAPIFood = async (ingredient) => {
    const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;

    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    return data;
  };

  const getNameAPIFood = async (name) => {
    const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;

    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    return data;
  };

  const getFirtLetterAPIFood = async (firstL) => {
    const URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstL}`;

    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    return data;
  };

  const getIngredienteAPIDrink = async (ingredient) => {
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;

    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    return data;
  };

  const getNameAPIDrink = async (name) => {
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;

    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    return data;
  };

  const getFirtLetterAPIDrink = async (firstL) => {
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstL}`;

    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    return data;
  };

  const contextValue = {
    getIngredienteAPIFood,
    getNameAPIFood,
    getFirtLetterAPIFood,
    list,
    setListFood,
    getIngredienteAPIDrink,
    getNameAPIDrink,
    getFirtLetterAPIDrink,
<<<<<<< HEAD
=======
    email,
    setEmail,
    password,
    setPassword,
>>>>>>> fe4a331ef5106a78723f253a80288b103a799cff
  };

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Provider;
