import React, {Component,useEffect,useState,useRef} from "react";
import '../../scss/videorack.scss';
import ScrollContainer from 'react-indiana-drag-scroll';
import Video from "../uiSources/Video";
import AOS from 'aos';
const BASE_URL = process.env.NODE_ENV === 'development' 
				 ? process.env.USE_BASE_URL_ENV
				 : process.env.USE_BASE_URL
AOS.init();

const VideoRack = ({onClick,contents,title,history,className,videoClass}) => {

const determineOverflow = (content, container) => {
    var containerMetrics = container.current.getBoundingClientRect();
    var containerMetricsRight = Math.floor(containerMetrics.right);
    var containerMetricsLeft = Math.floor(containerMetrics.left);
    var contentMetrics = content.current.getBoundingClientRect();
    var contentMetricsRight = Math.floor(contentMetrics.right);
    var contentMetricsLeft = Math.floor(contentMetrics.left);
    if (containerMetricsLeft > contentMetricsLeft && containerMetricsRight < contentMetricsRight) {
        return "both";
    } else if (contentMetricsLeft < containerMetricsLeft) {
        return "left";
    } else if (contentMetricsRight > containerMetricsRight) {
        return "right";
    } else {
        return "none";
    }
}

const videoRack = document.querySelector('.videoRack');
const videoRackInner = document.querySelector('.videoRack_inner');
const [attrib,setAttrib] = useState('');

const refVidrk = useRef();
const refRecInner = useRef();

useEffect(()=>{
 //console.log(videoRack.getBoundingClientRect());
  //cRef.setAttribute("data-overflowing", determineOverflow(videoRackInner, videoRack));

}) 



const advanceRightArrow = () => {
  const availableScrollLeft = videoRack.scrollLeft;
  videoRack.scrollLeft = availableScrollLeft + 350;
  
  
}
const advanceLeftArrow = () => {
  const availableScrollLeft = videoRack.scrollLeft;
  videoRack.scrollLeft = availableScrollLeft + -350;
  
}


return (
<div data-aos="fade-in" data-aos-duration="1000" data-aos-once>
    <div className="crumbTitleCont">
      <h3 className={className}>
        {title} 
    </h3>

     </div>    
     
    
     <ScrollContainer className="videoRack scroll-container" ref={refVidrk}>
     <div className="videoRack_inner" data-overflowing={attrib} ref={refRecInner}>
    {/* <img id="arrowLeft" onClick={()=>advanceLeftArrow()} className="arrowLeft" src={`${BASE_URL}shades/images/arrowleft.png`} />
     <img id="arrowRight" onClick={()=>advanceRightArrow()} className="arrowRight" src={`${BASE_URL}shades/images/arrowright.png`} />
    */}
    
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
    </ScrollContainer>
     
     
     </div>

        )
    
}

export default VideoRack


