import React, { useEffect, useState } from 'react';
import StarRating from 'star-rating.js';



function RatingSystem({ratings, totalRatings, onUpdateRatings, showComments, screenSize }) {

  const [screen1200Comments, setScreen1200Comments] = useState(null);
  const [screen860Comments, setScreen860Comments] = useState(null);

  useEffect(()=>{
    onUpdateRatings(totalRatings)

    // adjust the position of gamesRating on smaller screens
    adjustGamesRatingPos();

  },[ratings, totalRatings, screenSize, showComments?.showValue]);

  // adjust gameRating Position
  const adjustGamesRatingPos = ()=>{
    if(screenSize){
    if(screenSize<=1200 && screenSize>860){
      console.log(showComments);
      (showComments?.showValue==="block")?setScreen1200Comments("block"):setScreen1200Comments("none");
    }
    else setScreen1200Comments(null);
    
    if(screenSize<=860){
      // console.log(showComments);
      (showComments?.showValue==="block")?setScreen860Comments("block"):setScreen860Comments("none");
    }
    else setScreen860Comments(null);
  }
}

  const calculateRating = ()=>{
    const ratings = [1, 2, 3, 4, 5];
const totalRatings = ratings.length;

// Assume that `postRatings` is an array of ratings given to the post by users.
const postRatings = [3, 5, 4, 2, 1];

// Calculate the average rating.
const averageRating = postRatings.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / totalRatings;

// Scale the rating from 0-5 to 0-10.
const scaledRating = (averageRating / 5) * 10;

// Round the rating to the nearest tenth.
const rating = Math.round(scaledRating * 10) / 10;

// Display the rating.
console.log(`${rating}/10`);
  }

  // getting rating style
  const getElementStyle = ()=>{
    if(screenSize<=1200){
      // console.log(screenSize);
      return(
      (screen1200Comments)?
      (screen1200Comments==="block")?{marginTop: "-19rem"}:{marginTop:"0rem"}
      :(screen860Comments==="block")?{bottom: "54%"}:{bottom: "27.5%"}
      )
    }
    else return {marginTop: "initial"};
  }

  const getClasses = ()=>{
    let classes = "gameRating ";
    classes+=(ratings<5)?"gameRating-bgRed":"gameRating-bgGold";
    // console.log(ratings,classes);
    
    return classes;
  }

  return (
    <div style={getElementStyle()}
      className={getClasses()}>
      <p className='totalRatings'>{totalRatings} 
      {(totalRatings>1 || totalRatings===0)
      ?" People":" Person"} Rated!</p>
      <h2 >Rating  {ratings}/10</h2>
      {/* <p>Likes: {likes}</p>
      <p>Dislikes: {dislikes}</p>
      <button onClick={handleLike}>Like</button>
      <button onClick={handleDislike}>Dislike</button> */}
      
      
    </div>
  );
}

export default RatingSystem;
