const express = require("express")
const router = express.Router()

const { getProductById , createProduct,getProduct,photo,deleteProduct,updateProduct,getAllProducts,getAllUniqueCategories} = require("../controllers/product")
const{isSignedin,isAuthenticated,isAdmin} = require("../controllers/auth")
const{getUserById} = require("../controllers/user")
const{} = require("../controllers/category")


//Params 
router.param("userId",getUserById)
router.param("productId",getProductById)

//create product route
router.post("/product/create/:userId",isSignedin,isAuthenticated,isAdmin,createProduct)

//get product route
router.get("/product/:productId",getProduct)   //photo is made undefined
router.get("/product/photo/:productId",photo)   //will return the photo of the product

//delete route
router.delete("/product/:productId/:userId",isSignedin,isAuthenticated,isAdmin,deleteProduct)

//update Route
router.put("/product/:productId/:userId",isSignedin,isAuthenticated,isAdmin,updateProduct)

//listing routes

router.get('/products',getAllProducts)

router.get('/products/categories',getAllUniqueCategories)

module.exports = router;