import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'

import Home from './core/Home'
import SignIn from './user/Signin';
import Signup from './user/Signup';

import PrivateRoute from './auth/helper/PrivateRoutes';
import userDashBoard from './user/UserDashBoard';
import adminDashBoard from './user/AdminDashBoard';
import AdminRoute from './auth/helper/AdminRoutes';
import AddCategory from './admin/AddCategory';
import addProduct from './admin/AddProduct';
import ManageCategory from './admin/ManageCategory';
import ManageProduct from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import UpdateCategory from './admin/UpdateCategory';
import cart from './user/cart';




const Routes = ()=>{
    return(
        <BrowserRouter>
        <Switch>
            <Route path ='/' exact component ={Home} />
            <Route path = '/signup' exact component ={Signup}/>
            <Route path ='/signin' exact component ={SignIn}/>
            <Route path ='/cart' exact component ={cart}/>
            <PrivateRoute path ='/user/userdashboard' exact component = {userDashBoard}/>
            <AdminRoute path='/admin/admindashboard'exact component ={adminDashBoard}/>
            <AdminRoute path='/admin/create/category' exact component ={AddCategory}/>
            <AdminRoute path='/admin/create/product' exact component = {addProduct}/>
            <AdminRoute path='/admin/manage/category' exact component ={ManageCategory}/>
            <AdminRoute path = '/admin/manage/product' exact component ={ManageProduct}/>
            <AdminRoute path ='/admin/product/update/:productID' exact component={UpdateProduct}/>
            <AdminRoute path = '/admin/category/update/:categoryID' exact component = {UpdateCategory}/>
        </Switch>
        </BrowserRouter>
    )
}

export default Routes