import React, {Fragment} from "react";
import {LoginProvider} from '../providers/';
import {Link, withRouter } from 'react-router-dom';
import {Helmet} from "react-helmet";
import '../../scss/register.scss';
import {Input,Button} from '../uiSources/form';
import {RoundedToast} from '../uiSources/toast';
const BASE_URL = process.env.NODE_ENV === 'development' 
				 ? process.env.USE_BASE_URL_ENV
				 : process.env.USE_BASE_URL;
import AOS from 'aos';
AOS.init();

const Loginpage = () => {

return(
<>
<Helmet>
<title>LOGIN - SJINET.COM</title>  
</Helmet>

<LoginProvider>
	{({input,handlePasswordChange,handleEmailChange,handleSubmit})=>(

<section className="signup" data-aos="fade-in" data-aos-duration="1000" data-aos-once>
{input.displaytoast && (
	<RoundedToast {...input.toast}/>
)}

<div className="signup__logo">
<Link to="/">
   <img src={`${BASE_URL}images/sjinet_logo.png`} alt="sjinet_logo" />
	 </Link>
</div>

	<div className="signup__card">
  	<div className="signup__card__title">Sign In</div>

<form onSubmit={handleSubmit} >
			
      <Input 
				className={`InputC`}
				errLog={input.emailErr}
				type={`email`}
				name={`email`}
				placeholder={`Email`}
				onChange={handleEmailChange}
			/>

			<Input 
				className={`InputC`}
				errLog={input.passwordErr}
				type={`password`}
				name={`password`}
				placeholder={`Password`}
				onChange={handlePasswordChange}
			/>

			<div className="signup__rightys">
				Forgot password? 
				<Link to="/password-reset">
				<span> Reset</span>
				</Link>
			</div>

			<div style={{textAlign:'center'}}>
    {  
			input.isLoadedSoft 
			? <Button
				type={`submit`} 
				text={`Sign In`}
				className={`signUpButton`} 
				type={`submit`} 
				/> 
			:<div className="signup__waiter">
					<img src={`${BASE_URL}utilities/images/softload.gif`}  />
				</div>
		      
		}

			</div>
		</form>	
		</div>
			<div className="signup__alternate">
		  Don't have an account? <span><Link to="/signup">Start your free trial</Link>	</span>
	    </div>
		</section>
			)}
			</LoginProvider>
	</>	
  );
    

}

export default Loginpage;


