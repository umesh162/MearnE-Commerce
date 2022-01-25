import React from "react";
import Base from "../core/Base";
import { isAuthenticate } from "../auth/helper";
import { Link } from "react-router-dom";

const adminDashBoard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticate();

  const leftside = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
        <ul className="list-group">
      {/* to='' routes is yet to be defined */}
          <li className="list-group-item"><Link className='nav-link text-success' to='/admin/create/category'> Create Category</Link></li>   
          <li className="list-group-item"><Link className='nav-link text-success' to='/admin/manage/category'> Manage Category</Link></li>   
          <li className="list-group-item"><Link className='nav-link text-success' to='/admin/create/product'> Create Products</Link></li>
          <li className="list-group-item"><Link className='nav-link text-success' to='/admin/manage/product'> Manage Products</Link></li>
          <li className="list-group-item"><Link className='nav-link text-success' to='/admin/products'> Manage Orders</Link></li>
          
        </ul>
      </div>
    );
  };
  const rightside = () => {
    return(
<div className="card mb-4">
  <h4 className="card-header bg-dark text-white">Admin Information</h4>
  <ul className="list-group">
    <li className="list-group-item">
      <span className="badge badge-success mr-2  bg-dark">Name:</span>  {name}
    </li>
    <li className="list-group-item">
      <span className="badge badge-success mr-2  bg-dark">Email:</span>  {email}
    </li>
  </ul>
</div>
    )
  };

  return (
    <Base Title="This is AdminDashBoard" description="Admin Panel" className='container bg-success p-4'>
      <div className="row">
        <div className="col-3">{leftside()}</div>
        <div className="col-9"> {rightside()}</div>
      </div>
      
     
    </Base>
  );
};

export default adminDashBoard;