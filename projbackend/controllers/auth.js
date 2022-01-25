const User = require('../models/user')

const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressjwt = require('express-jwt');




exports.signup =(req,res)=>{

const errors = validationResult(req);

if(!errors.isEmpty()){
  return res.status(422).json({
    error : errors.array()[0].msg
  })
}

const user = new User(req.body);
user.save((err,user)=>{
  if(err){
    return res.status(400).json({
      message : "bad request user not saved"
    })
  }
  res.json(user)
  
})
}

exports.signin = (req,res)=>{

  const {email , password} = req.body;
  
  const errors = validationResult(req);
  

  if (!errors.isEmpty()){
    return res.status(400).json({
      error : errors.array()[0].msg
    })
  }
//findone method of mongodb finds the first entry found in the db

  User.findOne({email},(err,user)=>{

    if(err || !user){
     return res.status(400).json({
        error :"email not found "
      })
    }

    //validating the password from the db using the authenticate schema defined in the model
      if(!user.authenticate(password)){
        return res.status(401).json({
          error : "email and password do not match"
        })
      }

    //creating the token using jwt

    const token  = jwt.sign({_id : user._id},process.env.SECRET)

    // Putting the token created above in the cookie
    res.cookie('token',token,{expire : new Date()+888})

    //destructring the data
    const {_id , name , email , role} = user

    // sending a response to the front end

    res.json({
      token,
      user : {
        _id,
        name,
        email,
        role
      }
    })


  })
}

exports.signout = (req, res) => {
  res.clearCookie("token"),
  res.json({
    message : "User signed out successfully"
  })
}


//custom middleware

exports.isSignedin =  expressjwt({
  secret : process.env.SECRET,
  userProperty : "auth"
})

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED"
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "You are not ADMIN, Access denied"
    });
  }
  next();
};