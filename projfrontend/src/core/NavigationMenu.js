import React,{Fragment} from 'react';
import {Link,withRouter} from 'react-router-dom'
import { isAuthenticate, signout } from '../auth/helper';


const currentTab =(history,path)=>{

  
 return history.location.pathname === path ?   {color : ' #E8BD0D'} :  {color : '#ffffff'}

}

const NavigationMenu =({history})=>(
    <div>
        <ul className="nav nav-tabs bg-dark">
            <li className="nav-item">
                <Link style={currentTab(history,'/')} className='nav-link' to='/'>
                    Home
                </Link>
            </li>
            <li className="nav-item">
                <Link style={currentTab(history,'/cart')} className='nav-link' to='/cart'>
                Cart
                </Link>
            </li>
            <li className="nav-item">
                <Link style={currentTab(history,'/dashboard')} className='nav-link' to='/user/userdashboard'>
                  user  DashBoard
                </Link>
            </li>
         {
              isAuthenticate() && isAuthenticate().user.role === 1 && ( <li className="nav-item">
               <Link style={currentTab(history,'/admindashboard')}  className='nav-link' to='/admin/admindashboard'>
                   Admin DashBoard
               </Link>
           </li>)
         }
           {!isAuthenticate()&&( <Fragment>
            <li className="nav-item">
                <Link style={currentTab(history,'/signup')} to='/signup' className='nav-link'>
                    Signup
                </Link>
            </li>
            <li className="nav-item">
                <Link style={currentTab(history,'/signin')} to='/signin'className='nav-link'>
                    Sign-In
                </Link>
            </li>
            </Fragment>)}
           {isAuthenticate()&&( <li className="nav-item">
              <span className ='nav-link text-danger' onClick={ ()=>{
                  signout(()=>{
                      history.push('/')
                  })
              }}>
                  Signout
              </span>
            </li>)}
        </ul>

    </div>
)

export default withRouter(NavigationMenu)