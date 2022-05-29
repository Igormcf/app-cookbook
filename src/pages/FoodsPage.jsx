import React, { useContext } from 'react';
import Header from '../components/Header';
import ShowList from '../components/ShowList';
import Footer from '../components/Footer';
import Context from '../Context/Context';
import ShowIngreList from '../components/ShowIngreList';
import '../CSS/FoodsPage.css';

function Foods() {
  const { ingreOn } = useContext(Context);

  return (
    <body className='body-food-page'>
      <header>
        <Header showIcon titleHeader="Foods" className='header'/>
      </header>
      <main className='main-food-page'>
        { ingreOn ? <ShowIngreList /> : <ShowList titleHeader="Foods" /> }
      </main>
      <footer className='footer-food-page'>
        <Footer />
      </footer>
    </body>
  );
}

export default Foods;
