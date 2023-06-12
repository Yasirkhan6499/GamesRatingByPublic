import { getDownloadURL, ref } from 'firebase/storage';
import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import { storage } from '../config/firebase';

const GamesImage = ({name}) => {
    const [showImage, setShowImage] = useState(null);
   
    const imageRef = ref(storage, `images/${name}`);

    useEffect(()=>{
        getDownloadURL(imageRef).then(url=>{
            setShowImage(url);
        })
    },[]);

    return ( 
        <React.Fragment>
        {(showImage)?<img className='gameImage' src={showImage} /> :""}
        </React.Fragment>
     );
}
 
export default GamesImage;