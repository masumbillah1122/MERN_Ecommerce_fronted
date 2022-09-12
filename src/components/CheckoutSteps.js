import React from 'react';
import '../styles/checkoutsteps.css';

const CheckoutSteps = (props) => {
  return (
    <div className="checkout-steps">
      <p className={props.step1 ? "active" : ""}>Sign-In</p>
      <p className={props.step2 ? "active" : ""}>Shipping</p>
      <p className={props.step3 ? "active" : ""}>Payment</p>
      <p className={props.step4 ? "active" : ""}>Palce Order</p>
    </div>
  );
};

export default CheckoutSteps