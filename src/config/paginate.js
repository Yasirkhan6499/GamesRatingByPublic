import { useContext } from "react";
import { GameContext } from "../contexts/gameContext";



export const Pagination = ()=>{
    const {currentPage,addCurrentPage,totalPages} = useContext(GameContext);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
          addCurrentPage(currentPage + 1);
        }
      };
    
      const handlePreviousPage = () => {
        if (currentPage > 1) {
          addCurrentPage(currentPage - 1);
        }
      };

    return (<div className="paginate-container">
        <button className="btn paginate-btn" onClick={handlePreviousPage} disabled={currentPage === 1}>
          Prev
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button className="btn paginate-btn" onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next 
        </button>
      </div>
      )

}

export const paginateData = (data,currentPage, addTotalPages )=>{
    
    const totalPagesCount = Math.ceil(data.length / 5);
    addTotalPages(totalPagesCount);

    // Calculate the start and end indexes for the current page
    const startIndex = (currentPage - 1) * 5;
    const endIndex = startIndex + 5;

    // Filter the gameList based on the current page
    const currentGameList = data.slice(startIndex, endIndex);

    return currentGameList;
    
}