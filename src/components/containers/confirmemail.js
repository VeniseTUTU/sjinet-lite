import React, {Fragment,useEffect,useState} from "react";
import queryString from 'query-string';
import {Link, withRouter } from 'react-router-dom';
import {VERIFY_CODE} from '../Mutations/graphql';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import {SuccessIcon, FailedIcon } from '../Icons';
import '../../scss/register.scss';
import {Helmet} from "react-helmet";
const BASE_URL = process.env.NODE_ENV === 'development' 
				 ? process.env.USE_BASE_URL_ENV
				 : process.env.USE_BASE_URL;
import AOS from 'aos';
AOS.init();

const Confirmemail = (props) => {
	
	const [verifycode] = useMutation(VERIFY_CODE);
	const [mode,setMode] = useState('');


useEffect(() => {
	//const slug = encodeURIComponent('myerzpedd@gmail.com:1234567');
	const value = queryString.parse(props.location.search);
	const ss = Object.keys(value).join().split(':');
	const email = ss[0];
	const code = ss[1];

	
	(async () => {
		const variables = {
			email,
			code,
		}
	try{
		//setIsLoadedSoft(false);
		const { data, errors} = await verifycode({variables,errorPolicy:'all'});
		//setIsLoadedSoft(true);

		if (errors) {
			 return setMode('failed');
		}
		
		const {nodes} = data.verifyCode;
		setMode('success');
	
	
	}catch(e){
		console.log(e.message);     
		setMode('failed');
	}
})();
 
},[])

return(
<Fragment>
<Helmet>
<title>CONFIRM EMAIL- SJINET.COM</title>  
</Helmet>

<section className="signup" >
  <Link to="/">
		<div className="signup__logo">
			<img src={`${BASE_URL}images/sjinet_logo.png`} alt="sjinet_logo" />
		</div>
	</Link>

	{ mode === 'success' && (
		<div className="signup__card" data-aos="fade-in" data-aos-duration="1000" data-aos-once>
		  <div className="signup__modeIcon">
        <SuccessIcon />
			</div>
			<div className="signup__modeMessage">
			  Congrats!! You have confirmed your email.
			</div>
			<div className="signup__modeCav">
				[You may close this window]
			</div>
		</div>
	)
	}

{ mode === 'failed' && (
		<div className="signup__card" data-aos="fade-in" data-aos-duration="1000" data-aos-once>
		  <div className="signup__modeIcon">
        <FailedIcon />
			</div>
			<div className="signup__modeMessage">
			  Failed! We are unable to confirm your email address.
			</div>
			<div className="signup__modeCav">
				[You may close this window]
			</div>
		</div>
)
}
</section>
		
</Fragment>		
  );
    

}

export default Confirmemail;


