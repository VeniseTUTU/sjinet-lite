import React, {Suspense, useState, useEffect} from "react";
import {EpisodesProvider} from "../providers";
import '../../scss/episodePicker.scss';
import { CommentIcon,InfoIcon,LikeIcon, ShareIcon } from '../Icons';
const BASE_URL = process.env.NODE_ENV === 'development' 
				 ? process.env.USE_BASE_URL_ENV
         : process.env.USE_BASE_URL;
import {GrowingSquare,TheaterSpinner} from "../loaders";
import {Avatar} from "../Icons";
import { Scrollbars } from 'react-custom-scrollbars';
import AOS from 'aos';
AOS.init();


 const EpisodePicker = ({variables,currentSeason,toogleEpisodePicker,getOneVideo}) =>{

const seasons=[];
if(currentSeason >1 ){
    for(let i=1; currentSeason >= i; ++i){
    seasons.push(i);
  }
}
    return(
      <EpisodesProvider getOneVideo={(value)=>getOneVideo(value)} variables={variables} toogleEpisodePicker={toogleEpisodePicker}>
      {({Input,episodes,handleSeasonChange,handleSelectEpisode})=>(
        <section className="EpisodePickerWrapper" data-aos="zoom-in-up"  data-aos-once>
    <section className="EpisodePickerWrapper__titleBar">
      <ul className="EpisodePickerWrapper__titleBar__leftContent">
        <li onClick={toogleEpisodePicker}><span className="gg pe-7s-angle-left"></span></li>
        <li>
  {
    currentSeason == 1
    ? <h5>Season {currentSeason}</h5>
    : <form><select onChange={handleSeasonChange}>
        <option value={currentSeason}>Season {currentSeason}</option>
          {
            seasons.map((season,idx) => (
              <option key={idx} value={''+season}>Season {season}</option>
            ))
          }
      </select> <span className="pe-7s-angle-down"></span></form>
  }
        
        </li>
      </ul>
    </section> 

   <div className="EpisodePickerWrapper__Bracer">
   
    <ul className="EpisodePickerWrapper__Body">
    <Scrollbars autoHide>
{
  episodes.map((episode,idx) => (
      <li key={idx} onClick={()=>handleSelectEpisode(episode.itemId)} >
        <div className="EpisodePickerWrapper__Body__Left">
          <img src={episode.itemImage} />
        </div>
        
        <div className="EpisodePickerWrapper__Body__Right">
        <Scrollbars autoHide>
          <div className="EpisodePickerWrapper__Body__Right__Title">
            Episode {episode.episode} ({episode.episodeTitle})
          </div>
          
          <div className="EpisodePickerWrapper__Body__Right__Bod">
          {episode.episodeDescription || episode.description}
        
          </div></Scrollbars>
        </div>
      </li>
  ))
}
      
    </Scrollbars>
    </ul> 
</div>
  
   

</section>

      )}
      </EpisodesProvider>

 
 );
    

}

export default EpisodePicker;


