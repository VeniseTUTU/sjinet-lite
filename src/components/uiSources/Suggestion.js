import React, {} from "react";
import {UserGenresProvider} from "../providers";

export default ({data,children}) => (
  
<UserGenresProvider>
  { (genreData) => {
  
   let hisAndFavVideos=[]; 
  if(genreData.length > 0){
    
      hisAndFavVideos = data.filter((categ) => (
        genreData.some(o => categ.genre.includes(o))
      ));
      
    }else{
      hisAndFavVideos = data.filter((categ) => (
        ['new','stale'].some(o => categ.subCategory.includes(o))
      ));
    }
  
   return (
    children(hisAndFavVideos)
  ); 

  }
}

</UserGenresProvider>
   
)


 