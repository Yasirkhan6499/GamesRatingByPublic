import React, { Component, useEffect, useState } from 'react';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db, storage } from '../config/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { years } from '../utils/dateSelection';
import {v4} from "uuid";
import Input from './input';
import Button from './button';
import Select from './select';

const GameForm = () => {
    const gamesCollectionRef = collection(db, "games");

    // states
    const [id, setId] = useState("")
    const [title,setTitle] = useState("");
    const [releaseDate, setReleaseDate] = useState(0);
    const [discription,setDescription] = useState("");
    const [imageUpload, setImageUpload] = useState(null);
    const [showImage, setShowImage] = useState(null);
    const [imgRef, setImgRef] = useState(null);

    const handleSettingValue = (title, date)=>{
        // alert(title)
      if(title)setTitle(title);
      if(date)setReleaseDate(date);
    }

    const handleSubmitForm = async(e)=>{
    e.preventDefault();
    
    try{
        const id = (imageUpload.name + v4());
        // Store information
        await addDoc(gamesCollectionRef, {
            id,
            title,
            releaseDate,
            Description: discription,
            Ratings: 0,
            sumOfRatings: 0,
            totalRatings: 0    
        });

        // upload Game Image
        if(!imageUpload) return;
        const imageRef = ref(storage,`images/${id}`);
        uploadBytes(imageRef, imageUpload).then(()=>{
            alert("Game Uploaded!")
            window.location.reload();
        });
        
        // setImgRef(imageRef);
        
        // refresh the page
        // window.location.reload();
        
    }
    catch(err){
        console.error(err);
    }
 }
 const handleChange = (value)=>{
    setReleaseDate(value);
 }
// code to show the image
// useEffect(()=>{
//     if(imgRef)
//     getDownloadURL(imgRef).then((url)=>{
//         setShowImage(url);
//         console.log(url)
//     })
// },[])
    return (
        <div className='gameForm'>
        <form onSubmit={handleSubmitForm}>
           
            <Input 
            id="title" 
            label="Game Title" 
            type="text"
            onSettingValue = {handleSettingValue}
            />
            {/* selecting date */}
            <Select 
            id="releaseDate"
            label="Released Year"
            name="date"
            text="Select a date"
            onChange = {handleChange}
            data={years}
            />
            {/* <div>
            <label htmlFor='releaseDate'>Released Year</label>
            <select className='inputField' id='releaseDate' onChange={(e)=>setReleaseDate(e.currentTarget.value)} name="date">
                <option value="">Select a date</option>
                    {years.map((year) => (
                    <option key={year} value={year}>
                    {year}
                </option>
                ))}
            </select>
            </div> */}
           {/* descritpion */}
            <div>
            <label htmlFor='description'>Description</label>
            <textarea className='inputField' id='description' rows={7} cols={30} onChange={(e)=>setDescription(e.currentTarget.value)} />
            </div>
           
             {/* upload image */}
             <div>
                <label>Game Image</label>
                <input type='file' onChange={(e)=>setImageUpload(e.target.files[0])} accept='image/*' />
            </div>
            {/* submit form */}
           
            <Button name="Submit Game" />
        </form>
       

            {/* {showImage?<img src={showImage} />:<p>hahah</p>} */}
        
        </div>  
    );
}
 
export default GameForm;