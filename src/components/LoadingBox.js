import React from 'react';
import '../styles/messagebox.css';
import Navbar from './Navbar';
import Footer from './Footer';

const LoadingBox = () => {
  return (
    <>
      <Navbar />
      <div className="message-container">
        <h2 className="messageloading">Loading...</h2>
      </div>
      <Footer />
    </>
  );
}

export default LoadingBox