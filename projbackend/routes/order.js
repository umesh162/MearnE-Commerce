const express = require("express")
const router = express.Router()

const{isSignedin,isAuthenticated,isAdmin} = require("../controllers/auth")
const{getUserById,pushOrderInPurchaseList} = require("../controllers/user")
const{updateStock} = require("../controllers/product")
const{getOrderById,createOrder,getAllOrder,getOrderStatus,updateStatus} = require('../controllers/order')


//param 

router.param("orderId",getOrderById)

//post Route

router.post("/order/create/:userId",isSignedin,isAuthenticated,pushOrderInPurchaseList,updateStock,createOrder)

//GET Route

router.get("/order/all/:userId",isSignedin,isAuthenticated,isAdmin,getAllOrder)


//Order Status route

router.get('/order/status/:userId',isSignedin,isAuthenticated,isAdmin,getOrderStatus)

router.put('/order/:orderId/status/:userId',isSignedin,isAuthenticated,isAdmin,updateStatus)


module.exports = router