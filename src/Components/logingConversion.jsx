import React, { Component, useState } from 'react';

const LoggingConversion = ({onClick}) => {
    const [hasAccount, setHasAccount] = useState(false);

    const handleHasAccount = (e)=>{
        e.preventDefault();
        setHasAccount(!hasAccount);
        onClick(!hasAccount);
    }

    const getMessage = (isLink)=>{
        if(isLink)
        return (hasAccount)?"Sign Up":"Login";
        else
        return (hasAccount)?"CREATE AN ACCOUNT":"ALREADY HAVE AN ACCOUNT"
    }

    return ( 
        
            <p>{getMessage(false)} 
            <button onClick={handleHasAccount} className='btn btn--link'>
            {getMessage(true)}
            </button>
            </p>
        
     );
}
 
export default LoggingConversion;