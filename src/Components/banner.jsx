import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const BannerImage = () => {
    return (
       
        <Link className='link' to="/gamePost"> 
         <h1 className='bannerImg'>Games Rating By Public</h1>
        </Link>
        
    );
}
 
export default BannerImage;
