import React, {Component} from "react";
import '../../scss/searchSpinner.scss';


 export default class Loader extends React.Component {
        
	    state = {
		
	    overlayLoginForm: false,  
	    
	    }
	     
		render(){


		return(

<React.Fragment>
<div className="searchSpinner">
<div className="searchSpinner__content"></div>
</div>

</React.Fragment>
			);
		  }
		}
        


