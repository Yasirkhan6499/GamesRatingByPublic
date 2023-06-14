import React, { Component, useState } from 'react';
import Input from './input';
import Button from './button';
import Error from "./error"
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { getErrorMsg } from '../config/errorHandling';
import { Navigate, useNavigate } from 'react-router-dom';



const HostAuth = () => {

    const [email,setEmail] = useState("");
    const [pass,setPass] = useState("");
    const [error, setError] = useState();
    const navigate = useNavigate();

    const handleSettingEmail = (value)=>{
        setEmail(value);
    }
    const handleSettingPass =(value)=>{
        setPass(value);
    }
    
    const handleSubmitForm = async (e)=>{
        e.preventDefault();
       
        
            try{
                await signInWithEmailAndPassword(auth,email,pass);
                if(email==="yasirkhan@gmail.com" && (pass ==="Kittu642."))
                    navigate("/gameForm", {replace:true})
            }
            catch(err){
                setError(getErrorMsg(err));
            }
        
        
    }
   

    

    return (
        <div className='gameForm'>
        <form  onSubmit={handleSubmitForm}>
       
        <Input
        id="Email"
        label="Host Email"
        type="text"
        onSettingValue = {handleSettingEmail}
        />
        <Error
        errorMessage={error}
        />
         <Input 
        id="password"
        label="Host password"
        type="password"
        onSettingValue = {handleSettingPass}
        />
        <Button
        name={"Login as Host"} 
        color=""
        />
        </form>
        </div>
      );
}
 
export default HostAuth;