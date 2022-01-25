import { API } from "../../backend"

export const createOrder = (userId,token,OrderData)=>{
    return fetch(`${API}/order/create/${userId}`,{
        method : "POST",
        headers:{
            Accept : 'application/json',
            "Content-Type" : 'application/json',
            Authorization : `Bearer ${token}`
        },
        body : JSON.stringify(OrderData)
        
    })
    .then(resp =>{
        if(resp.error){
            console.log('error in createOrder API call')
        }
        else{
            return resp.json()
        }
    })
    .catch(err=> console.log(err))
}



export const cartEmpty = (next)=>{
  
    if(typeof window !== undefined){
        if(localStorage.getItem('cart')){
            localStorage.removeItem('cart')
            next()
        }

    
    }
    
}