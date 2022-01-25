const Category = require("../models/category")



exports.getCategoryById = (req,res,next,id) =>{
    Category.findById(id).exec((err,cate)=>{
        if(err){
            return res.status(400).json({
                error : "Category not found in db"
            })
        }
        req.category = cate
        next()
    })
    
   
}

exports.createCategory = (req,res) => {
    const category = new Category(req.body)
    category.save((err,category) => {
        if(err){
            return res.status(400).json({
                error : "Category not saved in the Database"
            })
        }
        res.json({category})
    })
}

exports.getCategory = (req,res)=>{
    return res.json(req.category)
}

exports.getAllCategory = (req,res) => {
    Category.find().exec((err,item)=>{
        if(err){
            return res.status(400).json({
                error : "No Category found in the db"
            })
        }
        res.json(item)
    })

}

exports.updateCategory = (req,res) => {
    // const category = req.category   //this data is available from the middleware
    // category.name = req.body.name   //this req.body.name is being sent from the front end or postman
    const category = req.category;
    category.name = req.body.name;

    category.save((err,updatedCategory) =>{
        if(err)
        {
            return res.status(400).json({
                error : "Failed to update the Category"
            })
        }
        res.json(updatedCategory)
    })
}


exports.removeCategory = (req,res) =>{
    const category = req.category
    category.remove((err,category)=>{
        if(err){
            return res.status(400).json({
                error : "Unable to Delete the Category"
            })
        }
        res.json({
            message : `Successfully deleted the ${category} Category `
        })
    })
}