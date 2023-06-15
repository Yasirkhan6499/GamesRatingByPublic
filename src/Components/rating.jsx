import React, { useState } from 'react';
import StarRating from 'star-rating.js';



function RatingSystem({ratings, totalRatings}) {

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

  const getClasses = ()=>{
    let classes = "gameRating ";
    classes+=(ratings<5)?"gameRating-bgRed":"gameRating-bgGold";
    console.log(ratings,classes);
    return classes;
  }

  return (
    <div className={getClasses()}>
      <p className='totalRatings'>{totalRatings} 
      {(totalRatings>1 || totalRatings===0)
      ?" people":" person"} rated it!</p>
      <h2>Rating  {ratings}/10</h2>
      {/* <p>Likes: {likes}</p>
      <p>Dislikes: {dislikes}</p>
      <button onClick={handleLike}>Like</button>
      <button onClick={handleDislike}>Dislike</button> */}
      
      
    </div>
  );
}

export default RatingSystem;
