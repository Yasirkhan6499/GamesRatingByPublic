import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return ( 
        <React.Fragment>
            
            <p>Copyright&copy; 2023 Games Rating By Public. All rights reserved.</p>

            <div className='footer-menu'>
               <Link className='link '  to={"/about"}> <p >About</p> </Link>
               <Link className='link ' to={"/privacy"}> <p >Privacy</p> </Link>
            </div>
        </React.Fragment>
     );
}
 
export default Footer;