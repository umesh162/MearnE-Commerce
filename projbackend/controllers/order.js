const { Order, ProductCart } = require("../models/order")

exports.getOrderById = (req,res,next,id) =>{
    Order.findById(id)
    .populate("products.product","name price")
    .exec((err,order)=>{
        if(err){
            return res.status(400).json({
                error : "Error in Getting OrderById param"
            })
        }
        req.Order = order
        next()
    })
}

exports.createOrder = (req,res)=> {
    
    req.body.order.user = req.profile
    const order = new Order(req.body.order)

    order.save((err,savedOrder)=>{
        if(err){
            return res.status(400).json({
                error : "Order Not Created Successfully"
            })
        }
        res.json(savedOrder)
    })

}

exports.getAllOrder =(req,res)=>{
    Order.find()
    .populate("user","_id name")
    .exec((err,allorder)=>{
        if(err)
        {
            return res.status(400).json({
                error : "No Orders Found in DB"
            })
        }
        res.json(allorder)
    })


}


exports.getOrderStatus = (req,res) =>{
    res.json(Order.schema.path("status").enumValues)
}

exports.updateStatus = (req,res) =>{
    Order.update(
        {_id : req.body.orderId},  //data from front end
        {$set : {status : req.body.status}},  //what to update
        (err,order)=>{
            if(err){
                return res.status(400).json({
                    error : "Error in Updating the order Status"
                })
            }
            res.json(order)
        }
    )
}