import React, { useContext } from 'react';
import Header from '../components/Header';
import ShowList from '../components/ShowList';
import Footer from '../components/Footer';
import Context from '../Context/Context';
import ShowIngreList from '../components/ShowIngreList';
import topo from '../images/topo.png';
import { Link } from 'react-router-dom';
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
      <section className='section-a'>
        <a href='#container-header'>
          <img src={ topo } alt='seta para cima' className='seta-img'/>
        </a>
      </section>
      <footer className='footer-food-page'>
        <Footer />
      </footer>
    </body>
  );
}

export default Foods;
