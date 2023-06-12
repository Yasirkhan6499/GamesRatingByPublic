import React, { useState, useEffect, useContext } from 'react';
import { auth } from '../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { GameContext } from '../contexts/gameContext';

const CurrentUser = () => {
  const { currentUser } = auth;
  const [user, setUser] = useState(currentUser?.email);
  const [display, setDisplay] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  // useContext hook
  const {isRefresh, triggerRefresh} = useContext(GameContext);

  useEffect(() => {
    const checkAndGetUser = () => {
      onAuthStateChanged(auth, (user) => {
       const userName = (user)?capitalizeFirstLetter(
        user.email.split("@")[0]
        ):null;
        user ? setUser(userName) : setUser("Sign In");
      });
    };

    checkAndGetUser();
  }, []);

  // capitalize first letter in the name

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // handling show logout button
  const handleShowLogout = () => {
   display==="block"?setDisplay("none"):setDisplay("block");
  };

//   handling logging out
const handleLogout = ()=>{
    signOut(auth);
    setDisplay("none");
    // triggerRefresh(true); //context (Global variable) to refresh the whole app
    window.location.reload();
}

// handling Sigining In
const handleSignIn = ()=>{
    navigate("/auth",{replace:true});
}

  return (
    <div className='user-container'>
      {console.log(currentUser?.email)}
      <span className='user-email-hello'>{currentUser?"Hello,":""}</span> 
      <p onClick={currentUser?handleShowLogout:handleSignIn} className='user-email'>
       {currentPath !== '/auth' ? user : null}
      </p>
      <p style={{ display }} onClick={handleLogout} className='user-logout'>
        Sign Out
      </p>
    </div>
  );
};

export default CurrentUser;
