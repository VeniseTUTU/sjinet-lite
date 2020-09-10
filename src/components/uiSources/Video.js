import React, {useRef} from "react";
import {TransitionProvider} from "../providers";
import '../../scss/video.scss';
import {ImagePlaceholder} from "../loaders";
import AOS from 'aos';
import {LazyLoadComponent,trackWindowScroll} from 'react-lazy-load-image-component';
AOS.init();

const Video = ({scrollPosition,onClick,className,itemId,poster,itemTitle,itemDuration,itemLink,timeLeft,trailerUrl,history}) => {


const videoRef = useRef();

const playOnhover = () => {
  const {id} = videoRef.current;
  $(`.${id}`).hoverPlay();
}

const pauseOnLeave = () => {
  const {id} = videoRef.current;
  clearTimeout(`.${id}`);

}  

return (


  <div className={className}>

      <LazyLoadComponent 
         key={itemId} 
         placeholder={<ImagePlaceholder />}
         threshold={100}
         scrollPosition={scrollPosition}
        
      > 
      
      <TransitionProvider id={itemId} className="vidrack">
         
        <video 
          id={itemId}
          className={itemId}
          ref={videoRef}
          onClick={() => onClick(itemId)} 
          onPointerOver={() => playOnhover()}
          onPointerOut={() => pauseOnLeave()}
          poster={poster}
          preload='none'  
        >
            <source src={`${trailerUrl}`} alt="" />
                Your browser does not support HTML5 video.
        </video>
        </TransitionProvider>
    { history &&(
        <div>
            <div style={{width:`${timeLeft}%`}}></div>
        </div>
    )}
    
      </LazyLoadComponent>
      
    { history ?
      <p>{itemTitle} &bull; {100 - timeLeft}% </p> 
      : <p>{itemTitle} &bull; {itemDuration} </p> 
    }
  </div>

    );
    
}

export default trackWindowScroll(Video);



