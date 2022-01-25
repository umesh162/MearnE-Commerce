const express = require("express")
const router = express.Router()

const {getCategoryById,createCategory,getCategory,getAllCategory, updateCategory ,removeCategory} = require("../controllers/category")
const {isAdmin,isAuthenticated,isSignedin} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")

//params
router.param('userId',getUserById)
router.param('categoryId',getCategoryById)

//post routes
router.post("/category/create/:userId",isSignedin,isAuthenticated,isAdmin,createCategory)

//get routes
router.get("/category/:categoryId",getCategory)
router.get("/categories",getAllCategory)

//update routes
router.put("/category/:categoryId/:userId",isSignedin,isAuthenticated,isAdmin,updateCategory)


//delete routes

router.delete("/category/:categoryId/:userId",isSignedin,isAuthenticated,isAdmin,removeCategory)


module.exports = router