import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticate } from "../auth/helper";
import { loadProducts, removeItemFromCart } from "./helper/cardhelper";
import StripeCheckOutBtn from "react-stripe-checkout";
import { API } from "../backend";

const StripeCheckOut = ({
  products,
  reload = undefined,
  setReload = (p) => p,
}) => {
  const finalAmount = () => {
    let amount = 0;
    products.map((a) => (amount = amount + a.price));
    return amount;
  };

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };
    return fetch(`${API}/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => console.log(err));
  };

  const showPaymentButton = () => {
    return isAuthenticate() ? (
      <StripeCheckOutBtn
        stripeKey={process.env.REACT_APP_SECRETKEY}
        token={makePayment}
        currency="inr"
        amount={finalAmount() * 100}
      >
        <button className="btn btn-success">paywith stripe</button>
      </StripeCheckOutBtn>
    ) : (
      <Link to="/signin">
        <button>SignIN</button>{" "}
      </Link>
    );
  };
  return (
    <div>
      <h1>Total Amount </h1>
      <h2>{finalAmount()}</h2>

      {showPaymentButton()}
    </div>
  );
};

export default StripeCheckOut;