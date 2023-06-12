import React, { Component } from 'react';
import googleIcon from "../img/google.png"

const Button = ({name,color, onClick}) => {

    const getGoogleIcon = ()=>{

       return (color)?<img src={googleIcon} 
       className='googleIcon'
       alt="" />:""
    }
    const getClasses = ()=>{
       return (!color)?"btn submit-btn":"btn submit-btn btn--google"
    }
   
    const doNothing = ()=>{
        // the onClick needs a function, thats why made this
    }
    return (  
        <button className={getClasses()}
        type='submit'
        style={{background: color}}
        onClick={(color)?e=>onClick(e.currentTarget.innerText):doNothing()}
        >
        {name}
        {getGoogleIcon()} 
        </button>
    );
}
 
export default Button;