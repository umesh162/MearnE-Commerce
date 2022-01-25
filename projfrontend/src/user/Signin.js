import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { authenticate, isAuthenticate, signin } from '../auth/helper'
import Base from '../core/Base'


const SignIn = ()=>{

   


    const [value,setValue]= useState({
        email : "",
        password : "",
        error : "",
        loading : false,
        didRedirect : false,
        
    })

const {email , password ,error, loading,didRedirect } = value  //destructuring
const {user} = isAuthenticate();


const handleChange = name => event=> {
    return setValue({... value , error : false , [name]:event.target.value})
}

const onSubmit =(event)=>{
    event.preventDefault();
    setValue({...value,error : false})
    
    signin({email,password})
    .then(data =>{
        if(data.error){
            setValue({...value,error:data.error,loading :false})
        }
        else{
            authenticate(data,()=>{
                setValue({
                    ...value,
                    didRedirect : true
                })
            })
        }}
    )
    .catch(error => console.log ("error in sigin.js"))
}


const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        <Redirect to='/admin/admindashboard'/>
      } else {
       <Redirect to ='/user/userdashboard'/>
      }
    }
    if (isAuthenticate()) {
      return <Redirect to="/" />;
    }
  };

    
    const signInForm = ()=>{
        return(
          <div className="row">
              <div className="col-md-6 offset-sm-3 text-left">
                <form>
                    <div className="form-group">
                        <label className="text-light"> E-Mail </label>
                        <input onChange={handleChange('email')} className="form-control" type="email" value = {email}/>
                    </div>
                    <div className="form-group">
                        <label className="text-light"> Password </label>
                        <input onChange = {handleChange('password')} className="form-control" type="password" value = {password}/>
                    </div>
                    <button onClick={onSubmit} className="btn btn-success btn-block">SignIn</button>

                   
    
                </form>
              </div>
          </div>
    
    
        )
    }
 const loadingMessage=()=>{
        
        return(
            loading && (
                <div className='alert alert-info'>
                    <h1>Loading...</h1>
                </div>
            )
        )

        
        }



    const errorMessage = ()=>{
        return(
            <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
      <div className="alert alert-danger" style = {{display:error?"":"none"}} >
         {error}
    
      </div>
      </div>
        </div>
        )
    }

    return(
    <Base Title='SignIn Page' description='SignIn into your Account'>
    
    {loadingMessage()}
    {errorMessage()}
    {signInForm()}
    {performRedirect()}
    </Base>
)}


export default SignIn