import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import Star from './star';
import { myGlobalObject } from '../config/global';

const Stars = ({ onNewRating, gameId, gameDocId }) => {
  const [isGameRated, setIsGameRated] = useState(false);
  const [starNumber, setStarNumber] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (auth.currentUser) {
        const userDoc = doc(db, "users", auth.currentUser?.uid);
        const userDocSnap = await getDoc(userDoc);
        const gameRated = userDocSnap.data().gamesRatedArr.find(game => game.gameId === gameDocId);
        if (gameRated) {
          setIsGameRated(true);
          setStarNumber(gameRated.rating);
        } else {
          setIsGameRated(false); // Set it to false if the game is not rated by the user
        }
      }
    };

    fetchData();
  }, [gameDocId, auth.currentUser, onNewRating]);

  const handleAllStarsChecked = (starNumber) => {
    myGlobalObject.checkedStarNumber = starNumber;
    setStarNumber(starNumber); // Update the starNumber state when a star is checked
  };

  const getStars = () => {
    let stars = [];

    for (let i = 1; i <= 5; i++) {
      stars[i] = (
        <Star
          onChecked={handleAllStarsChecked}
          nextSiblingChecked={(i<myGlobalObject.checkedStarNumber)?true:false}
          starNumber={i}
          onClick={onNewRating}
          gameId={gameId}
        />
      );
    }

    return stars;
  };

  const getStarsOrRating = () => {
    if (!isGameRated || !auth.currentUser) {
      return getStars();
    } else {
      let userRating = "You Rated " + starNumber;
      userRating += starNumber > 1 ? " stars" : " star";
      return <p className='userRating'> {userRating} </p>;
    }
  };

  return (
    <div>
      {getStarsOrRating()}
    </div>
  );
};

export default Stars;
