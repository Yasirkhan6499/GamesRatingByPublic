export const filterOptions = ["Year: High To Low","Year: Low To High",
                            "Rated: High To Low", "Rated: Low To High"];
                              

export const getFilteredData = (gameList, filter)=>{
    let sortedGameList = [];

    if (filter === 'Rated: High To Low') {
      sortedGameList = gameList.sort((a, b) => b.Ratings - a.Ratings);
    } else if (filter === 'Rated: Low To High') {
      sortedGameList = gameList.sort((a, b) => a.Ratings - b.Ratings);
    } else if (filter === 'Year: High To Low') {
      sortedGameList = gameList.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
    } else if (filter === 'Year: Low To High') {
      sortedGameList = gameList.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
    }
    else sortedGameList=gameList;

    return sortedGameList;
}