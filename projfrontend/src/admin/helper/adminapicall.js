import { API } from "../../backend";

export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((resp) => resp.json())
    .catch((err) => console.log("error in create category Api", err));
};
//get All category API call

export const getAllCategory = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((resp) => resp.json())
    .catch((err) => console.log(err));
};

// product API calls

// CreateProduct API

export const createProduct = (uId, token, product) => {
  return fetch(`${API}/product/create/${uId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((resp) => resp.json())
    .catch((err) => console.log("error in createProductApi Call"));
};

// getAllProduct Api call

export const getAllProducts = () => {
  return fetch(`${API}/products`, {
    method: "GET",
  })
    .then((resp) => resp.json())
    .catch((err) => console.log("error in getALlProduct API call"));
};

//getProduct API call returns a single product

export const getProduct = (pID) => {
  return fetch(`${API}/product/${pID}`, {
    method: "GET",
  })
    .then((resp) => {
      return resp.json();
    })
    .catch((err) => console.log("error in GetProduct API"));
};

//Delete Product Api Call

export const deleteProduct = (pID, uID, token) => {
  return fetch(`${API}/product/${pID}/${uID}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token} `,
    },
  })
    .then((resp) => resp.json())
    .catch((err) => console.log(err));
};


export const updateProduct = (pID,uID,token,updatedValue)=>{
  return fetch(`${API}/product/${pID}/${uID}`,{
    method : 'PUT',
    headers :{
      Accept : 'application/json',
      Authorization : `Bearer ${token}`
    },
    body : updatedValue
  }).then(resp => resp.json())
  .catch(err => console.log('error in updateProduct API call'))
}


export const deleteCategory = (categoryId,userId,token) =>{
  return fetch(`${API}/category/${categoryId}/${userId}`,{
    method : 'DELETE',
    headers : {
      Accept : 'application/json',
      'Content-Type' : 'application/json',
      Authorization : `Bearer ${token}`
    }
  }).then(resp => resp.json())
  .catch(err => console.log('error in deleteCategory Api Call'))
}


export const updateCategory = (categoryId,userId,token,updatedValue)=>{
  return fetch(`${API}/category/${categoryId}/${userId}`,{
    method : 'PUT',
    headers : {
      Accept : 'application/json',
      "Content-Type": "application/json",
      Authorization : `Bearer ${token}`
    },
    body : JSON.stringify(updatedValue)
    
  })
  .then(resp => resp.json())
  .catch(error => console.log('Error',error))
}


export const getCategory = (categoryId) => {
  return fetch(`${API}/category/${categoryId}`, {
    method: "GET",
  })
    .then((resp) => {
      return resp.json();
    })
    .catch((err) => console.log(err));
};


export const getPhotos = (productId)=>{
  return fetch(`${API}/product/photo/${productId}`,{
    method:'GET'
  }).then(resp =>resp.json())
  .catch(err => console.log(err))
}