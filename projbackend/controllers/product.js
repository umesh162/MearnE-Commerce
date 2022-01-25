const Product = require("../models/product")
const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")
const { sortBy } = require("lodash")
const { bulkWrite } = require("../models/product")
    

exports.getProductById = (req,res,next,id) =>{
    Product.findById(id).exec((err,product)=>{
        if(err){
            return res.status(400).json({
                error : "Product not found by ID"
            })
        }
        req.product = product
        next()
    })
}

exports.createProduct = (req,res) =>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req,(err,feilds,files)=>{
        if(err){
            return res.status(400).json({
                error : "Error in Parsing the data"
            })
        }


        const{name,description,price,category,stock} = feilds
        if(!name || 
           !description ||
           !price ||
           !category ||
           !stock) {
               return res.status(400).json({
                   error : "enter all the feilds required"
               })
           }

        let product = new Product(feilds)

        //handling the files and checking its size

        if(files.photo){
            if(files.photo.size>3000000){
                return res.status(400).json({
                    error : "filee size too big cannot upload"
                })
            }
            // Validation and  restriction 


            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        //saving into the database
        product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    error : "product not saved into the database"
                })
            }
            res.json(product)
        })
    })
}

exports.getProduct = (req,res) => {
    req.product.photo = undefined;
    return res.json(req.product)
}


//middleware for photos

exports.photo = (req,res,next) =>{
    if(req.product.photo.data){
        res.set("Content-Type",req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }

    next()
}

exports.deleteProduct = (req,res) => {
    let product = req.product

    product.remove((err,removedProduct)=>{
        if(err){
            return res.status(400).json({
                error : "product not deleted successfully"
            })
        }
        res.json({
            message : "product deleted",
            removedProduct
        })
    })
}

exports.updateProduct = (req,res) =>{
    let form = formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req,(err,feilds,files)=>{

        if(err){
            return res.status(400).json({
                error : "Form data not parsed"
            })
        }

//updation of value
        let product = req.product
        product = _.extend(product,feilds)

//handling the file

        if(files.photo){
            if(files.photo.size>300000){           
                return res.status(400).json({
                    error : "size of the image too big"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }

//saving in the database

        product.save((err,savedProduct)=>{
            if(err){
                return res.status(400).json({
                    error : "Product not updated in the database successfully"
                })
            }
            res.json(savedProduct)
            
        })
    })
}


exports.getAllProducts = (req,res)=>{
    let limit = req.query.limit ? parseInt(req.query.limit) : 8
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"
    Product.find()
    .select("-photo")
    .limit(limit)
    .populate("category")
    .sort([[sortBy,"asc"]])
    .exec((err,allProducts)=>{
        if(err){
            return res.status(400).json({
                error : "Unable to get all Products"
            })
        }
        res.json(allProducts)
    })
}

//Bulkwrite MiddeWare

exports.updateStock =(req,res,next)=>{

    let MyOperation = req.body.order.products.map(prod =>{
        return {
            updateOne : {
                filter : {_id : prod._id},                                            //filter:finds by id
                update : {$inc :{stock : -prod.count,sold : +prod.count}}            //update: updates the variable

            }
        }
    })
//bulkwrite(operations,options,callback)

    Product.bulkWrite(MyOperation,{},(err,Bproduct)=>{
        if(err){
            return res.status(400).json({
                error : "Error in Bulk operation"
            })
        }
        next()
    })   
}

exports.getAllUniqueCategories = (req,res) => {
    Product.distinct("category",{},(err,category)=>{
        if(err){
            return res.status(400).json({
                error : "Error in finding distinct category"
            })
        }
        res.json(category)
    })
}