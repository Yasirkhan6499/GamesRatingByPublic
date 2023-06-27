import React, { useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useLocation, useNavigate } from 'react-router-dom';
// import { getUserNameFromEmail } from '../utils/helpers';

const CurrentUser = () => {
  const { currentUser } = auth;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = useState('none');
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userName = getUserNameFromEmail(user.email);
        setUser(userName);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleShowLogout = () => {
    setDisplay((prevDisplay) => (prevDisplay === 'block' ? 'none' : 'block'));
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setDisplay('none');
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignIn = () => {
    navigate('/auth', { replace: true });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-container">
      <span className="user-email-hello">{currentUser ? 'Hello,' : ''}</span>
      <p onClick={currentUser ? handleShowLogout : handleSignIn} className="user-email">
        {currentPath !== '/auth' ? user || 'Sign In' : null}
      </p>
      <p style={{ display }} onClick={handleLogout} className="user-logout">
        Sign Out
      </p>
    </div>
  );
};

export default CurrentUser;



 // Extract the username from email

 export function getUserNameFromEmail(string) {
  if(string){
  const user = string.split('@')[0];
  return user.charAt(0).toUpperCase() + user.slice(1);
  }
}

