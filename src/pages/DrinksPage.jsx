import React from 'react';
import Header from '../components/Header';
import ShowList from '../components/ShowList';
import Footer from '../components/Footer';
import topo from '../images/topo.png';
import '../CSS/FoodsPage.css';

function DrinksPage() {
  return (
    <body className='body-food-page'>
      <header>
        <Header showIcon titleHeader="Drinks" className='header'/>
      </header>
      <main className='main-food-page'>
        <ShowList titleHeader="Drinks" />
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

export default DrinksPage;
