import React, { Component, useEffect, useState } from 'react';

const Input = ({id,label,type,inputEmpty,onSettingValue,placeholder,classes}) => {
    const [input,setInput] = useState("");

    useEffect(()=>{
       
        setInput("");
    },[inputEmpty])

    const handleChange = (e) =>{
        const inputValue = e.currentTarget.value;
        setInput(inputValue);
        if(typeof onSettingValue === "function") 
        onSettingValue(inputValue);
        
    } 

    return (   
        <div>
        {(label)?<label htmlFor={id}>{label}</label>:null}
        <input 
        className={(classes)?classes+" inputField":'inputField'} 
        value={input}
        type={type}
        id={id}
        onChange={handleChange} 
        onBlur={(typeof onSettingValue === "function")?(e)=>onSettingValue(e.currentTarget.value):null}
        placeholder={(placeholder)?placeholder:null}
        />
        </div>
    );
}
 
export default Input;