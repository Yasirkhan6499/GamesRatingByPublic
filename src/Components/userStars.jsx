import React, { Component, useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';

const UserStars = ({userId, gameId, totalRatings}) => {
    
    const [rating, setRating] = useState(0); 

    useEffect(()=>{
        const fetchRatings = async ()=>{
            try{
                // console.log(userId)
                // Get a reference to the specific document within the "users" collection using the document ID
                if(userId){
                const userDocRef = doc(db, "users", userId);
                const userDocSnap = await getDoc(userDocRef);
                const gamesRatedArr = userDocSnap.data()?.gamesRatedArr;
        
                if (gamesRatedArr && gamesRatedArr.length > 0) {
                const game = gamesRatedArr.find((game) => game.gameId === gameId);
                if (game) {
                    setRating(game.rating);
                } else {
                    setRating(0); // Set the default rating to 0 if the user has not rated the game
                }
                } else {
                setRating(0); // Set the default rating to 0 if the user has not rated any games
                }
            }

            }
            catch(e){
                console.error(e);
            }
        } 
        fetchRatings();
    }, [userId, gameId, totalRatings]);

  // fetching users stars for comment
  const getUserStars = () => {
    const allStars = [];

    for (let i = 1; i <= 5; i++) {
      const starClass = (i <= rating) ? 'fa fa-star checked' : 'fa fa-star';
      allStars.push(<span className={starClass} key={i}></span>);
    }

    return <React.Fragment>{allStars}</React.Fragment>;
  };

  return <div className="user-stars-for-comment">{getUserStars()}</div>;
};
 
export default UserStars;