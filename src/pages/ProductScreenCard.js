import React, { useContext, useState } from 'react';
import '../styles/productScreenCard.css';
import Navbar from './../components/Navbar';
import Footer from './../components/Footer';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Store } from '../Store';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductScreenCard = ({ product }) => {
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(""); //default is empty.

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, wish } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1; //if exisItem than quantity +1 in cart if not than.

    //this you can put but you don't have to.
    const { data } = await axios.get(`/api/products/slug/${product.slug}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry! Product is out of stock!");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
    navigate("/cart");
  };


  const addToWishHandler = () => {
     const existItem = wish.wishItems.find((x) => x._id === product._id);
     const quantity = existItem ? existItem.quantity : 1;
     // const { data } = await axios.get(`/api/products/slug/${product.slug}`);
     if (existItem) {
       window.alert(
         "Sorry! You have already added the product to your wish list!"
       );
       return;
     }
    ctxDispatch({
      type: "WISH_ADD_ITEM",
      payload: { ...product, quantity },
    });
    navigate("/wish");
  };

  return (
    <>
      <Navbar />
      <div className="screen-container">
        <div className="screen-row">
          <div className="screen-col">
            <div className="screen-images">
              <div className="screen-top">
                <TransformWrapper>
                  <TransformComponent>
                    <img
                      src={selectedImage || product.image}
                      alt={product.title}
                    />
                  </TransformComponent>
                </TransformWrapper>
              </div>
              <div className="screen-bottom">
                <img
                  src={product.image}
                  onClick={() => setSelectedImage(`${product.image}`)}
                  alt={product.title}
                />
                <img
                  src={product.image1}
                  onClick={() => setSelectedImage(`${product.image1}`)}
                  alt={product.title}
                />
                <img
                  src={product.image2}
                  onClick={() => setSelectedImage(`${product.image2}`)}
                  alt={product.title}
                />
                <img
                  src={product.image3}
                  onClick={() => setSelectedImage(`${product.image3}`)}
                  alt={product.title}
                />
              </div>
            </div>
          </div>
          <div className="screen-col">
            <div className="first-div div">
              <h2 className="title">{product.title}</h2>
              <p className="category">{product.category}</p>
            </div>
            <div className="second-div div">
              <span className="price">Price: ${product.price}</span>
              <div className="quantity">Quantity:1</div>
            </div>
            <div className="third-div div">
              <p className="desc">{product.desc}</p>
            </div>
            <div className="fourth-div div">
              {product.countInStock === 0 ? (
                <button className="cart cart-out" disabled>
                  Out of Stock
                </button>
              ) : (
                <button className="cart" onClick={addToCartHandler}>
                  Add to Cart
                </button>
              )}
              <button className="wish" onClick={addToWishHandler}>
                Add to Wish
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductScreenCard