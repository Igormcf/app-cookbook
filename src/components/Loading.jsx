import React from 'react';
import '../CSS/Loading.css';
import burger from '../images/burger.png';
import drink from '../images/drink.png';
import massa from '../images/massa.png';

function Loading() {
  return (
    <body className='body-loading'>
      <div className='loading'>
        <div className='squares'>
          <div className='square-1'>
            <img src={ burger } alt='Hamburguer' className='img-loading'/>
          </div>
          <div className='square-2'>
            <img src={ massa } alt='Espaguete' className='img-loading'/>
          </div>
          <div className='square-3'>
            <img src={ drink } alt='Drink' className='img-loading'/>
          </div>
        </div>
      </div>
    </body>
  );
}

export default Loading;