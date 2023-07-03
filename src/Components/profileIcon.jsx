import React, { useEffect, useState } from 'react';
import { getUserNameFromEmail } from './currentUser';
import { auth, db } from './../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

const ProfileIcon = ({ userName, isLetterMiddle, userId }) => {
  const [bgColor, setBgColor] = useState("darkBlue");

  useEffect(() => {
    const fetchBgColor = async () => {
      if (userId) {
        const userDoc = doc(db, 'users', userId);
        const userSnap = await getDoc(userDoc);
        // console.log(userSnap.data()?.userId);
        if (userSnap.exists) {
          const color = userSnap.data()?.color;
          // console.log(color);
          setBgColor(color || "blue");
        }
      }
    };

    fetchBgColor();
  }, [userId]);

  const getFirstLetterFromUserName = () => {
    const user = getUserNameFromEmail(userName);
    return user ? user[0] : '';
  };

  return (
    <React.Fragment>
      <p className='profile-icon' style={{ backgroundColor: bgColor }}>
        <span className={isLetterMiddle ? 'profile-icon-letter' : "profile-icon-translateY"}>
          {getFirstLetterFromUserName()}
        </span>
      </p>
    </React.Fragment>
  );
};

export default ProfileIcon;
