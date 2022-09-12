import React, { useContext } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import '../styles/account.css';
import { Store } from '../Store';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Account = () => {

    const { state } = useContext(Store);
    const { userInfo } = state;

  return (
    <>
      <Navbar />
      <div className="account-container">
        <div className="account-row">
          <div className="account-col">
            <h2 className="account-title">Your Account</h2>
          </div>
        </div>
        <div className="account-row">
          <div className="account-col">
            <Link to="/profile">
              User Profile <FontAwesomeIcon icon={faChevronRight} />{" "}
            </Link>
            <Link to="/orderhistory">
              Order History <FontAwesomeIcon icon={faChevronRight} />{" "}
            </Link>
          </div>
          <div className="account-col">
            <img src="./images/users/user.png" alt="User" />
            <span className="name-user">{userInfo}</span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Account