import React, { useState } from "react";
import { isAuthenticate } from "../auth/helper";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  //creating name,error and success states

  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  //Destructring and getting info from isAuthenticated()

  const { user, token } = isAuthenticate();

  //creating a onChange Function

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  // Creating an on Submit Function Function

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    // using the /adminApiCall createCategory method

    createCategory(user._id, token, { name }).then((resp) => {
      if (resp.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    });
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category created successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-success">Failed to create category</h4>;
    }
  };

  //creating a form where user will enter the category info

  const categoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead">Enter the CategoryName</p>
          <input
            type="text"
            className="form-control my-3"
            onChange={handleChange}
            value={name}
            autoFocus
            required
            placeholder="For eg. Anime"
          />
          <button onClick={onSubmit} className="btn btn-outline-info">
            Create Category
          </button>
        </div>
      </form>
    );
  };

  // Creating a back button to redirect to admin panel from createCategory Page
  const goBack = () => {
    return (
      <div className="mt-5">
        <Link className="btn btn-sm btn-info mb-3 " to="/admin/admindashboard">
          Go to Admin Panel
        </Link>
      </div>
    );
  };

  return (
    <Base
      Title="Create Category here"
      description="Add a new category for T-shirt"
      className="container bg-success p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset md-2">
          {warningMessage()}
          {successMessage()}
          {categoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;