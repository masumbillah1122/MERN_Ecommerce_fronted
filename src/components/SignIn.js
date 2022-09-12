import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/signin.css';
import axios from "axios";
import { Store } from './../Store';
import { toast } from 'react-toastify';
import { getError } from '../utlis';

const SignIn = () => {

  const navigate = useNavigate();

    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  
  const {userInfo} = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || '/');
    } catch (error) {
      toast.error(getError(error));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    };
  }, [navigate, redirect, userInfo]);
  
  return (
    <div className="signin-container">
      <div className="signin-row">
        <div className="signin-col">
          <form action="" onSubmit={submitHandler}>
            <h2>Sign In</h2>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Password</label>
              <input
                type="password"
                id="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button type="submit">Sign In</button>
            </div>
            <div className="form-group">
              <Link to={`/signup?redirect=${redirect}/`}>
                Create your account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn
