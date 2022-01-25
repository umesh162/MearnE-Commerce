export const addItemToCart = (item,next)=>{
    let cart = []

    if(typeof window !== undefined){
        if(localStorage.getItem('cart')){
           cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.push({...item ,
        count : 1})
        localStorage.setItem('cart',JSON.stringify(cart))
        next()
    }
}


export const loadProducts = ()=>{
    if(typeof window !== undefined){
        if(localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem('cart'))
        }
    }
}


export const removeItemFromCart = (productId)=>{
    let cart = []
    if(typeof window !== undefined){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }

        cart.map((prod,index)=>{
            if(prod._id === productId){
                cart.splice(index,1)
            }
        })
        localStorage.setItem('cart',JSON.stringify(cart))
    }
}