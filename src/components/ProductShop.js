import React, { useContext } from "react";
import "../styles/productshop.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Store } from "../Store";
import axios from "axios";

const ProductShop = ({ item }) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, wish } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === item._id);
    const quantity = existItem ? existItem.quantity + 1 : 1; //if exisItem than quantity +1 in cart if not than.

    //this you can put but you don't have to.
    const { data } = await axios.get(`/api/products/slug/${item.slug}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry! Product is out of stock!");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  const addToWishHandler = () => {
    const existItem = wish.wishItems.find((x) => x._id === item._id);
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
      payload: { ...item, quantity },
    });
  };

  return (
    <div className="ps-card">
      <div className="card-header">
        <Link to={`/product/${item.slug}`}>
          <img src={item.image} alt={item.title} />
        </Link>
      </div>
      <div className="card-body">
        <h3 className="title">{item.title}</h3>
        <span>${item.price}</span>
      </div>
      <div className="card-footer">
        <button>
          <FontAwesomeIcon icon={faHeart} onClick={addToWishHandler} />
        </button>
        {item.countInStock === 0 ? (
          <button className="cart cart-out" disabled>
            Out of Stock
          </button>
        ) : (
          <button>
            <FontAwesomeIcon icon={faShoppingBag} onClick={addToCartHandler} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductShop;
