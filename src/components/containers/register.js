import React, {Fragment} from "react";
import {getNames} from 'country-list';
import {SignUpProvider} from '../providers/';
import {Link, withRouter } from 'react-router-dom';
import '../../scss/register.scss';
import {Input,Button} from '../uiSources/form';
const BASE_URL = process.env.NODE_ENV === 'development' 
				 ? process.env.USE_BASE_URL_ENV
				 : process.env.USE_BASE_URL;
import AOS from 'aos';
AOS.init();

const Registerpage = () => {

	const countries = getNames();
return(
<SignUpProvider>
	{({input,handleChange,handleLoginDetailSubmit,handleSubmit})=>(

<section className="signup" data-aos="fade-in" data-aos-duration="1000" data-aos-once>

<div className="signup__logo">
<Link to="/">
   <img src={`${BASE_URL}images/sjinet_logo.png`} alt="sjinet_logo" />
	 </Link>
</div>


	<div className="signup__card">

{/* Login Details Form*/}

{ input.displayLoginDetailsform && (
	<Fragment>
		<div className="signup__card__title">Sign Up</div>
	
	<form onSubmit={handleLoginDetailSubmit} >
				
			<Input 
				className={`InputC`}
				errLog={input.emailErr}
				type={`email`}
				name={`email`}
				placeholder={`Email`}
				onChange={(e) => handleChange(e)}
			/>

			<Input 
				className={`InputC`}
				errLog={input.passwordErr}
				type={`password`}
				name={`password`}
				placeholder={`Password`}
				onChange={(e) => handleChange(e)}
			/>

			<Input 
				className={`InputC`}
				errLog={input.password2Err}
				type={`password`}
				name={`password2`}
				placeholder={`Retype Password`}
				onChange={(e) => handleChange(e)}
			/>

				<div style={{textAlign:'center'}}>
    {  
			input.isLoadedSoft 
			? <Button
				type={`submit`} 
				text={`Continue`}
				className={`signUpButton`} 
				type={`submit`} 
				/> 
			:<div className="signup__waiter">
					<img src={`${BASE_URL}utilities/images/softload.gif`}  />
				</div>
		      
		}

			</div>
		</form>	
	</Fragment>
)}		


{/* Personal Details Form*/}

{ input.displayPersonDetailsform && (
<Fragment>
	<div className="signup__card__title">Sign Up</div>

<form onSubmit={handleSubmit} >
			<Input 
				className={`InputC`}
				errLog={input.firstnameErr}
				type={`text`}
				name={`firstname`}
				placeholder={`First Name`}
				onChange={(e) => handleChange(e)}
			/>

			<Input 
				className={`InputC`}
				errLog={input.lastnameErr}
				type={`text`}
				name={`lastname`}
				placeholder={`Last Name`}
				onChange={(e) => handleChange(e)}
			/>

			<label className={`InputC`}> {input.genderErr}
			<select
				name={`gender`}
				onChange={(e) => handleChange(e)}
				defaultValue={`gender`}
			>
			<option value="gender"> Gender </option>
			<option value="male"> Male </option>
			<option value='female'> Female</option>
			<option value='other'> I'd rather not say</option>

			</select>
			</label>
{/*
			<Input 
				className={`InputC`}
				errLog={input.phoneErr}
				type={`text`}
				name={`phone`}
				placeholder={`Phone`}
				onChange={(e) => handleChange(e)}
			/>
*/}
      <label className={`InputC`}> {input.countryErr}
			<select
				name={`country`}
				onChange={(e) => handleChange(e)}
			>
			<option value="country"> Country </option>
			{countries.map((country,index) => (
				<option key={index} value={country}> {country} </option>
			))

			}
		
			</select>
			</label>


			<label className={`InputC`}> {``}
			<select
				name={`touchpoint`}
				onChange={(e) => handleChange(e)}
			>
			<option value="default"> Tell us where you hear about us </option>
			<option value="Instagram"> Instagram </option>
			<option value="facebook"> Facebook </option>
			<option value="tv_station"> Tv Station </option>
			<option value="digital_ads"> Digital Ads </option>
			<option value="friend"> A friend </option>

			</select>
			</label>
{ input.responseErr &&(
			<div className="signup__toast">
        {input.responseErr}
			</div>
)
}

			<div style={{textAlign:'center'}}>
    {  
			input.isLoadedSoft 
			? <Button
				type={`submit`} 
				text={`Continue`}
				className={`signUpButton`} 
				
				/> 
			:<div className="signup__waiter">
					<img src={`${BASE_URL}utilities/images/softload.gif`}  />
				</div>
		      
		}

			</div>
		</form>	
		</Fragment>
)}		
			<div className="signup__card__caveat">
      	By clicking "CONTINUE" you agree to SJINET <br/><span>Terms of Use</span> and <span>Privacy Policy.</span>
			</div>

			</div>
			<div className="signup__alternate">
		   Already have an account? <span><Link to="/login">Sign In</Link></span>
			 
	    </div>
		</section>
			)}
			</SignUpProvider>
		
  );
    

}

export default Registerpage;


