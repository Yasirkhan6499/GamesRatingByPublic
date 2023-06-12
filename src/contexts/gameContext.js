import React, { Component, createContext, useState } from 'react';
export const GameContext = createContext();

export const GameContextProvider = ({children})=>{
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const addCurrentPage = (page)=>{
        setCurrentPage(page);
    }
    const addTotalPages = (total)=>{
        setTotalPages(total);
    }

    return(
        <GameContext.Provider value={{currentPage,addCurrentPage,totalPages,addTotalPages}}>
            {children}
        </GameContext.Provider>
    )
    
}

export default {GameContext, GameContextProvider};