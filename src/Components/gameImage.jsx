import { getDownloadURL, ref } from 'firebase/storage';
import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import { storage } from '../config/firebase';

const GamesImage = ({name, gameInfo}) => {
    const [showImage, setShowImage] = useState(null);
   
    const imageRef = ref(storage, `images/${name}`);

    useEffect(()=>{
        getDownloadURL(imageRef).then(url=>{
            setShowImage(url);
        })
    },[]);

    return ( 
        <React.Fragment>
            
            <div className='img-container'>
            <p className="gameInfo">{gameInfo}</p>
            {(showImage)?<img className='gameImage' src={showImage} /> :""}
            </div>
        </React.Fragment>
     );
}
 
export default GamesImage;