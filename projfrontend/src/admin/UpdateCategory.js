import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { isAuthenticate } from "../auth/helper";
import Base from "../core/Base";
import { getCategory, updateCategory, updateProduct } from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
  const { user, token } = isAuthenticate();

  const [error,setError] = useState(false)
  const[productCreated,setProductCreated] = useState(false)
  const [name, setName] = useState("");

  const preLoad = (cateID) => {
    getCategory(cateID).then((resp) => {
      if (resp.error) {
       console.log('error in response',resp.error)
       setError(true)
       setProductCreated(false)
      } else{
        setError(false)
        setName(resp.name);
      } 
    });
  };


  useEffect(() => {
    preLoad(match.params.categoryID);
  }, []);


  const onSubmit = (event) => {
    event.preventDefault();
    setProductCreated(false)
    updateCategory(match.params.categoryID,user._id,token,{name}).then(resp =>{
      if(resp.error){
        console.log('error in updateCategory',resp.error)
      }
      setProductCreated(true)
    })
  
  };
 
  const handleChange = (event) => {
    setName(event.target.value);
  };

  const successMessage = () => {
    if (productCreated) {
      return <h4 className="text-success">Category Updated successfully</h4>;
    }
  };

  const history = useHistory()

  const successRedirect = ()=>{
    if(productCreated){
     setTimeout(()=>{
      history.push('/admin/manage/category')
     },2000)
    }
  }


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
            Update Category
          </button>
        </div>
      </form>
    );
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

  return <Base Title = 'Update Category' description='Update category info here'>
  {goBack()}
  {successMessage()}
  {categoryForm()}
  {successRedirect()}
  </Base>;
};

export default UpdateCategory;