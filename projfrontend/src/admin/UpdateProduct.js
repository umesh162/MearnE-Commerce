import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { isAuthenticate } from "../auth/helper";
import Base from "../core/Base";
import {
  getAllCategory,
  getProduct,
  updateCategory,
  updateProduct,
} from "./helper/adminapicall";

const UpdateProduct = ({ match }) => {
  const { user, token } = isAuthenticate();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: false,
    getaRedirect: "",
    formData: "",
  });
  //destructring

  const {
    name,
    description,
    price,
    stock,
    photo,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formData,
  } = values;

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    //pID,uID,token,updatedValue
    setValues({ error: "", createdProduct: false });
    updateProduct(match.params.productID, user._id, token, formData).then(
      (resp) => {
        if (resp.error) {
          setValues({ error: resp.error, createdProduct: false });
        } else {
          setValues({ error: false, createdProduct: resp.name });
        }
      }
    );
  };

  const preLoad = (pID) => {
    getProduct(pID).then((resp) => {
      if (resp.error) {
        setValues({ ...values, error: resp.error });
      } else {
        preLoadCategory();
        setValues({
          ...values,
          name: resp.name,
          description: resp.description,
          price: resp.price,
          category: resp.category._id,
          stock: resp.stock,
          formData: new FormData(),
        });
      }
    });
  };

  const preLoadCategory = () => {
    getAllCategory().then((resp) => {
      setValues({ categories: resp, formData: new FormData() });
    });
  };
  useEffect(() => {
    preLoad(match.params.productID);
  }, []);

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h4>{createdProduct} updated successfully</h4>
    </div>
  );

  const errorMesaage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: error ? "" : "none" }}
    >
      <h4> Product Updated successfully</h4>
    </div>
  );

  const history = useHistory();
  const preformRedirect = () => {
    if (createdProduct) {
      setTimeout(() => {
        history.push("/admin/manage/product");
      }, 2000);
    }
  };

  const goBack = () => {
    return (
      <div className="mt-5">
        <Link className="btn btn-sm btn-info mb-3 " to="/admin/admindashboard">
          Go to Admin Panel
        </Link>
      </div>
    );
  };

  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("quantity")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success"
      >
        Update Product
      </button>
    </form>
  );

  return (
    <Base Title="Update Products" description="Update product info here">
      {goBack()}
      {errorMesaage()}
      {successMessage()}
      {createProductForm()}
      {preformRedirect()}
    </Base>
  );
};

export default UpdateProduct;