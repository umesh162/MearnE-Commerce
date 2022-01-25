import React, { Children } from 'react';
import NavigationMenu from './NavigationMenu';

const Base = ({Title = "My Title",
description="This is the description",
className ='bg-dark text-white p-4',
 children}
 )=>{
    return(
        <div>
            <NavigationMenu/>
            <div className="container-fluid">
                <div className="jumbotron bg-dark text-white text-center">
                    <h2 className="display-4">{Title}</h2>
                    <p className="lead">{description}</p>
                </div>
                <div className={className}>{children}</div>
            </div>
            <footer className="footer bg-dark mt-auto py-3">
                <div className="container-fluid bg-success text-white text-center py-3">
                    <h4>For Query Feel free to reach out</h4>
                    <button className="btn btn-warning btn-lg">Contact Us</button>
                </div>
                <div className="container">
                    <div className="text-muted text-center">
                       An Amazing Place to <span className="text-white">Shop</span>
                    </div>
                </div>
            </footer>
        </div>
    )
}


export default Base