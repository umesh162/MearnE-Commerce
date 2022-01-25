import React, { useEffect, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { isAuthenticate } from "../auth/helper";
import Base from "../core/Base";
import { createProduct, getAllCategory } from "./helper/adminapicall";

const AddProduct = () => {
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

  const preload = () => {
    getAllCategory().then((data) => {
      if (data.err) {
        setValues({ ...values, error: data.err });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };


  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true});
    createProduct(user._id, token, formData).then((resp) => {
      console.log(formData)
      if (resp.err) {
        setValues({ ...values, error: resp.error, createdProduct: false });
      } else {
        setValues({
          ...values,
          success: true,
          name: "",
          description: "",
          price: "",
          photo: "",
          stock: "",
          error: "",
          loading: false,
          createdProduct: resp.name,
          getaRedirect: true,
        });
      }
    });
  };
  const history = useHistory();
  const PerformRedirect = () => {
    if (createdProduct) {
      if (getaRedirect) {
        setTimeout(() => history.push("/admin/admindashboard"), 2000);
        console.log("redirect");
      }
    }
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h4>{createdProduct} created successfully</h4>
    </div>
  );

  const errorMesaage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: error ? "" : "none" }}
    >
      <h4> not created successfully</h4>
    </div>
  );

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
          onChange={handleChange("stock")}
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
        Create Product
      </button>
    </form>
  );

  return (
    <Base Title='Create Produts here' description='Add the Prodduct information'>
      {goBack()}
      {successMessage()}
      {errorMesaage()}
      {createProductForm()}
      {PerformRedirect()}
      <Link to="/admin/admindashboard" className="btn btn-outline-success mb-3">
        Go to Admin Panel
      </Link>
    </Base>
  );
};

export default AddProduct;