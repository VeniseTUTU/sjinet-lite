import React, {useState,Component,useEffect} from "react";
import { NavLink, Link } from 'react-router-dom';
import {Helmet} from "react-helmet";
import AOS from 'aos';
import '../../dist/aos.css';
import '../../scss/frontpage.scss';
import Loginform from '../uiSources/login';
const BASE_URL = process.env.NODE_ENV === 'development' 
				 ? process.env.USE_BASE_URL_ENV
				 : process.env.USE_BASE_URL;
AOS.init();

const FrontPage = () => {

const [overlayLoginForm,setOverlayLoginForm] = useState(false); 

const displayLoginForm = () => {
	setOverlayLoginForm(true);
}
const hideLoginForm = () => {
	setOverlayLoginForm(false); 
}

return(

<React.Fragment>

<Helmet>
<title>SJINET.COM</title>
</Helmet>

{
overlayLoginForm &&(
<Loginform hideForm={hideLoginForm}/>
)
}  
       <div className="indexPad">
	 
        <div className="homeTop">
	       <section className="balancer">
		  <div className="wrapHomelinks">
		  <ul className="leftLinks">
		    <li>
             <Link to="/login"> Sign In </Link>
            </li>
		  </ul>
		  <div className="cLogo" data-aos="zoom-out" data-aos-duration="1000" data-aos-delay='1000' data-aos-once>
		      <img src={`${BASE_URL}images/sjinet_official_logo.png`} alt="sjinet_logo" />
		  </div>
		     
		  </div> 
		  
	       </section>
	    </div>
	    <div className="homeBottom" data-aos="zoom-in-down" data-aos-duration="1000" data-aos-once>
	       <h3 className="wlcBigFont">
		         SEE MORE. BECOME MORE.
                </h3>
                <p>Watch your favourite TV shows, UHD movies from anywhere.
                   No tie-in. You can cancel Anytime!
                </p>
		<Link to="/signup"> 
	    <button>
          Click Here To Start Your 30-day Free trial
        </button>
		</Link>
              
	    </div>
        </div>
	
	</React.Fragment>
			);
		  
		}

export default FrontPage;



