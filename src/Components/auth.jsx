import React, { Component, useState } from 'react';
import Input from './input';
import Button from './button';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, db, googleProvider, usersColRef } from '../config/firebase';
import LoggingConversion from './logingConversion';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import Error from "./error"
import { getErrorMsg } from '../config/errorHandling';

const Auth = () => {
    const [email,setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [hasAccount, setHasAccount] = useState("");
    const [error, setError] = useState("");
    const [googleButtonClicked, setGoogleButtonClicked] = useState("false");
    const navigate = useNavigate();

    const handleSettingEmail = (value)=>{
        setEmail(value);
    }
    const handleSettingPass = (value)=>{
        setPass(value);
    }
    // handle google button
    const handleGoogleButton = async ()=>{
        try{
            
            // console.log("google btn")
           const newUser= await signInWithPopup(auth, googleProvider);
            const userId = newUser.user.uid;
            createUserDocInFB(userId, []); //create a user doc in firebase
            navigate("/gamePost",{replace:true});
        }
        catch(e){
            console.error(e);
            setError("");
        }
    }
    // handle submit form
    const handleSubmitForm = async (e)=>{
        console.log("submit form")
        console.log(googleButtonClicked)
        e.preventDefault();
        try{
            if(!hasAccount){
                const newUser = await createUserWithEmailAndPassword(auth,email,pass);
                const userId = newUser.user.uid;
                createUserDocInFB(userId, []); //create a user doc in firebase
            }
            else await signInWithEmailAndPassword(auth,email,pass);

            // alert(auth.currentUser.email);
            // go to the games posts when logged or signed in
            navigate("/gamePost",{replace:true});
       
        }
        catch(e){
            // console.error(e)
            const errorMsg = getErrorMsg(e);
            setError(errorMsg);
        }
    }
  
  
    //   handle Login button
    const handleLoginBtn = (account)=>{
        setHasAccount(account);
        setError("");
    }
    const createUserDocInFB = async (userId,gamesRatedArr)=>{
        const userDocRef = doc(db, 'users', auth.currentUser.uid); // Replace 'your-custom-id' with the desired document ID
        await setDoc(userDocRef, {
            userId,
            gamesRatedArr
        });

        
    }

    // const handling logging Host
    const handleLoggingHost = ()=>{
        navigate("/HostAuth");
    }

    return (  
       <div className='gameForm'>
        <form onSubmit={handleSubmitForm}>
        
        <Input 
        id="Email"
        label="Email"
        type="text"
        inputEmpty={hasAccount}
        onSettingValue = {handleSettingEmail}
        />
        <Error 
        errorMessage={error}
        />
         <Input 
        id="password"
        label="password"
        type="password"
        inputEmpty={hasAccount}
        onSettingValue = {handleSettingPass}
        />
        <Button 
        name={(hasAccount?"Login":"Sign up")} 
        color=""
       
        />
        {/* Sign up OR Sign in */}
        <LoggingConversion 
        onClick = {handleLoginBtn}
        />
        {/* //    google sign in button */}
        <Button 
        name="Continue with Google" 
        color="white"
        onClick={handleGoogleButton}
        />
       
        </form>
        <p className='btn btn--link'
        onClick={handleLoggingHost}
        >
            Login As Host</p>
        
       </div>
    
    );
}
 
export default Auth;