import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import Card from "../core/card";
import { loadProducts } from "../core/helper/cardhelper";
import StripeCheckOut from "../core/StripeCheckOut";

const Cart = () => {
  const [products, setProduct] = useState([]);
  const [force , setForce] = useState(false)

  useEffect(() => {
    console.log(products);
    setProduct(loadProducts());
  }, [force]);

  const cartProducts = () => (
    <div >
      <h2 >Products In Your Cart</h2>
      {products.map((prod, index) => (
        <Card
          key={index}
          product={prod}
          showAddtoCart={false}
          showRemovefromCart={true}
          setForce = {setForce}
          force = {force}
        ></Card>
      ))}
    </div>
  );

  return (
    <Base Title="Cart Page" description="Check your cart here">
      <div className="row text-center">
        <div className="row">
          <div className="col-6">{cartProducts()}</div>
          <div className="col-6"><StripeCheckOut products={products}/></div>
        </div>
      </div>
    </Base>
  );
};

export default Cart;