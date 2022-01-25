var express = require("express");
var router = express.Router();

var {signout,signup,signin,isSignedin} = require('../controllers/auth')

const { check, validationResult } = require('express-validator');


router.post(
    "/signup",

    check('name').isLength({min : 3}).withMessage('name must be more than 3 char'),
    check('password').isLength({ min: 5}).withMessage('password must be at least 5 chars long'),
    check('email').isEmail().withMessage('An email address is required'),
    
    signup
  );
router.post
("/signin", 

check('email').isEmail().withMessage('An email is required '),
check('password').isLength({min : 3}).withMessage('password with min 3 chars required'),

signin)

router.get("/signout",isSignedin,signout );

router.get("/testroute",isSignedin, (req,res)=>{
  res.send("this is a protected route")
})

module.exports = router; 