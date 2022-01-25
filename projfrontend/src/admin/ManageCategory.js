import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticate } from "../auth/helper";
import Base from "../core/Base";
import { deleteCategory,  getAllCategory } from "./helper/adminapicall";

const ManageCategory = () => {

    const {user , token } = isAuthenticate()
  const [categorys, setCategorys] = useState([]);

  const preLoad = () => {
    getAllCategory().then((resp) => {
      if (resp.error) {
        console.log("error in getALlCategory preLoad");
      } else {
        setCategorys(resp);
      }
    });
  };

  const deleteCate = (cateID)=>{
      deleteCategory(cateID,user._id,token).then(resp=>(
          preLoad()
      ))
  }

  useEffect(() => {
    preLoad();
  }, []);

  return (
    <Base Title="Welcome admin" description="Manage Categories here">
      <h2 className="mb-4">All categories:</h2>
      <Link className="btn btn-info" to={`/admin/admindashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total {categorys.length}Category </h2>

          {categorys.map((cate,index) => (
            <div key={index} className="row text-center mb-2 ">
              <div className="col-4">
                <h3 className="text-white text-left">{cate.name}</h3>
              </div>
              <div className="col-4">
                <Link
                  className="btn btn-success"
                  to={`/admin/category/update/${cate._id}`}
                >
                  <span className="">Update</span>
                </Link>
              </div>
              <div className="col-4">
                <button onClick={() => {deleteCate(cate._id)}} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Base>
  );
};

export default ManageCategory;