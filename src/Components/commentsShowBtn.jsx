import React, { Component, useState } from 'react';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const CommentsShowBtn = ({ showComments, onClick, gameId}) => {
    

    const handleShowComments = ()=>{ 
       console.log(gameId);
        (showComments?.showValue==="none")?onClick(showComments?.gameId,"block")
        :onClick(showComments?.gameId,"none");
    }


    return ( 
        <div className="comments-show-cont">
            <FontAwesomeIcon icon={faComment} />
            <p onClick={handleShowComments}
            className='comments-show-btn'>Comment</p>
                       
        </div>
     );
}
 
export default CommentsShowBtn;