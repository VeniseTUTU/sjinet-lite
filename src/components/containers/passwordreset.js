import React, {Fragment} from "react";
import {PasswordResetProvider} from '../providers/';
import {Link, withRouter } from 'react-router-dom';
import '../../scss/register.scss';
import {Input,Button} from '../uiSources/form';
import {RoundedToast} from '../uiSources/toast';
const BASE_URL = process.env.NODE_ENV === 'development' 
				 ? process.env.USE_BASE_URL_ENV
				 : process.env.USE_BASE_URL;
import AOS from 'aos';
AOS.init();

const Passwordresetpage = () => {

return(
<PasswordResetProvider>
	{({input,handleChange,handleEmailSubmit,handleCodeSubmit,handlePasswordSubmit})=>(

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
  	<div className="signup__card__title">Password Reset</div>


	

{ input.displayemail &&(
	<>
		<div className="signup__card__cav">
		  Input your account email to begin the password reset process.
		</div>

     <form onSubmit={handleEmailSubmit} >
			
      <Input 
				className={`InputC`}
				errLog={input.emailErr}
				type={`email`}
				name={`email`}
				placeholder={`Email`}
				onChange={handleChange}
			/>

		<div className="signup__rightys">
				Go back to 
				<Link to="/login">
				<span> login</span>
				</Link>
			</div>

			<div style={{textAlign:'center'}}>
    {  
			input.isLoadedSoft 
			? <Button
				type={`submit`} 
				text={`Verify Email`}
				className={`signUpButton`} 
				type={`submit`} 
				/> 
			:<div className="signup__waiter">
					<img src={`${BASE_URL}utilities/images/softload.gif`}  />
				</div>
		      
		}

			</div>
		</form>
	</>	
)
}

{ input.displaycode &&(
	<>
		<div className="signup__card__cav">
		  Input the code sent to your email address.
		</div>

     <form onSubmit={handleCodeSubmit} >
			
      <Input 
				className={`InputC`}
				errLog={input.codeErr}
				type={`text`}
				name={`code`}
				placeholder={`Input code`}
				onChange={handleChange}
			/>

<div className="signup__rightys">
				Go back to 
				<Link to="/login">
				<span> login</span>
				</Link>
			</div>

			<div style={{textAlign:'center'}}>
    {  
			input.isLoadedSoft 
			? <Button
				type={`submit`} 
				text={`Verify Code`}
				className={`signUpButton`} 
				type={`submit`} 
				/> 
			:<div className="signup__waiter">
					<img src={`${BASE_URL}utilities/images/softload.gif`}  />
				</div>
		      
		}

			</div>
		</form>
	</>	
)
}

{ input.displaypassword &&(
	<>
		<div className="signup__card__cav">
		  Great! Now, provide a new password.
		</div>

     <form onSubmit={handlePasswordSubmit} >
			
		 <Input 
				className={`InputC`}
				errLog={input.passwordErr}
				type={`password`}
				name={`password`}
				placeholder={`New password`}
				onChange={(e) => handleChange(e)}
			/>

			<Input 
				className={`InputC`}
				errLog={input.password2Err}
				type={`password`}
				name={`password2`}
				placeholder={`Confirm new password`}
				onChange={(e) => handleChange(e)}
			/>


			<div style={{textAlign:'center'}}>
    {  
			input.isLoadedSoft 
			? <Button
				type={`submit`} 
				text={`Submit`}
				className={`signUpButton`} 
				type={`submit`} 
				/> 
			:<div className="signup__waiter">
					<img src={`${BASE_URL}utilities/images/softload.gif`}  />
				</div>
		      
		}

			</div>
		</form>
	</>	
)
}

{ input.dispalysuccess &&(
	<>
	   <div className="signup__succtitle">Password Reset Completed.</div>
		<div className="signup__message">You have successfully completed the password reset process.
		</div>

	<div className="signup__success" data-aos="zoom-in" data-aos-duration="1000">
	  <div className="signup__success__Left">
			Successfull!
		</div>
		<Link to="/login">
		<div className="signup__success__Right">
			LOG IN
		</div>
		</Link>
	</div> 
	</>
)
} 


		</div>
			<div className="signup__alternate">
		  Don't have an account? <span><Link to="/signup">Start your free trial</Link>	</span>
	    </div>
		</section>
			)}
			</PasswordResetProvider>
		
  );
    

}

export default Passwordresetpage;


