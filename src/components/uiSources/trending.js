import React, {Suspense,useEffect} from "react";

const Trending = ({data,children}) => {

const trendingVideos = data.filter((categ) => (categ.subCategory==='trending'))
                  
    return(
        children(trendingVideos)
    );
    }

export default Trending