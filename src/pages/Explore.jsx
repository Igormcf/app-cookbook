import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreButtons from './ExploreButtons';
import '../CSS/Explore.css';

function Explore() {
  return (
    <body className='body-explore'>
      <header className='header-explore'>
        <Header showIcon={ false } titleHeader="Explore" />
      </header>
      <main className="main-explore">
        <ExploreButtons />
      </main>
      <footer className='footer-explore'>
        <Footer />
      </footer>
    </body>
  );
}

export default Explore;
