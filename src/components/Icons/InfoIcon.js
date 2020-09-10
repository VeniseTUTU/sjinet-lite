import React from 'react'


const InfoIcon = props => (
    <svg  width="100%" height="100%" version="1.1" viewBox="0 0 40 40" 
    style={{shapeRendering:"geometricPrecision", textRrendering:"geometricPrecision", imageRendering:"optimizeQuality", fillRule:"evenodd", clipRule:"evenodd"}}>
     
     <path 
       className={props.fill} 
       d="M20 0c11,0 20,9 20,20 0,11 -9,20 -20,20 -11,0 -20,-9 -20,-20 0,-11 9,-20 20,-20zm-3 16c-1,-1 3,-3 5,-1 1,2 -3,10 -4,14 0,2 2,1 3,1 1,0 0,4 -3,4 -3,0 -3,-3 -2,-6 1,-3 2,-6 3,-9 0,-1 0,-1 -1,-2zm4 -9c1,0 2,1 2,2 0,1 -1,2 -2,2 -1,0 -2,-1 -2,-2 0,-1 1,-2 2,-2z"/>
  
    </svg>
);

export default InfoIcon