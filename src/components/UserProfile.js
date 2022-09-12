import React, { useContext, useReducer, useState } from 'react';
import '../styles/userprofile.css';
import Footer from './Footer';
import Navbar from './Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { getError } from '../utlis';
import axios from 'axios';


function reducer(state, action) {
  switch (action.type) {
    case "CREATE_REQUEST":
      return { ...state, loading: true };
    case "CREATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "CREATE_FAIL":
          return { ...state, loadingUpdate: false };

    default:
      return state;
  }
};


const UserProfile = () => {

    //  const navigate = useNavigate();
     const { state, dispatch: ctxDispatch } = useContext(Store);

    const { userInfo } = state;

     const [name, setName] = useState(userInfo);
     const [email, setEmail] = useState(userInfo);
     const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
      loadingUpdate: false,
    });
    
    const submitHandler = async (e) => { 
        e.preventDefault();
        // put our new data when i write in inputs
        try {
            const { data } = await axios.put("/api/users/profile", {
              name,
              email,
              password,
            }, {
                headers: {Authorization: `Bearer ${userInfo.token}`},
            });
            dispatch({ type: "UPDATE_SUCCESS", });
            ctxDispatch({ type: 'USER_SIGNIN', payload: data });
            localStorage.setItem("userInfo", JSON.stringify(data));// set user to localstorage -> save
            toast.success('User updated successfully');//message for success
        } catch (error) {
            dispatch({ type: 'FETCH_FAIL', });
            toast.error(getError(error));// for error message
        }
    }

  return (
    <>
      <Navbar />
      <div className="signin-container">
        <div className="signin-row">
          <div className="signin-col">
            <form action="" onSubmit={submitHandler}>
              <h2>User Profile</h2>
              <div className="form-group">
                <label htmlFor="email">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="c_password">Confirm Password</label>
                <input
                  type="password"
                  id="c_password"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <button type="submit">Update</button>
              </div>
              <div className="account-back">
                <Link to="/account">
                  {" "}
                  <FontAwesomeIcon icon={faChevronLeft} /> Back to Account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserProfile
