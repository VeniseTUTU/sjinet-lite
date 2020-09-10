import React, {Component,useEffect,useState,useRef} from "react";
import '../../scss/videorack.scss';
import ScrollContainer from 'react-indiana-drag-scroll';
import Video from "../uiSources/Video";
import AOS from 'aos';

AOS.init();

const VideoBox = ({onClick,contents,history,videoClass}) => {

return (
<div className="videobox" data-aos="fade-in" data-aos-duration="1000" data-aos-once>

    
    {
	
	   contents.map((content)=> (
        
        <Video
          className={videoClass}
          history={history} 
          itemId={content.itemId}  
          key={content.itemId}
          poster={content.itemImage} 
          itemTitle={content.itemTitle}
          itemDuration={content.itemDuration}
          itemLink={content.itemLink}
          trailerUrl={content.trailerUrl}
          timeLeft={content.timeLeft}
          onClick={(value)=>onClick(value)}
        />
        
  ))}
  </div>
    

  )
    
}

export default VideoBox


