import React, { Component, useState } from 'react';
import { myGlobalObject } from '../config/global';

const Star = ({onChecked,starNumber,nextSiblingChecked, onClick, gameId}) => {
    const [check,setCheck] = useState(false);

   const handleMouseEnter = ()=>{
    console.log("starnumber :"+starNumber)
    setCheck(true);
    onChecked(starNumber);
    // myGlobalObject.isStarChecked=true;

   }
   const handleMouseLeave = ()=>{
    setCheck(false);
    onChecked(0);
    // myGlobalObject.isStarChecked=false;
   }

    return ( 
        <React.Fragment>
            <span onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={(check||nextSiblingChecked?"fa fa-star checked":"fa fa-star")} 
            onClick={()=>onClick(gameId, starNumber)}
            >
            
            </span>
            {/* set value to the global variable */}
            {/* {myGlobalObject.checkedStarNumber = (check)?starNumber:0} */}
        </React.Fragment>
     );
}
 
export default Star;