import React, {useState,Component} from "react";
import {LoginProvider} from '../providers/';
import '../../scss/login.scss';
import {Link} from 'react-router-dom';
const BASE_URL = process.env.NODE_ENV === 'development' 
				 ? process.env.USE_BASE_URL_ENV
				 : process.env.USE_BASE_URL

const Loginform = (props) => {
       
return(

<LoginProvider> 
   {
			({input,handlePasswordChange,handleEmailChange,handleSubmit}) => (
<>
{
	input.displayFormm === 'login'  ? 
	
	<div className="overlay">

  <div className="modalForm" data-aos="fade-right" data-aos-duration="1000">
     
     <div onClick={props.hideForm} className="closeButtn"><span className="pe-7s-close-circle"></span></div>
     
     <div className="formCap">
       <div className="formCapleft">
         Log In
       </div>
       <div className="formCapright">
        Don't have an account? <span className="hotLink"><Link to="/signup/">Start free trial</Link></span>
       </div>
     </div>  
       
       <form id="regForm" onSubmit={handleSubmit}>
          
	    <div className="span" id="emailErr"> {input.emailErr}{input.responseErr} </div>	     
	     <div className="formFieldCont">
		
	      
	       <input 
                 type="email" 
                 name="email" 
                 placeholder="Email address"
		             onChange={handleEmailChange}
		             className="inputBox"
               />
	      </div>

	     <div className="span" id="passErr"> {input.passwordErr} </div>
	      <div className="formFieldCont">
		
	        <input
                 type="password" 
                 name="password" 
                 placeholder="Password"
		             onChange={handlePasswordChange}
		             className="inputBox"
               /> 
               </div>
	       
	       <div className="forgPass">
	         <div className="forgPassRight">
		   Forgot Password? 
			 <Link to='/password-reset'>
			 <span className="hotLink">Reset</span>
			 </Link>
		 </div>
	       </div>
	     
	  {  
			input.isLoadedSoft ?
		    	<button className="loginSumitButt" type="submit"> LOG IN </button> :
					 <div className="loadLogin">
					  <img src={`${BASE_URL}utilities/images/softload.gif`}  />
					 </div>
		      
		}
		  
      </form>
      </div>
</div> : ''
}


</>
)
		}
	
</LoginProvider>
 
		);
}


export default Loginform;