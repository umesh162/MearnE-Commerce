import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticate } from "../auth/helper";
import Base from "../core/Base";
import { deleteProduct, getAllProducts } from "./helper/adminapicall";

const ManageProduct = () => {
  const { user, token } = isAuthenticate();
  const [products, setProducts] = useState([]);

  const preLoad = () => {
    getAllProducts().then((resp) => {
      if (resp.error) {
        console.log("error in preLoad manageProduct");
      } else {
        setProducts(resp);
      }
    });
  };

  useEffect(() => {
    preLoad();
  }, []);

  const delProd = (prodID) => {
    deleteProduct(prodID, user._id, token).then((resp) => {
      if (resp.error) {
        console.log("error in delProd", resp.error);
      } else {
        preLoad();
      }
    });
  };

  return (
    <Base Title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-info" to={`/admin/admindashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">
            Total {products.length} products
          </h2>

          {products.map((prod, index) => {
            return (
              <div key={index} className="row text-center mb-2 ">
                <div className="col-4">
                  <h3 className="text-white text-left">{prod.name}</h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success"
                    to={`/admin/product/update/${prod._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button
                    onClick={() => {
                      delProd(prod._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default ManageProduct;