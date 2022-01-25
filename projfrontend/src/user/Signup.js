import React, { useState } from 'react'
import { signup } from '../auth/helper'
import Base from '../core/Base'

const Signup = ()=>{

const [value,setvalue] = useState({
    name : "",
    email : "",
    password : "",
    error : "",
    success : false
})

const {name,email,password,error,success} = value

const handleChange = name=>event=>{

    setvalue({...value,error:false,[name]:event.target.value})     //eg if handleChange('email) is passed then ['email]:event.target.value here the email feild will have the value which triggered the event 
}

const onSubmit = event => {
    event.preventDefault();
    setvalue({...value,error:false})
    signup({name,email,password})
    .then(data => {
        if(data.error){
            setvalue({...value,error : data.error,success : false})
        }
        else {
            setvalue({
                name : "",                          //resetting the input feilds to empty
                email : "",
                password : "",
                error : "",
                success : true
            })
        }
    })
    .catch(console.log('error in signUp.js'))
}


const signUpForm = ()=>{
    return(
      <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
            <form>
                <div className="form-group">
                    <label className="text-light"> Name </label>
                    <input onChange ={handleChange('name')} className="form-control" type="text" value={name}/>
                </div>
                <div className="form-group">
                    <label className="text-light"> E-Mail </label>
                    <input  onChange ={handleChange('email')} className="form-control" type="email" value={email}/>
                </div>
                <div className="form-group">
                    <label className="text-light"> Password </label>
                    <input onChange ={handleChange('password')}  className="form-control" type="password" value ={password}/>
                </div>
                <button onClick={onSubmit} className="btn btn-success btn-block">SignUp</button>

            </form>
          </div>
      </div>


    )
}
const successPopUp = ()=>{
    return(
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
    <div className="alert alert-success" style = {{display:success?"":"none"}}>
        New Account created successfully!
    </div>
    </div>
    </div>
    )
    
    
}

const errorPopup = ()=>{
    return (
        <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
    <div className="alert alert-danger" style={{display:error?"":"none"}}>
       {error}
    </div>
    </div>
    </div>)
}

return(
<Base Title="SignUp Page" description="SignUp to create an Account">
    {successPopUp()}
    {errorPopup()}
    {signUpForm()}

</Base>)
}

export default Signup