import React from 'react';
import "../styles/newsletter.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Newsletter = () => {
  return (
    <div className="news-container">
      <div className="news-row">
        <div className="news-col">
          <h2 className="news-title">Newsletter</h2>
          <p className="news-desc">
            Get timely updates from your favorite products.
          </p>
          <div className="input-container">
            <input type="text" placeholder="Enter your e-mail" />
                      <button><FontAwesomeIcon icon={faPaperPlane } /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Newsletter
