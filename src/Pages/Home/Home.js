import React from 'react';
import Header from '../../Component/Header';
import './home.css';
import HomeForm from './HomeForm';
import NetflixReel from './NetflixReel';
import AboutUs from './AboutUs/AboutUs';
function Home() {
  return (
    <div
      style={{ backgroundColor: 'black' }}
      className="fluid myCustomHeight fullPage"
    >
      <Header />
      <HomeForm />
      <div></div>
      <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />{' '}
      <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />{' '}
      <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />{' '}
      <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
      <br /> <br />
      <AboutUs />
      <br /> <br />
      <NetflixReel />
    </div>
  );
}

export default Home;
