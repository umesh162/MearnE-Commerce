const  stripe  = require("stripe")('sk_test_51IVvZ7E0KPQj3Ps4cb1ezjGp6DYEiR3DWEbkJ53BGe1h1DiD1aPkVvfG9swRWfhsr06wEitIn2C9cGqYDRSdq0wH00lcx6bAJC')
const uuid = require('uuid/v4')

exports.stripePayment = (req,res)=>{
    const{products,token} = req.body

    let amount = 0
    products.map((p)=>
    amount = amount+p.price
    )

    const impodencyKey = uuid()

    return stripe.customers.create({
        email: token.email,
        source : token.id
    }).then(customer =>{
        stripe.charges.create({
            amount : amount * 100,
            currency : 'inr',
            customer : customer.id,
            receipt_email : token.mail
        },{idempotencyKey: impodencyKey})
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err));

    })
    
  
}
