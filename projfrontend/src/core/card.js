import React, { useState } from "react";
import { Redirect } from "react-router";
import { addItemToCart, removeItemFromCart } from "./helper/cardhelper";
import ImageHelper from "./ImageHelper";

const Card = ({
  showAddtoCart = true,
  showRemovefromCart = false,
  product,
  setForce = f => f,
  force = undefined
}) => {
  const cardName = product ? product.name : "Default Card name";
  const cardDescription = product ? product.description : "Default description";
  const cardPrice = product ? product.price : "Default Price";

  const[reload,setReload] = useState(false)
  

  const addProdToCart = ()=>{
    addItemToCart(product,()=>
      setReload(true)
      
    )
  }


      
 
  const performReload = (r)=>{
    if(r){
   return<Redirect to='/cart'/>
    }
  }

  const addtoCart = (value) => {
    return (
      value && (
        <button
          onClick={addProdToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };



  const removeCart = (value) => {
    return (
      value && (
        <button
          onClick={()=>{
            removeItemFromCart(product._id)
            setForce(!force)
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{cardName}</div>
      <div className="card-body">
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap text-center">
          {cardDescription}
        </p>
        {performReload(reload)}
        <p className="btn btn-success rounded  btn-sm px-4">₹ {cardPrice}</p>
        <div className="row">
          <div className="col-12">{addtoCart(showAddtoCart)}</div>
          <div className="col-12">{removeCart(showRemovefromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;