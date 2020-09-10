import React, {Fragment, useState} from "react";
import '../../scss/toast.scss';
import {TransitionProvider} from "../providers";
import AOS from 'aos';
AOS.init();
export const Toast = ({status,text}) => {
           
return(
<Fragment>
<TransitionProvider className="toast" >
    <div data-aos="fade-in" data-aos-duration="1000" data-aos-once className={`Toast ${status}`}>
       {text}
    </div>
</TransitionProvider>
</Fragment>
);

}
 
export const RoundedToast = ({status,text}) => {
           
   return(
   <Fragment>
   <TransitionProvider className="toast" >
      <button className={`RoundedToast ${status}`} data-aos="fade-down">
         {text}
      </button>
   </TransitionProvider>
   </Fragment>
   );
   
}