import React, { useContext, useEffect, useReducer } from 'react'
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import Navbar from './Navbar';
import Footer from './Footer';
import '../styles/orderdetails.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Store } from '../Store';
import { getError } from '../utlis';
import axios from 'axios';

function reducer(state, action) {
  switch (action.type) {
    case "CREATE_REQUEST":
      return { ...state, loading: true };
    case "CREATE_SUCCESS":
      return { ...state, orders:action.payload, loading: false };
    case "CREATE_FAIL":
      return { ...state, loading: false, error: action.payload};

    default:
      return state;
  }
};

const OrderDetails = () => {

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    const params = useParams();
    const {id:orderId} = params;
    const navigate = useNavigate();

    const [{ loading, error, order }, dispatch] = useReducer(reducer, {
        loading: true,
        order: {},
        error: '',
    });

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/orders/${orderId}`, { headers: { authorization: `Bearer ${userInfo.token}` }, });
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
        }
        if (!userInfo) {
            return navigate('/login');
        }
        if (!order._id || (order._id && order._id !== order._id)) {
            fetchOrder();
        }
    }, [order, userInfo, orderId, navigate]);

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox>{error}</MessageBox>
  ) : (
    <>
      <Navbar />
      <div className="order-details-container">
        <div className="order-details-row">
          <div className="order-details-col">
            <h2 className="order-details-title">Your Order</h2>
            <h4 className="order-details-subtiltle">Order ID: {orderId}</h4>
          </div>
        </div>
        <div className="order-row">
          <div className="order-col">
            <div className="order-shipping">
              <h4 className="order-shipping-title">Shipping</h4>
              <p className="order-shipping-info">
                {order.shippingAddress.fullName},{order.shippingAddress.address}
                ,{order.shippingAddress.postalCode},{order.shippingAddress.city}
                ,{order.shippingAddress.country}{" "}
              </p>
              {order.isPaid ? (
                <span>Paid at {order.deliveredAt}</span>
              ) : (
                <span>
                  Not Delivery 
                </span>
              )}
            </div>
            <div className="order-payment">
              <h4>Payment:</h4>
              <span>{order.paymentMethod}- </span>
              {order.isPaid ? (
                <span>Paid at {order.paidAt}</span>
              ) : (
                <span>
                  Not Paid <br />
                  <span className="after">* You will pay after delivery</span>
                </span>
              )}
            </div>
            <div className="order-items">
              <h4 className="order-items-title">Items:</h4>
              <div className="order-cards">
                {order.orderItems.map((item) => (
                  <div className="order-card">
                    <div className="order-card-body">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="order-card-footer">
                      <span>{item.quantity}</span>
                      <span>${item.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="order-col">
            <h2 className="order-summary">Order Summary</h2>
            <div className="order-summary-info">
              <h4>Items</h4>
              <span>${order.itemsPrice.toFixed(2)}</span>
            </div>
            <div className="order-summary-info">
              <h4>Shipping</h4>
              <span>${order.shippingPrice.toFixed(2)}</span>
            </div>
            <div className="order-summary-info">
              <h4>Tax</h4>
              <span>${order.taxPrice.toFixed(2)}</span>
            </div>
            <div className="order-summary-info">
              <h4>Total</h4>
              <span>${order.totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default OrderDetails
