import React, { useContext } from 'react';
import '../styles/navbar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faHeart, faShoppingBag, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from 'react-router-dom';
import { Store } from '../Store';


const Navbar = () => {

  const { state, dispatch:ctxDispatch } = useContext(Store);
  const { cart, wish, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = '/signin';
  }


  return (
    <div className="n-container">
      <div className="n-row">
        <div className="n-col">
          <span className="n-email">m@gmail.com</span>
          {userInfo ? (
            <Link to="/account">
              <FontAwesomeIcon icon={faUser} />
              {userInfo.name}
            </Link>
          ) : (
            <span>
              <FontAwesomeIcon icon={faUser} /> Guest
            </span>
          )}
        </div>
        <div className="n-col">
          <div className="socials">
            <a href="/">
              <img src="/images/socials/facebook.png" alt="" />
            </a>
            <a href="/">
              <img src="/images/socials/instagram.png" alt="" />
            </a>
            <a href="/">
              <img src="/images/socials/twitter.png" alt="" />
            </a>
            <a href="/">
              <img src="/images/socials/youtube.png" alt="" />
            </a>
          </div>
        </div>
      </div>
      <div className="n-row">
        <div className="n-col">
          <a href="/">
            <img src="/images/logo/logo.png" className="logo" alt="" />
          </a>
        </div>
        <div className="n-col">
          <div className="icons">
            {userInfo ? (
              <Link to="#signout" onClick={signoutHandler}>
                <span>
                  <FontAwesomeIcon icon={faArrowRightToBracket} />
                  LogOut
                </span>
              </Link>
            ) : (
              <a href="/login">
                <span>
                  <FontAwesomeIcon icon={faArrowRightToBracket} />
                  Login
                </span>
              </a>
            )}
            <a href="wish">
              <span>
                <FontAwesomeIcon icon={faHeart} />
                {wish.wishItems.length > 0 && (
                  <span className="totalItems">{wish.wishItems.length}</span>
                )}
              </span>
            </a>
            <a href="cart">
              <span>
                <FontAwesomeIcon icon={faShoppingBag} />
                {cart.cartItems.length > 0 && (
                  <span className="totalItems">
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </span>
                )}
              </span>
            </a>
          </div>
        </div>
      </div>
      <div className="n-row">
        <nav className="nav">
          <ul className="items">
            <li className="list">
              <NavLink to="/" activeClassName="active">
                Home
              </NavLink>
            </li>
            <li className="list">
              <NavLink to="/shop" activeClassName="active">
                Shop
              </NavLink>
            </li>
            <li className="list">
              <NavLink to="/about" activeClassName="active">
                About
              </NavLink>
            </li>
            <li className="list">
              <NavLink to="/contact" activeClassName="active">
                Contact
              </NavLink>
            </li>
          </ul>
          <button className="btn">BTN</button>
        </nav>
      </div>
    </div>
  );
}

export default Navbar
