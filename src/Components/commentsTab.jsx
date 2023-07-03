import React, { Component, useEffect, useRef, useState } from 'react';
import Input from './input';
import Button from './button';
import { collection, getDoc, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { doc, getDocs } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { getUserNameFromEmail } from './currentUser';
import ProfileIcon from './profileIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { calculateNewValue } from '@testing-library/user-event/dist/utils';
import { calculateRelativeTime, getDateInRightFormat } from '../utils/relativeTime';
import { format, parse } from 'date-fns';
import USerStars from './userStars';



const CommentsTab = ({gameId, totalRatings,showComments}) => {

    const [comment, setComment] = useState("");
    const [commentsArr, setCommentsArr] = useState([]);
    const [userId, setUserId] = useState();

    const navigate = useNavigate();
    const commentsCollectionRef = collection(db,"comments");

    // scrollable Ref
    const commentsContainerRef = useRef(null);
   
    // Create a ref for the input element
    // const commentInputRef = useRef(null);


    useEffect(() => {
      
      console.log(showComments);
        getCommentsFromDB();

        // if (showComments === 'block') {
        // // Focus the input element when showComments is 'block'

        // console.log(commentInputRef.current);
        // commentInputRef.current?.focus();
    
        // }
        
      }, [gameId, totalRatings]);

      // useeffect for scrolling to bottom after commenting
      useEffect(()=>{
        scrollToBottom();
      },[commentsArr])

    const handleSettingComment = (value)=>{
        setComment(value);

        // alert(comment);
    }
    // scrool to bottom when you comment is added
    const scrollToBottom = () => {
      if (commentsContainerRef.current) {
        commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
      }
    };

    // handle comment
    const handleOnComment = async (event) => {
      if(auth.currentUser){
        if(comment && event.key === "Enter"){ //if comment is not empty then do comment
        try {

            const newComment = {
                userId: auth.currentUser.uid,
                userName: getUserNameFromEmail(auth.currentUser.email),
                comment, 
                date: getDateInRightFormat(new Date())
            }
            const allComments = [...commentsArr, newComment];
            
          await setDoc(doc(db, 'comments', gameId), {
            commentsArr: allComments
          });
          getCommentsFromDB();
        } catch (e) {
          console.error(e);
        }
        // empty the input field
        setComment("");
      };
    }
    else navigate("/auth");

    }
   
      
    // getting all comments from the DB 
    const getCommentsFromDB = async () => {
        try {
          // console.log(gameId);
          const gameDoc = await getDoc(doc(commentsCollectionRef, gameId));
            // console.log(gameDoc.data())
          if (gameDoc.exists) {
            const comments = gameDoc.data()?.commentsArr;
            // console.log(comments)

            setCommentsArr(comments || []);
            

          }
        } catch (e) {
          console.error(e);
        }
      };
      
      // get Relative Time for the comment
      const getRelativeTime = (date)=>{
        return calculateRelativeTime(date);
      }

      return (
        <div style={{display:showComments?.showValue}} className='comments-section-cont'> 
          <div ref={commentsContainerRef} className={commentsArr.length > 0 ? "comments" : "no-comments-cont"}>
            {(commentsArr.length>0)?commentsArr.map((comment, index) => (
              <div className='profile-comment-cont' key={index}>
                <div className="profile-cont">
                  <ProfileIcon userName={comment.userName} 
                  userId={comment.userId}
                  />
                  <p className="profileName">{comment.userName}</p>
                  <USerStars
                    userId={comment.userId}
                    gameId={gameId}
                    totalRatings={totalRatings}
                    key={index}
                  />
                  <p className="commentTime">{getRelativeTime(comment.date || new Date('2023-06-15T12:34:56'))}</p>
                </div>
                <p  className='comment-single'>{comment.comment}</p>
              </div>
            )):
            <p className='no-comments' >No comments</p>
            }
          </div>
          <div className="comment-input-cont">
            <span className='comment-input-profile-icon'>
              <ProfileIcon
                userName={getUserNameFromEmail(auth.currentUser?.email)}
                isLetterMiddle={true}
                userId={auth.currentUser?.uid}
              />
            </span>
            <Input
              // ref={commentInputRef} // Attach the ref to the input element
              id="comment-tab"
              type="text"
              inputEmpty={commentsArr}
              onSettingValue={handleSettingComment}
              placeholder="Add a comment"
              classes="comment-input"
              onKeyDown={handleOnComment}
            />
            <span
              onClick={handleOnComment}
              style={{ pointerEvents: 'auto' }}
              className="comment-icon"
            >
              <FontAwesomeIcon icon={faArrowUp} />
            </span>
          </div>
        </div>
      );
}
 
export default CommentsTab;