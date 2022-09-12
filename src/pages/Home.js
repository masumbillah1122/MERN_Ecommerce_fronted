import React from 'react'
import Banner from '../components/Banner';
import CategoryMain from '../components/CategoryMain';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import ProductsHome from '../components/ProductsHome';
import Slider from '../components/Slider';
import Navbar from './../components/Navbar';

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Slider />
      <Banner />
      <CategoryMain />
      <ProductsHome />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Home
