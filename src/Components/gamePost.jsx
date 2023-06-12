import { arrayUnion, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { auth, colRef, db } from '../config/firebase';
import React, { Component, useContext, useEffect, useState } from 'react';
import GamesImage from './gameImage';
import RatingSystem from './rating';
import Stars from './stars';
import { useNavigate } from 'react-router-dom';
import { myGlobalObject } from '../config/global';
import { Pagination, paginateData, pagination } from '../config/paginate';
import { GameContext } from '../contexts/gameContext';
import Input from './input';
import Select from './select';
import { filterOptions, getFilteredData } from '../utils/filterOptions';


const GamePost = () => {
    const {currentPage,addCurrentPage,totalPages,addTotalPages} = useContext(GameContext)
    const gamesCollectionRef = collection(db,"games")
    const usersCollectionRef = collection(db, "users");

    const [gameList, setGameList] = useState([]);
    const [allGameList, setAllGameList] = useState([]);
    const [searchedVal, setSearchedVal] = useState("");
    const [filteredList, setFilteredList] = useState();
    const [currentFilter, setCurrentFilter] = useState("");
    const navigate = useNavigate();

    // store ratings for a post
    const handleNewRating = async (gameId,starNumber)=>{
        // alert("game ID: "+ gameId)
        // get the currentRatings from the database
        if(auth.currentUser){
        const gamesCollectionRef = await getDocs(colRef);
        const gameDoc = gamesCollectionRef.docs.filter(doc=>{
            return (doc.data().id === gameId)
        }) 
     
      
        // formula for ratings
        const previousAverage  = gameDoc[0].data().Ratings; // average rating of the post before the new rating was added, on a scale of 1-10
        const newRating = starNumber; // new rating submitted by the user on a scale of 1-5
        let totalRatings = gameDoc[0].data().totalRatings; //get the total rating and increment by 1
        totalRatings++;
        const sumOfRatings = gameDoc[0].data().sumOfRatings + newRating;
        console.log("totalRatings : "+totalRatings + "  sumOfRatings: "+sumOfRatings)
        // average of the rating
        const averageRating = sumOfRatings / totalRatings;
        // // Map the average rating from 1-5 scale to 1-10 scale
        const overallRating = (averageRating / 5) * 10;
          // Round the overall rating to one decimal place
        const roundedRating = parseFloat(overallRating.toFixed(1));
    
        // const newAverage = (previousAverage + (newRating * 2)) / 2;
        // const newRatingOutOf10 = Math.round(newAverage) // round to 1 decimal place
        console.log("Rating: "+roundedRating); // output: 8.5
        
        // Save the current ratings in the database
    
        const docRef = doc(db,"games",gameDoc[0].id);
        updateDoc(docRef, {Ratings: roundedRating, totalRatings, sumOfRatings});

        //add the game id to the users doc in the database
        addGameIdInDB(gameDoc[0].id, newRating);
        //  auth.currentUser.uid
        
        setFilteredList(null);
        // Then refresh the posts
        getGamesList(searchedVal);
    } //if user is signed in

    else{ //if not signed in, then send him to signed in page
       
        navigate("/auth");
    }

    myGlobalObject.checkedStarNumber = 0; //its important because when we set rating for a post, other posts stars gets highlighted as well.
    
    }

        //add the game id to the users doc in the database
    const addGameIdInDB = async (gameId, rating) => {
        try {
        const userDocRef = doc(usersCollectionRef, auth.currentUser.uid);
        await updateDoc(userDocRef, {
            gamesRatedArr: arrayUnion({ gameId, rating })
        });

        console.log("Game ID added to the user's document successfully.");
        } catch (error) {
        console.error("Error adding game ID to user's document:", error);
        }
  };

    // get data from database
    const getGamesFromDB = async ()=>{
        const data = await getDocs(gamesCollectionRef);
        return  data.docs.map((doc)=>{
            return(
                {docId: doc.id,...doc.data()}
            );
        })
       
        

    };

   const getGamesList = async (searchedValue)=>{
    console.log(searchedValue);
        setSearchedVal(searchedValue); //setting searched value

       
        const gamesData =await getGamesFromDB();

        setAllGameList(gamesData); //just to get all the games for filtering

        const filterGamesData =(currentFilter)?getFilteredData(gamesData,currentFilter)
        :gamesData;

        // get the searched posts
        const dataSearched = (searchedValue)?filterGamesData.filter(game=>{
            // set the current page to "1"
            addCurrentPage(1);

            const searchedLength = game.title.substring(0,searchedValue.length);
            return searchedLength.toLowerCase()===searchedValue.toLowerCase();

        })
        :gamesData;
        // paginate the data
        const dataPaginate = paginateData(dataSearched, currentPage, addTotalPages);
        // console.log(dataPaginate)
        setGameList(dataPaginate);
    }

      // handle filter data
      const handleFilterData = (filter)=>{
        myGlobalObject.checkedStarNumber = 0; //its important because when we set rating for a post, other posts stars gets highlighted as well.
        setCurrentFilter(filter);
        //  set current page to 1
       addCurrentPage(1); 
       setFilteredList(getFilteredData(allGameList, filter));
       getGamesList(searchedVal);
       console.log(filteredList);
    }
    
    useEffect(()=>{
        getGamesList(searchedVal);
    },[currentPage, filteredList]);

  

    return ( 
        <div className='gamePosts-container'>
            {/* current user */}
             {/* {alert("refreshed")} */}
             {/* search bar */}
             <div className="searchAndFilter-container">
                 <Input
                 id="search-bar"
                 type="text"
                 onSettingValue={getGamesList}
                 placeholder="Search By Name"
                 classes="search-bar"
                 />
                 
                             {/* Filter Data 1 */}
                             <Select
                             id="filterOption"
                             classes="filterSelect"
                             name="filter"
                             text="Filter Data By:"
                             data={filterOptions}
                             onChange={handleFilterData}
                             />
             </div>

            {gameList?.map(game=>{
               
                return (
                <div className='gamePostPlusRating'>
                
                <div className='gamePost'>
                <div>
                    <GamesImage key={game.id} name={game.id} />
                    <div className='gamePost-info'>
                    <p>{game.title}</p>
                    <p>{game.releaseDate}</p>
                    <Stars onNewRating = {handleNewRating} gameId = {game.id}  gameDocId = {game.docId} />
                    {/* {console.log(game.docId)} */}
                </div>
                    
                </div>
                </div>
                <RatingSystem ratings = {game.Ratings} />
                </div>
                )
            })}
       {/* Pagination controls */}
            <Pagination />

        </div>

        
     );
}
 
export default GamePost;



