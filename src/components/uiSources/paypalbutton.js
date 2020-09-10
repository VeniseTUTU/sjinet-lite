import React, {Fragment, useState, useEffect} from "react";
import { NavLink, Link, useHistory } from 'react-router-dom';


const Paypalbutton = () => {

   

useEffect(() => {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://www.paypal.com/sdk/js?client-id=SB_CLIENT_ID";
    script.async = true;
    document.body.appendChild(script);
    
})
                 
        return(
          <div id="paypal-button-container"></div>
        );
        }
    

    export default Paypalbutton;
