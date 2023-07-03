import React, { Component } from 'react';

const Error = ({errorMessage}) => {
    return ( 
        <p className='error-msg'>{errorMessage}</p>
     );
}
 
export default Error;